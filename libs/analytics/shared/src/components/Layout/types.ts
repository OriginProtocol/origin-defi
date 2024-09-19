import type { SvgIconProps } from '@mui/material';
import type { ComponentType } from 'react';
import type { MessageDescriptor } from 'react-intl';

export type LayoutState = {
  isDrawerOpen: boolean;
  contentWidth: number;
};

export type NavItem = {
  title: MessageDescriptor;
  icon: ComponentType<SvgIconProps>;
  href?: string;
  path?: string;
};
