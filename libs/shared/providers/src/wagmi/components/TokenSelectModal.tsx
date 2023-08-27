import {
  Box,
  Dialog,
  MenuItem,
  MenuList,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useIntl } from 'react-intl';
import { useAccount, useBalance } from 'wagmi';

import { usePrices } from '../../prices';

import type { DialogProps, MenuItemProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';

export type TokenSelectModalProps = {
  tokens: Token[];
  onSelectToken: (value: Token) => void;
  selectedTokenSymbol?: string;
} & DialogProps;

export const TokenSelectModal = ({
  tokens,
  onSelectToken,
  selectedTokenSymbol,
  onClose,
  ...rest
}: TokenSelectModalProps) => {
  return (
    <Dialog
      maxWidth="sm"
      PaperProps={{
        elevation: 23,
        sx: {
          paddingBlock: 2,
          paddingInline: 0,
          background: (theme) => theme.palette.background.paper,
          borderRadius: 2,
          border: '1px solid',
          borderColor: (theme) => theme.palette.grey[800],
          backgroundImage: 'none',
          margin: 0,
          minWidth: 'min(90vw, 33rem)',
        },
      }}
      {...rest}
      onClose={onClose}
    >
      <MenuList
        sx={{
          padding: 0,
        }}
      >
        {tokens.map((token) => (
          <TokenListItem
            key={token.address || 'eth'}
            token={token}
            onClick={() => {
              onSelectToken(token);
              onClose({}, 'backdropClick');
            }}
            selected={selectedTokenSymbol === token.symbol}
          />
        ))}
      </MenuList>
    </Dialog>
  );
};

type TokenListItemProps = {
  token: Token;
  selected: boolean;
} & MenuItemProps;

function TokenListItem({ token, selected, ...rest }: TokenListItemProps) {
  const intl = useIntl();
  const { address } = useAccount();
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address,
    token: token.address,
  });
  const { data: prices } = usePrices();

  const bal = parseFloat(balance?.formatted ?? '0');
  const balUsd = bal * (prices?.[token.symbol] ?? 0);

  return (
    <MenuItem
      {...rest}
      disabled={selected}
      sx={{
        display: 'flex',
        paddingInline: 2,
        paddingBlock: 1,
        justifyContent: 'space-between',
        gap: 1.5,
        alignItems: 'center',
        background: (theme) => theme.palette.background.paper,
        borderRadius: 1,
        '&:hover': {
          background: (theme) => theme.palette.grey[700],
        },
        ...rest?.sx,
      }}
    >
      <Stack direction="row" gap={1.5} alignItems="center">
        <Box
          component="img"
          src={token.icon}
          sx={{ width: '2rem', height: '2rem' }}
        />
        <Box>
          <Typography color="primary.contrastText">{token?.name}</Typography>
          <Typography
            color="text.primary"
            variant="body2"
            sx={{
              '& > span:not(:last-child):after': {
                content: '", "',
              },
            }}
          >
            {token.symbol}
          </Typography>
        </Box>
      </Stack>

      <Box sx={{ textAlign: 'right' }}>
        <Typography color="primary.contrastText">
          {isBalanceLoading ? (
            <Skeleton width={30} />
          ) : (
            intl.formatNumber(bal, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 4,
            })
          )}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {intl.formatNumber(balUsd, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
          })}
        </Typography>
      </Box>
    </MenuItem>
  );
}
