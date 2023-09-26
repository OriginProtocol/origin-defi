import {
  Box,
  Dialog,
  MenuItem,
  MenuList,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { usePrices } from '@origin/shared/providers';
import {
  currencyFormat,
  formatAmount,
  isNilOrEmpty,
} from '@origin/shared/utils';
import { partition, pipe, prop } from 'ramda';
import { useIntl } from 'react-intl';
import { useAccount, useBalance } from 'wagmi';

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
  const [swappable, unswappable] = pipe(
    partition<TokenOption>(prop('isSwappable')),
  )(tokens);

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
      {!isNilOrEmpty(swappable) && (
        <MenuList disablePadding>
          {swappable.map((token, i) => (
            <TokenListItem
              key={`token-${token.address || 'eth'}-${i}`}
              token={token}
              onClick={() => {
                onClose({}, 'backdropClick');
                onSelectToken(token);
              }}
            />
          ))}
        </MenuList>
      )}
      {!isNilOrEmpty(unswappable) && (
        <MenuList disablePadding>
          {unswappable.map((token, i) => (
            <TokenListItem
              key={`token-${token.address || 'eth'}-${i}`}
              token={token}
              onClick={() => {
                onClose({}, 'backdropClick');
                onSelectToken(token);
              }}
              sx={{
                color: 'text.secondary',
              }}
            />
          ))}
        </MenuList>
      )}
    </Dialog>
  );
};

type TokenListItemProps = {
  token: TokenOption;
} & MenuItemProps;

function TokenListItem({ token, ...rest }: TokenListItemProps) {
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
      disabled={token.isSelected}
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
          <Typography>{token?.name}</Typography>
          <Typography variant="body2" color="text.primary">
            {token.symbol}
          </Typography>
        </Box>
      </Stack>

      <Box sx={{ textAlign: 'right' }}>
        <Typography>
          {isBalanceLoading ? (
            <Skeleton width={30} />
          ) : (
            formatAmount(balance?.value, balance?.decimals)
          )}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {intl.formatNumber(balUsd, currencyFormat)}
        </Typography>
      </Box>
    </MenuItem>
  );
}
