import {
  Box,
  Dialog,
  MenuItem,
  MenuList,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { TokenIcon } from '@origin/shared/components';
import { FaCheckRegular } from '@origin/shared/icons';
import {
  useFormat,
  useTokenPrice,
  useWatchBalance,
} from '@origin/shared/providers';
import { getTokenPriceKey } from '@origin/shared/providers';
import { formatUnits } from 'viem';

import type { DialogProps, MenuItemProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

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
  return (
    <Dialog
      maxWidth="sm"
      PaperProps={{
        elevation: 23,
        sx: {
          background: (theme) => theme.palette.background.paper,
          borderRadius: 2,
          border: '1px solid',
          borderColor: (theme) => theme.palette.grey[800],
          backgroundImage: 'none',
          margin: 0,
          minWidth: 'min(90vw, 33rem)',
          py: 1,
        },
      }}
      {...rest}
      onClose={onClose}
    >
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
  const { formatAmount, formatCurrency } = useFormat();
  const { data: balance, isLoading: isBalanceLoading } = useWatchBalance({
    token,
  });

  const { data: price } = useTokenPrice(getTokenPriceKey(token));

  const bal = +formatUnits(balance ?? 0n, token.decimals);
  const balUsd = bal * (price ?? 0);

  return (
    <MenuItem
      {...rest}
      onClick={isSelected ? undefined : onClick}
      sx={{
        display: 'flex',
        paddingInline: 2,
        paddingBlock: 1,
        justifyContent: 'space-between',
        gap: 1.5,
        alignItems: 'center',
        cursor: isSelected ? 'default' : 'pointer',
        background: (theme) =>
          isSelected
            ? theme.palette.action.selected
            : theme.palette.background.paper,
        borderRadius: 1,
        '&:hover': {
          background: (theme) =>
            isSelected
              ? theme.palette.action.selected
              : theme.palette.action.hover,
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
        {isSelected && (
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
