import { MenuItem, Typography } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useMatch, useNavigate } from 'react-router';

import type { MenuItemProps } from '@mui/material';
import type { RouteObject } from 'react-router';

import type { NavItem } from '../types';

export type ListMenuItemProps = {
  route: RouteObject;
  item: NavItem;
  onClick?: () => void;
} & MenuItemProps;

export const ListMenuItem = ({
  route,
  item,
  onClick,
  ...rest
}: ListMenuItemProps) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const match = useMatch({
    path: `${route.path}/${item?.path ? `${item.path}/*` : ''}`,
  });

  const handleMenuClick = (path: string) => () => {
    navigate(`${route.path}/${path ?? ''}`);
    onClick?.();
  };

  const isSelected = !isNilOrEmpty(match) && isNilOrEmpty(item?.href);

  return (
    <MenuItem
      {...rest}
      {...(isNilOrEmpty(item.href)
        ? { onClick: handleMenuClick(item?.path ?? '') }
        : {
            href: item.href,
            target: '_blank',
            rel: 'noopener noreferrer nofollow',
            component: 'a',
          })}
      sx={[
        isSelected
          ? {
              color: 'primary.main',
              svg: { color: 'primary.main' },
              backgroundColor: 'primary.faded',
            }
          : {
              color: 'text.secondary',
              svg: { color: 'text.secondary' },
            },
        { pl: 4, py: 1.5 },
      ]}
    >
      <Typography>{intl.formatMessage(item.title)}</Typography>
    </MenuItem>
  );
};
