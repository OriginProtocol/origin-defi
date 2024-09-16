import { useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  alpha,
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  MenuList,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import { ExpandIcon } from '@origin/shared/components';
import {
  FaArrowUpRightRegular,
  FaChevronRightRegular,
  FaXmarkRegular,
  OriginLabel,
} from '@origin/shared/icons';
import { ThemeModeIconButton } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { remove } from 'ramda';
import { useIntl } from 'react-intl';
import { Link as RouterLink, useMatch, useNavigate } from 'react-router-dom';

import { useLayout } from '../hooks';

import type { MenuItemProps, StackProps } from '@mui/material';
import type { RouteObject } from 'react-router-dom';

import type { NavItem } from '../types';

export type DrawerMenuProps = {
  routes: RouteObject[];
} & StackProps;

export const DrawerMenu = ({ routes, ...rest }: DrawerMenuProps) => {
  const [{ isDrawerOpen }, { handleSetDrawer, handleToggleDrawer }] =
    useLayout();

  const visibleRoutes = routes?.[0]?.children?.filter(
    (r) => !isNilOrEmpty(r?.handle?.title),
  );

  return (
    <Stack
      {...rest}
      sx={[
        { height: 1, pb: 2 },
        ...(Array.isArray(rest?.sx) ? rest.sx : [rest?.sx]),
      ]}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            svg: { height: { xs: 16, md: 24 }, width: 1 },
          }}
        >
          <OriginLabel />
        </Box>
        <IconButton
          onClick={handleToggleDrawer}
          sx={(theme) => ({
            width: 36,
            height: 36,
            border: `1px solid ${theme.palette.divider}`,
          })}
        >
          {isDrawerOpen ? (
            <FaXmarkRegular sx={{ fontSize: 16 }} />
          ) : (
            <FaChevronRightRegular sx={{ fontSize: 16 }} />
          )}
        </IconButton>
      </Stack>
      <Stack divider={<Divider />} sx={{ flexGrow: 1 }}>
        {visibleRoutes?.map((route, i) => (
          <NavItem
            key={route?.path ?? `index-${i}}`}
            route={route}
            index={i}
            onClose={() => {
              handleSetDrawer(false);
            }}
          />
        ))}
      </Stack>
      <Stack
        sx={[
          isDrawerOpen
            ? { alignItems: 'flex-end', pr: 2 }
            : { alignItems: 'center' },
        ]}
      >
        <ThemeModeIconButton variant="outlined" />
      </Stack>
    </Stack>
  );
};

type NavItemProps = {
  route: RouteObject;
  index: number;
  onClose: () => void;
};

const NavItem = ({ route, index, onClose }: NavItemProps) => {
  const key = route?.path ?? `index-${index}}`;

  const intl = useIntl();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string[]>([]);
  const [{ isDrawerOpen }] = useLayout();

  const handleToggle = (key: string) => () => {
    const idx = expanded.findIndex((a) => a === key);
    if (idx > -1) {
      setExpanded((prev) => remove(idx, 1, prev));
    } else {
      setExpanded((prev) => [...prev, key]);
    }
  };

  if (isNilOrEmpty(route?.children)) {
    return (
      <Button
        variant="text"
        key={key}
        onClick={() => {
          navigate(`${route?.path ?? ''}/`);
          onClose();
        }}
        sx={[
          {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',

            px: 0,
            fontWeight: 'medium',
          },
          isDrawerOpen ? { height: 36 } : { height: 64 },
        ]}
      >
        {isDrawerOpen ? (
          intl.formatMessage(route.handle.title)
        ) : (
          <SvgIcon component={route.handle.icon} />
        )}
      </Button>
    );
  }

  const items =
    route?.children
      ?.filter((r) => !isNilOrEmpty(r?.handle?.title))
      ?.map(
        (r) =>
          ({
            title: r.handle.title,
            icon: r.handle.icon,
            path: r.path,
            href: null,
          }) as unknown as NavItem,
      ) ?? [];

  return (
    <Accordion
      key={key}
      expanded={expanded.includes(key)}
      onChange={handleToggle(key)}
      sx={[
        {
          px: 0,
          border: 'none',
        },
        isDrawerOpen ? { py: 1 } : { py: 0 },
      ]}
      disableGutters
    >
      <AccordionSummary
        sx={[
          {
            '&:hover': {
              backgroundColor: (theme) =>
                alpha(
                  theme.palette.primary.main,
                  theme.palette.action.hoverOpacity,
                ),
            },
          },
          isDrawerOpen
            ? {
                pl: 2,
                pr: 3,
                height: 36,
              }
            : {
                display: 'flex',
                height: 64,
              },
        ]}
      >
        {isDrawerOpen ? (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              width: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                fontWeight: 'medium',
              }}
            >
              {intl.formatMessage(route.handle.title)}
            </Typography>
            <ExpandIcon
              isExpanded={expanded.includes(key)}
              sx={{ fontSize: 16 }}
            />
          </Stack>
        ) : (
          <Stack
            sx={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <SvgIcon component={route.handle.icon} sx={{ fontSize: 36 }} />
          </Stack>
        )}
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <MenuList sx={[isDrawerOpen ? { py: 0, px: 2 } : { py: 1 }]}>
          {items.map((r) => (
            <ListMenuItem
              key={`${r?.path ?? r?.href}-${index}`}
              route={route}
              item={r}
              onClose={onClose}
            />
          ))}
        </MenuList>
      </AccordionDetails>
    </Accordion>
  );
};

type ListMenuItemProps = {
  route: RouteObject;
  item: NavItem;
  onClose: () => void;
} & MenuItemProps;

const ListMenuItem = ({ route, item, onClose, ...rest }: ListMenuItemProps) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const match = useMatch({
    path: `${route.path}/${item?.path ?? ''}`,
  });
  const [{ isDrawerOpen }] = useLayout();

  const handleMenuClick = (path: string) => () => {
    navigate(`${route.path}/${path ?? ''}`);
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
        isDrawerOpen
          ? {
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1.5,
              height: 36,
              pl: 3,
              pr: 2,
              my: 0.25,
              borderRadius: 1,
            }
          : { justifyContent: 'center', height: 64 },
        isSelected
          ? {
              color: 'primary.main',
            }
          : {
              color: 'text.primary',
            },
      ]}
    >
      {isDrawerOpen ? (
        <Stack direction="row" alignItems="center">
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
        </Stack>
      ) : (
        <SvgIcon component={item.icon} sx={{ fontSize: 24 }} />
      )}
    </MenuItem>
  );
};
