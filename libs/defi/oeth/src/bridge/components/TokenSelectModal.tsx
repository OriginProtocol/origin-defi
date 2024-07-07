import {
  Box,
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
import { useTokenPrice, useWatchBalance } from '@origin/shared/providers';
import { getTokenPriceKey } from '@origin/shared/providers';
import { getFormatPrecision } from '@origin/shared/utils';
import { format, mul } from 'dnum';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import type { DialogProps, MenuItemProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { Dnum } from 'dnum';

export type TokenSelectModalProps = {
  selectedToken: Token;
  tokens: Token[];
  onSelectToken: (value: Token) => void;
} & DialogProps;

export const TokenSelectModal = ({
  selectedToken,
  tokens,
  onSelectToken,
  onClose,
  ...rest
}: TokenSelectModalProps) => {
  const intl = useIntl();
  return (
    <Dialog maxWidth="sm" fullWidth {...rest} onClose={onClose}>
      <DialogTitle>
        {intl.formatMessage({ defaultMessage: 'Select a token' })}
      </DialogTitle>
      <Divider />
      <MenuList disablePadding>
        {tokens.map((token, i) => (
          <TokenListItem
            key={`token-${token.address || 'eth'}-${i}`}
            token={token}
            isSelected={token.address === selectedToken.address}
            onClick={() => {
              onClose?.({}, 'backdropClick');
              onSelectToken(token);
            }}
          />
        ))}
      </MenuList>
    </Dialog>
  );
};

type TokenListItemProps = {
  token: Token;
  isSelected: boolean;
} & MenuItemProps;

function TokenListItem({
  token,
  isSelected,
  onClick,
  ...rest
}: TokenListItemProps) {
  const { isConnected } = useAccount();
  const { data: balance, isLoading: isBalanceLoading } = useWatchBalance({
    token,
  });
  const { data: price } = useTokenPrice(getTokenPriceKey(token));

  const bal = [balance ?? 0n, token.decimals] as Dnum;
  const balUsd = mul(bal, price ?? 0);

  return (
    <MenuItem
      {...rest}
      onClick={isSelected ? undefined : onClick}
      selected={isSelected}
      sx={{
        display: 'flex',
        px: 3,
        py: 1.5,
        justifyContent: 'space-between',
        gap: 1.5,
        alignItems: 'center',
        cursor: isSelected ? 'default' : 'pointer',
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
          {isSelected && (
            <Stack display="flex" justifyContent="center" alignItems="center">
              <FaCheckRegular sx={{ color: 'text.primary', fontSize: 16 }} />
            </Stack>
          )}
          <Box sx={{ textAlign: 'right' }}>
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
          </Box>
        </Stack>
      )}
    </MenuItem>
  );
}
