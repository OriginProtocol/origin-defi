import { useContext } from 'react';

import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import OGVIcon from '../../assets/ogv.svg';
import { StateContext } from '../../components/AppState';
import { ExternalLink } from '../../components/Icons';
import { NumberSpinner } from '../../components/NumberSpinner';

export const MyStake = () => {
  const { state, setState } = useContext(StateContext);
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const totalLocked = state.lockups.reduce((m, l) => {
    return m + l.tokens;
  }, 0);

  return (
    <div className="bg-gray-900 rounded-lg p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0">
      <div className="flex flex-col items-start gap-1 sm:gap-3">
        <div className="text-gray-500 text-sm">My stake</div>
        <div className="flex items-center gap-3">
          <img src={OGVIcon} alt="OGV" />
          {!isConnected ? (
            <div className="mt-2 h-[2.5px] w-3 bg-gray-500" />
          ) : (
            <div className="text-2xl font-bold">
              {totalLocked.toLocaleString()}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-start gap-1 sm:gap-3">
        <div className="text-gray-500 text-sm">Wallet balance</div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <img src={OGVIcon} alt="OGV" />
          {isConnected ? (
            <div className="text-2xl font-bold">
              <NumberSpinner num={state.walletBalance} slow spinAtStart />
            </div>
          ) : (
            <div className="mt-2 h-[2.5px] w-3 bg-gray-500" />
          )}
          {state.walletBalance ? null : (
            <button
              // className="ml-auto sm:ml-4 border-blue-600 border border-px rounded-full text-xs pl-4 pr-3 py-2 leading-tight flex items-center gap-1"
              className="ml-auto sm:ml-4 btn-outline text-xs pl-4 pr-3 py-2 leading-tight flex items-center gap-1"
              // to="https://app.uniswap.org/swap?outputCurrency=0x9c354503C38481a7A7a51629142963F98eCC12D0&chain=mainnet"
              // target="_blank"
              onClick={() => setState({ devControls: true })}
            >
              Get OGV
              <ExternalLink />
            </button>
          )}
        </div>
      </div>
      <div className="py-1">
        {isConnected ? (
          <button
            className="btn w-full sm:w-auto sm:px-20 py-4 leading-none"
            onClick={() => setState({ stakeModal: true })}
          >
            Stake
          </button>
        ) : (
          <button
            className="btn w-full sm:w-auto sm:px-20 py-4 leading-none"
            onClick={() => openConnectModal?.()}
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
};
