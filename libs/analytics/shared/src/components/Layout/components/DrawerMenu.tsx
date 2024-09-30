import { useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  alpha,
  Button,
  Collapse,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { OriginProductIcon } from '@origin/shared/components';
import {
  FaChevronDownRegular,
  FaChevronRightRegular,
  FaXmarkRegular,
} from '@origin/shared/icons';
import { ThemeModeIconButton } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { remove } from 'ramda';
import { useIntl } from 'react-intl';
import { Link as RouterLink, useMatch, useNavigate } from 'react-router-dom';

import { DRAWER_MD_COLLAPSED_WIDTH } from '../constants';
import { useLayout } from '../hooks';

import type { MenuItemProps, StackProps } from '@mui/material';
import type { RouteObject } from 'react-router-dom';

import type { NavItem } from '../types';

export type DrawerMenuProps = {
  routes: RouteObject[];
} & StackProps;

export const DrawerMenu = ({ routes, ...rest }: DrawerMenuProps) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const [{ isDrawerOpen }, { handleSetDrawer, handleToggleDrawer }] =
    useLayout();

  const visibleRoutes = routes?.[0]?.children?.filter(
    (r) => !isNilOrEmpty(r?.handle?.title),
  );

  const isWide = isSm || isDrawerOpen;

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
        sx={(theme) => ({
          height: theme.mixins.toolbar.height,
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 1,
          px: 2,
          py: 1,
        })}
      >
        <Collapse in={isWide} orientation="horizontal">
          <RouterLink to="/" style={{ textDecoration: 'none' }}>
            <OriginProductIcon name="Analytics" />
          </RouterLink>
        </Collapse>
        <IconButton
          onClick={handleToggleDrawer}
          sx={(theme) => ({
            width: 36,
            height: 36,
            border: `1px solid ${theme.palette.divider}`,
          })}
        >
          {isWide ? (
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
            isWide={isWide}
          />
        ))}
      </Stack>
      <Stack
        sx={[
          {
            alignItems: 'flex-end',
            pr: 2,
          },
        ]}
      >
        <ThemeModeIconButton variant="outlined" color="secondary" />
      </Stack>
    </Stack>
  );
};

type NavItemProps = {
  route: RouteObject;
  index: number;
  onClose: () => void;
  isWide: boolean;
};

const NavItem = ({ route, index, onClose, isWide }: NavItemProps) => {
  const key = route?.path ?? `index-${index}}`;

  const intl = useIntl();
  const navigate = useNavigate();
  const match = useMatch(key);
  const [expanded, setExpanded] = useState<string[]>([...(match ? [key] : [])]);

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
        ]}
      >
        {isWide ? (
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
      sx={{
        p: 0,
        border: 'none',
        width: 1,
      }}
      disableGutters
    >
      <AccordionSummary
        expandIcon={isWide ? <FaChevronDownRegular /> : null}
        sx={[
          {
            height: DRAWER_MD_COLLAPSED_WIDTH,
            '&:hover': {
              backgroundColor: (theme) =>
                alpha(
                  theme.palette.primary.main,
                  theme.palette.action.hoverOpacity,
                ),
            },
            '& .MuiAccordionSummary-expandIconWrapper': {
              mr: 2,
            },
          },
        ]}
      >
        <Stack
          direction="row"
          sx={[
            {
              pl: 2,
              width: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
            },
          ]}
        >
          <SvgIcon component={route.handle.icon} sx={{ fontSize: 36 }} />
          <Collapse in={isWide} orientation="horizontal">
            <Typography
              sx={{
                pl: 2,
                fontWeight: 'medium',
              }}
            >
              {intl.formatMessage(route.handle.title)}
            </Typography>
          </Collapse>
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <MenuList
          variant="selectedMenu"
          sx={{ display: 'flex', flexDirection: 'column', p: 0 }}
        >
          {items.map((r) => (
            <ListMenuItem
              key={`${r?.path ?? r?.href}-${index}`}
              route={route}
              item={r}
              onClose={onClose}
              isWide={isWide}
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
  isWide: boolean;
} & MenuItemProps;

const ListMenuItem = ({
  route,
  item,
  onClose,
  isWide,
  ...rest
}: ListMenuItemProps) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const match = useMatch({
    path: `${route.path}/${item?.path ? `${item.path}/*` : ''}`,
  });

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
        (theme) => ({
          transition: theme.transitions.create('padding-left', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          pl: isWide ? 5 : '21px',
          py: 1.5,
        }),
        isSelected
          ? {
              color: 'primary.main',
              svg: { color: 'primary.main' },
            }
          : {
              color: 'text.primary',
              svg: { color: 'text.primary' },
            },
      ]}
    >
      <ListItemIcon>
        <SvgIcon component={item.icon} fontSize="medium" />
      </ListItemIcon>
      {isWide && <ListItemText>{intl.formatMessage(item.title)}</ListItemText>}
    </MenuItem>
  );
};
