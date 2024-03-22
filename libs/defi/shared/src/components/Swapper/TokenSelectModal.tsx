import {
  Box,
  Dialog,
  DialogTitle,
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
  useFormat,
  useSwapperPrices,
  useWatchBalance,
} from '@origin/shared/providers';
import { ascend, descend, prop, sortWith } from 'ramda';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import type { DialogProps, MenuItemProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

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

  const sortedTokens = sortWith<TokenOption>([
    ascend(prop('isSelected')),
    descend(prop('isSwappable')),
  ])(tokens);

  return (
    <Dialog fullWidth maxWidth="sm" {...rest} onClose={onClose}>
      <DialogTitle>
        {intl.formatMessage({ defaultMessage: 'Select a token' })}
      </DialogTitle>
      <MenuList disablePadding>
        {sortedTokens.map((token, i) => (
          <TokenListItem
            key={`token-${token.address || 'eth'}-${i}`}
            token={token}
            disabled={token.isSelected}
            onClick={() => {
              onClose?.({}, 'backdropClick');
              onSelectToken(token);
            }}
            sx={{
              opacity: token.isSwappable ? 1 : 0.5,
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
  const { formatAmount, formatCurrency } = useFormat();
  const { data: balance, isLoading: isBalanceLoading } = useWatchBalance({
    token: token.address,
  });
  const { data: prices } = useSwapperPrices();

  const bal = +formatUnits(balance ?? 0n, token.decimals);
  const balUsd = bal * (prices?.[getTokenPriceKey(token)] ?? 0);

  return (
    <MenuItem
      {...rest}
      disabled={token.isSelected}
      sx={{
        display: 'flex',
        px: 2,
        py: 1,
        justifyContent: 'space-between',
        gap: 1.5,
        alignItems: 'center',
        background: (theme) => theme.palette.background.paper,
        borderRadius: 1,
        '&:hover': {
          background: (theme) => theme.palette.action.hover,
        },
        ...rest?.sx,
      }}
    >
      <Stack direction="row" gap={1.5} alignItems="center">
        <TokenIcon token={token} sx={{ width: 20, height: 20 }} />
        <Box>
          <Typography fontWeight={500}>{token?.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {token.symbol}
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" spacing={2}>
        {token?.isSelected && (
          <Stack display="flex" justifyContent="center" alignItems="center">
            <FaCheckRegular sx={{ color: '#fff', fontSize: 16 }} />
          </Stack>
        )}
        <Box sx={{ textAlign: 'right' }}>
          <Typography fontWeight={500}>
            {isBalanceLoading ? (
              <Skeleton width={30} />
            ) : (
              formatAmount(balance as unknown as bigint, token.decimals)
            )}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {formatCurrency(balUsd)}
          </Typography>
        </Box>
      </Stack>
    </MenuItem>
  );
}
