import {
  Dialog,
  DialogTitle,
  Divider,
  MenuItem,
  MenuList,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { TokenIcon } from '@origin/shared/components';
import { FaCheckRegular } from '@origin/shared/icons';
import {
  getTokenPriceKey,
  useSwapperPrices,
  useWatchBalance,
} from '@origin/shared/providers';
import { getFormatPrecision } from '@origin/shared/utils';
import { format, mul } from 'dnum';
import { ascend, prop, sortWith } from 'ramda';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import type { DialogProps, MenuItemProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { Dnum } from 'dnum';

export type TokenOption = {
  isSwappable: boolean;
  isSelected: boolean;
} & Token;

export type TokenSelectModalProps = {
  tokens: TokenOption[];
  onSelectToken: (value: Token) => void;
} & DialogProps;

export const TokenSelectModal = ({
  tokens,
  onSelectToken,
  onClose,
  ...rest
}: TokenSelectModalProps) => {
  const intl = useIntl();

  const sortedTokens = sortWith<TokenOption>([ascend(prop('symbol'))])(tokens);

  return (
    <Dialog fullWidth maxWidth="sm" {...rest} onClose={onClose}>
      <DialogTitle>
        {intl.formatMessage({ defaultMessage: 'Select a token' })}
      </DialogTitle>
      <Divider />
      <MenuList disablePadding>
        {sortedTokens.map((token, i) => (
          <TokenListItem
            key={`token-${token.address || 'eth'}-${i}`}
            token={token}
            onClick={() => {
              onClose?.({}, 'backdropClick');
              onSelectToken(token);
            }}
            sx={{
              opacity: token.isSwappable || token.isSelected ? 1 : 0.5,
            }}
          />
        ))}
      </MenuList>
    </Dialog>
  );
};

type TokenListItemProps = {
  token: TokenOption;
} & MenuItemProps;

function TokenListItem({ token, ...rest }: TokenListItemProps) {
  const { isConnected } = useAccount();
  const { data: balance, isLoading: isBalanceLoading } = useWatchBalance({
    token,
  });
  const { data: prices } = useSwapperPrices();

  const bal = [balance ?? 0n, token.decimals] as Dnum;
  const balUsd = mul(bal, prices?.[getTokenPriceKey(token)] ?? 0);

  return (
    <MenuItem
      {...rest}
      selected={token.isSelected}
      sx={{
        display: 'flex',
        px: 3,
        py: 1.5,
        justifyContent: 'space-between',
        gap: 1.5,
        alignItems: 'center',
        ...rest?.sx,
      }}
    >
      <Stack direction="row" gap={1.5} alignItems="center">
        <TokenIcon token={token} sx={{ fontSize: 36 }} />
        <Stack spacing={0.5}>
          <Typography variant="body2" fontWeight="bold">
            {token?.symbol}
          </Typography>
          <Typography variant="caption1" color="text.secondary">
            {token.name}
          </Typography>
        </Stack>
      </Stack>
      {isConnected && (
        <Stack direction="row" spacing={2}>
          {token?.isSelected && (
            <Stack display="flex" justifyContent="center" alignItems="center">
              <FaCheckRegular sx={{ fontSize: 16 }} />
            </Stack>
          )}
          <Stack spacing={0.5} sx={{ textAlign: 'right' }}>
            <Typography variant="body2" fontWeight="bold">
              {isBalanceLoading ? (
                <Skeleton width={30} />
              ) : (
                format(bal, {
                  digits: getFormatPrecision(bal),
                  decimalsRounding: 'ROUND_DOWN',
                })
              )}
            </Typography>
            <Typography color="text.secondary" variant="caption1">
              ${format(balUsd, 2)}
            </Typography>
          </Stack>
        </Stack>
      )}
    </MenuItem>
  );
}
