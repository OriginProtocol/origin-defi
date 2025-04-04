import { useRef, useState } from 'react';

import {
  alpha,
  Button,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  Typography,
} from '@mui/material';
import { FaArrowUpRightRegular } from '@origin/shared/icons';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { Link, useMatch, useNavigate } from 'react-router';

import { additionalLinks } from '../constants';

import type { ButtonProps, MenuItemProps } from '@mui/material';
import type { Dispatch, KeyboardEvent, SetStateAction } from 'react';
import type { RouteObject } from 'react-router';

import type { NavItem } from '../types';

export type HoverMenuProps = {
  routes: RouteObject[];
};

export const HoverMenu = ({ routes }: HoverMenuProps) => {
  const visibleRoutes = routes?.[0]?.children?.filter(
    (r) => !isNilOrEmpty(r?.handle?.title),
  );

  return (
    <Stack
      sx={{
        width: 1,
        height: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
      }}
    >
      {visibleRoutes?.map((route, i) => (
        <NavMenuItem key={`${route?.path ?? 'topButton'}-${i}`} route={route} />
      ))}
    </Stack>
  );
};

type NavMenuItemProps = {
  route: RouteObject;
} & Omit<ButtonProps, 'onClick'>;

const NavMenuItem = ({ route, ...rest }: NavMenuItemProps) => {
  const intl = useIntl();
  const anchorEl = useRef(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleListKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  if (isNilOrEmpty(route?.children)) {
    return (
      <Button
        variant="text"
        size="large"
        {...rest}
        sx={[
          {
            color: 'text.primary',
            svg: { ml: 0.75, width: 12, height: 12 },
          },
          open
            ? {
                backgroundColor: 'primary.faded',
              }
            : {
                backgroundColor: 'transparent',
              },
          ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
        ]}
        onClick={() => {
          navigate(`${route?.path ?? ''}/`);
        }}
      >
        {intl.formatMessage(route.handle.title)}
      </Button>
    );
  }

  const items = [
    ...(route?.children
      ?.filter((r) => !isNilOrEmpty(r?.handle?.title))
      ?.map(
        (r) =>
          ({
            title: r.handle.title,
            subtitle: r.handle.subtitle,
            icon: r.handle.icon,
            path: r.path,
            href: null,
          }) as unknown as NavItem,
      ) ?? []),
    ...(additionalLinks?.[route?.path ?? ''] ?? []),
  ];

  return (
    <>
      <Button
        variant="text"
        size="large"
        {...rest}
        sx={[
          {
            color: 'text.primary',
            svg: { ml: 0.75, width: 12, height: 12 },
            whiteSpace: 'nowrap',
          },
          open
            ? {
                backgroundColor: 'primary.faded',
              }
            : {
                backgroundColor: 'transparent',
              },
          ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
        ]}
        ref={anchorEl}
        onMouseEnter={() => {
          setOpen(true);
        }}
        onMouseLeave={() => {
          setOpen(false);
        }}
        onClick={() => {
          let target;
          if (route.children?.[0]?.index) {
            target = `${route?.path ?? ''}/`;
          } else {
            target = `${route?.path ?? ''}/${route?.children?.[0]?.path ?? ''}`;
          }
          navigate(target);
        }}
      >
        {intl.formatMessage(route.handle.title)}
      </Button>
      <Popper
        transition
        placement="bottom-start"
        disablePortal
        modifiers={[
          {
            name: 'flip',
            enabled: true,
            options: {
              altBoundary: true,
              rootBoundary: 'document',
              padding: 8,
            },
          },
          {
            name: 'preventOverflow',
            enabled: true,
            options: {
              altAxis: true,
              altBoundary: true,
              tether: true,
              rootBoundary: 'document',
              padding: 8,
            },
          },
        ]}
        open={open}
        anchorEl={anchorEl.current}
        onMouseEnter={() => {
          setOpen(true);
        }}
        onMouseLeave={() => {
          setOpen(false);
        }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper
              elevation={1}
              sx={{
                mt: 1,
                borderRadius: 4,
                padding: 2,
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.highlight',
                minWidth: 200,
              }}
            >
              <MenuList
                onKeyDown={handleListKeyDown}
                component={Stack}
                gap={0.5}
              >
                {items.map((r, i) => (
                  <ListMenuItem
                    key={`${r?.path ?? r?.href}-${i}`}
                    route={route}
                    item={r}
                    setOpen={setOpen}
                  />
                ))}
              </MenuList>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

type ListMenuItemProps = {
  route: RouteObject;
  item: NavItem;
  setOpen: Dispatch<SetStateAction<boolean>>;
} & MenuItemProps;

const ListMenuItem = ({ route, item, setOpen, ...rest }: ListMenuItemProps) => {
  const intl = useIntl();
  const match = useMatch({
    path: `${route.path}/${item?.path ?? ''}`,
  });

  const handleMenuClick = () => {
    setOpen(false);
  };

  const isSelected = !isNilOrEmpty(match) && isNilOrEmpty(item?.href);

  return (
    <MenuItem
      {...rest}
      {...(isNilOrEmpty(item.href)
        ? {
            onClick: handleMenuClick,
            component: Link,
            to: `${route.path}/${item?.path ?? ''}`,
          }
        : {
            href: item.href,
            target: '_blank',
            rel: 'noopener noreferrer nofollow',
            component: 'a',
          })}
      sx={[
        {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1,
          borderRadius: 1,
          '&&&': { minHeight: 36 },
          '&:hover': {
            backgroundColor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.hoverOpacity,
              ),
          },
        },
        isSelected
          ? {
              backgroundColor: 'primary.faded',
            }
          : {
              backgroundColor: 'transparent',
            },
        isSelected
          ? {
              color: 'primary.main',
            }
          : {
              color: 'text.primary',
            },
      ]}
    >
      <Typography
        sx={{
          fontWeight: 'medium',
        }}
      >
        {intl.formatMessage(item.title)}
      </Typography>
      {!isNilOrEmpty(item?.href) && (
        <FaArrowUpRightRegular sx={{ fontSize: 14 }} />
      )}
    </MenuItem>
  );
};
