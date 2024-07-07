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
import { format, lt, mul } from 'dnum';
import { ascend, descend, prop, sortWith } from 'ramda';

import { getTokenPriceKey } from '../../prices';
import { useWatchBalance } from '../../wagmi';
import { useSwapperPrices } from '../hooks';

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
  const sortedTokens = sortWith<TokenOption>([
    ascend(prop('isSelected')),
    descend(prop('isSwappable')),
  ])(tokens);

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
  const { data: balance, isLoading: isBalanceLoading } = useWatchBalance({
    token,
  });
  const { data: prices } = useSwapperPrices();

  const bal = [balance ?? 0n, token.decimals] as Dnum;
  const balDigits = lt(bal, 1) ? 6 : lt(bal, 10) ? 4 : 2;
  const balUsd = mul(bal, prices?.[getTokenPriceKey(token)] ?? 0);

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
              format(bal, balDigits)
            )}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            ${format(balUsd, 2)}
          </Typography>
        </Box>
      </Stack>
    </MenuItem>
  );
}
