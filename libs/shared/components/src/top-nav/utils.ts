import { defineMessage } from 'react-intl';

import type { SxProps, Theme } from '@mui/material';

export const styles: SxProps<Theme> = {
  backgroundColor: 'background.paper',
  borderRadius: 25,
  paddingBlock: 1,
  paddingInline: { xs: 2, md: 3 },
  color: 'primary.contrastText',
  boxShadow: (theme) => theme.shadows['24'],
};

export const messages = {
  'approval-pending': defineMessage({ defaultMessage: 'Pending Approval' }),
  'approval-success': defineMessage({ defaultMessage: 'Approved' }),
  'approval-failed': defineMessage({ defaultMessage: 'Approval failed' }),
  'swap-pending': defineMessage({ defaultMessage: 'Pending Swap' }),
  'swap-success': defineMessage({ defaultMessage: 'Swapped' }),
  'swap-failed': defineMessage({ defaultMessage: 'Swap failed' }),
  'redeem-success': defineMessage({ defaultMessage: 'Redeemed' }),
  'redeem-pending': defineMessage({ defaultMessage: 'Pending Redeem' }),
  'redeem-failed': defineMessage({ defaultMessage: 'Redeem failed' }),
  'rebase-success': defineMessage({ defaultMessage: 'Rebased opt-in' }),
  'rebase-failed': defineMessage({ defaultMessage: 'Rebase opt-in Failed' }),
  'rebase-pending': defineMessage({ defaultMessage: 'Rebase opt-in Pending' }),
  'swap-message': defineMessage({
    defaultMessage:
      '{baseTokenValue} {baseToken} for {exchangeTokenValue} {exchangeToken}',
  }),
  'approval-message': defineMessage({
    defaultMessage: 'Approve {token} for swapping',
  }),
  'approval-success-message': defineMessage({
    defaultMessage: 'Approved {token} for swapping',
  }),
  'rebase-message': defineMessage({ defaultMessage: 'To receive yield' }),
  'rebase-pending-message': defineMessage({
    defaultMessage: 'You will receive yield',
  }),
};
