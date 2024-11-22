import type { SvgIconProps } from '@mui/material';
import type { ComponentType } from 'react';
import type { MessageDescriptor } from 'react-intl';
import type { RouteObject } from 'react-router';

export type LayoutState = {
  isDrawerOpen: boolean;
  contentWidth: number;
  expandedSections: string[];
  routes: RouteObject[];
};

export type NavItem = {
  title: MessageDescriptor;
  icon: ComponentType<SvgIconProps>;
  href?: string;
  path?: string;
};
