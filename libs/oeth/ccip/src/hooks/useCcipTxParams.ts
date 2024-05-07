import { contracts, tokens } from '@origin/shared/contracts';
import { validateTxButtonParams } from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { readContract } from '@wagmi/core';
import { encodeAbiParameters, keccak256, toHex } from 'viem';
import { arbitrum, mainnet } from 'viem/chains';
import { useAccount, useConfig } from 'wagmi';

import { ccipRouter } from '../constants';

import type { Token } from '@origin/shared/contracts';
import type { HexAddress } from '@origin/shared/utils';
import type { Hex } from 'viem';
import type { Chain } from 'viem/chains';

export const useCcipTxParams = ({
  srcChain,
  dstChain,
  srcToken,
  dstToken,
  amount,
}: {
  srcChain: Chain;
  dstChain: Chain;
  srcToken: Token;
  dstToken: Token;
  amount: bigint;
}) => {
  const config = useConfig();
  const { address: userAddress } = useAccount();

  return useQuery({
    queryKey: [
      'useCcipTxParams',
      srcChain.id,
      dstChain.id,
      srcToken.symbol,
      dstToken.symbol,
      userAddress,
      amount.toString(),
    ],
    queryFn: async () => {
      if (!userAddress) return undefined;
      if (
        srcChain.id === mainnet.id &&
        dstChain.id === arbitrum.id &&
        srcToken.symbol === tokens.mainnet.ETH.symbol &&
        dstToken.symbol === tokens.arbitrum.wOETH.symbol
      ) {
        const fee = await readContract(config, {
          address: contracts.mainnet.woethCcipZapper.address,
          abi: contracts.mainnet.woethCcipZapper.abi,
          functionName: 'getFee',
          args: [amount, userAddress],
          chainId: contracts.mainnet.woethCcipZapper.chainId,
        });

        return {
          path: 'zap-eth-oeth-woeth-ccip',
          amount,
          fee,
          isEstimate: true,
          params: validateTxButtonParams({
            contract: contracts.mainnet.woethCcipZapper,
            functionName: 'zap',
            args: [userAddress],
            value: amount + fee,
          }),
        };
      } else {
        const srcRouter = ccipRouter[srcChain.id];
        const dstRouter = ccipRouter[dstChain.id];

        // Set gasLimit to 0
        const extraArgsSelector = keccak256(toHex('CCIP EVMExtraArgsV1')).slice(
          0,
          10,
        );
        const extraArgs = (extraArgsSelector +
          encodeAbiParameters([{ type: 'uint256' }], [0n]).slice(2)) as Hex;

        // Construct message
        const message = {
          receiver: encodeAbiParameters([{ type: 'address' }], [userAddress]),
          data: '0x',
          tokenAmounts: [
            { token: srcToken.address as HexAddress, amount: amount },
          ],
          feeToken: ZERO_ADDRESS,
          extraArgs,
        } as const;

        // Determine fee
        const suggestedFee = await readContract(config, {
          address: srcRouter.address,
          abi: srcRouter.abi,
          functionName: 'getFee',
          args: [dstRouter.chainSelectorId, message],
          chainId: srcRouter.chainId,
        });
        const feePaddingBps = 100n;
        const fee = ((suggestedFee ?? 0n) * (10000n + feePaddingBps)) / 10000n;

        return {
          path: 'woeth-ccip',
          amount: amount,
          fee,
          isEstimate: false,
          params: validateTxButtonParams({
            contract: srcRouter,
            functionName: 'ccipSend',
            args: [dstRouter.chainSelectorId, message],
            value: fee,
          }),
        };
      }
    },
    refetchInterval: 30000,
  });
};
