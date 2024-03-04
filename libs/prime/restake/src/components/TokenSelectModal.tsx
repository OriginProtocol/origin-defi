import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  MenuList,
  Stack,
  Typography,
} from '@mui/material';
import { TokenIcon } from '@origin/shared/components';
import { FaCheckRegular } from '@origin/shared/icons';
import { useFormat, useWatchBalances } from '@origin/shared/providers';
import { ascend, descend, sortWith } from 'ramda';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';

import type { DialogProps, MenuItemProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { TokenOption } from '@origin/shared/providers';

import type { Meta } from '../types';

export type TokenSelectModalProps = {
  tokens: TokenOption<Meta>[];
  onSelectToken: (value: Token) => void;
} & DialogProps;

export const TokenSelectModal = ({
  tokens,
  onSelectToken,
  onClose,
  ...rest
}: TokenSelectModalProps) => {
  const intl = useIntl();
  const { data: balances, isLoading: isBalancesLoading } =
    useWatchBalances(tokens);

  const sortedTokens = sortWith<TokenOption>([
    ascend((t) => !['ETH', 'WETH'].includes(t.symbol)),
    descend((t) => +formatUnits(balances?.[t.symbol] ?? 0n, t.decimals)),
    descend((t) => t.symbol === 'OETH'),
    ascend((t) => t.name ?? ''),
  ])(tokens);

  return (
    <Dialog maxWidth="sm" fullWidth {...rest} onClose={onClose}>
      <DialogTitle>
        {intl.formatMessage({ defaultMessage: 'Select a token' })}
      </DialogTitle>
      <MenuList>
        {isBalancesLoading ? (
          <Stack justifyContent="center" alignItems="center" p={3}>
            <CircularProgress size={24} />
          </Stack>
        ) : (
          sortedTokens.map((token, i) => (
            <TokenListItem
              key={`token-${token.address || 'eth'}-${i}`}
              token={token}
              balance={balances?.[token.symbol] ?? 0n}
              disabled={!['ETH', 'WETH'].includes(token.symbol)}
              onClick={() => {
                onClose?.({}, 'backdropClick');
                onSelectToken(token);
              }}
              sx={{
                opacity: token.isSwappable ? 1 : 0.5,
              }}
            />
          ))
        )}
      </MenuList>
      <DialogContent>
        <Typography fontWeight="medium">
          {intl.formatMessage({
            defaultMessage: 'More EigenLayer assets coming soon...',
          })}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

type TokenListItemProps = {
  token: TokenOption<Meta>;
  balance: bigint;
} & MenuItemProps;

function TokenListItem({ token, balance, ...rest }: TokenListItemProps) {
  const { formatAmount } = useFormat();

  return (
    <MenuItem
      {...rest}
      sx={{
        display: 'flex',
        px: 3,
        py: 1.2,
        flexDirection: 'row',
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
      <Stack direction="row" gap={2} alignItems="center">
        <TokenIcon token={token} sx={{ width: 28, height: 28 }} />
        <Stack spacing={0.25}>
          <Stack direction="row" spacing={1} alignItems="baseline">
            <Typography fontWeight="medium">{token?.name}</Typography>
            <Typography color="text.secondary">{token.symbol}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        {token?.isSelected && (
          <Stack display="flex" justifyContent="center" alignItems="center">
            <FaCheckRegular sx={{ color: '#fff', fontSize: 16 }} />
          </Stack>
        )}
        <Box sx={{ textAlign: 'right' }}>
          <Typography fontWeight={500}>
            {formatAmount(balance, token?.decimals)}
          </Typography>
        </Box>
      </Stack>
    </MenuItem>
  );
}
