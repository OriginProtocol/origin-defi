import type { AlertColor } from '@mui/material';
import type { ReactNode } from 'react';

import type { BlockExplorerLinkProps } from '../wagmi';

export type Notification = {
  id: string;
  severity: AlertColor;
  title?: string;
  message?: string;
  icon?: ReactNode;
  blockExplorerLinkProps?: Pick<
    BlockExplorerLinkProps,
    'hash' | 'blockExplorer' | 'iconSize' | 'iconType'
  >;
  content?: ReactNode;
  createdOn: number;
  read: boolean;
  visible: boolean;
  hideDuration: number | undefined;
};

export type NotificationOptions = {
  severity?: AlertColor;
  title?: string;
  message?: string;
  icon?: ReactNode;
  blockExplorerLinkProps?: Pick<
    BlockExplorerLinkProps,
    'hash' | 'blockExplorer' | 'iconSize' | 'iconType'
  >;
  content?: ReactNode;
  visible?: boolean;
  hideDuration?: number | undefined;
};
