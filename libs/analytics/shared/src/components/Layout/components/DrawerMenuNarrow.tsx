import { useRef, useState } from 'react';

import {
  Button,
  Divider,
  Grow,
  MenuList,
  Paper,
  Popper,
  Stack,
  SvgIcon,
} from '@mui/material';
import {
  FaChevronLeftRegular,
  FaChevronRightRegular,
  OriginLogo,
} from '@origin/shared/icons';
import { ThemeModeIconButton } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { Link as RouterLink, useMatch, useNavigate } from 'react-router';

import { DRAWER_MD_COLLAPSED_WIDTH } from '../constants';
import { useLayout } from '../hooks';
import { ListMenuItem } from './ListMenuItem';

import type { StackProps } from '@mui/material';
import type { RouteObject } from 'react-router';

import type { NavItem } from '../types';

export const DrawerMenuNarrow = (props: StackProps) => {
  const [{ isDrawerOpen, routes }, { handleToggleDrawer }] = useLayout();

  return (
    <Stack
      {...props}
      sx={[
        { height: 1, pb: 2 },
        ...(Array.isArray(props?.sx) ? props.sx : [props?.sx]),
      ]}
    >
      <Stack
        direction="row"
        sx={(theme) => ({
          height: theme.mixins.toolbar.height,
          alignItems: 'center',
          width: 1,
          pl: 2,
          pr: 1.5,
          py: 1,
        })}
      >
        <RouterLink to="/" style={{ textDecoration: 'none' }}>
          <OriginLogo sx={{ fontSize: 32 }} />
        </RouterLink>
      </Stack>
      <Stack divider={<Divider />} sx={{ flexGrow: 1 }}>
        {routes?.map((route, i) => (
          <NavItem key={route?.path ?? `index-${i}}`} route={route} index={i} />
        ))}
      </Stack>
      <Stack direction="column" spacing={1} sx={{ p: 1, alignItems: 'center' }}>
        <ThemeModeIconButton variant="outlined" color="secondary" />
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleToggleDrawer}
        >
          {isDrawerOpen ? <FaChevronLeftRegular /> : <FaChevronRightRegular />}
        </Button>
      </Stack>
    </Stack>
  );
};

type NavItemProps = {
  route: RouteObject;
  index: number;
};

const NavItem = ({ route, index }: NavItemProps) => {
  const [open, setOpen] = useState(false);
  const anchorEl = useRef(null);
  const navigate = useNavigate();
  const match = useMatch(`${route?.path ?? ''}/*`);

  if (isNilOrEmpty(route?.children)) {
    return null;
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
    <>
      <Button
        variant="text"
        size="large"
        sx={[
          {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            pl: `${DRAWER_MD_COLLAPSED_WIDTH / 2}px`,
            borderRadius: 0,
          },
          open
            ? {
                backgroundColor: 'primary.faded',
              }
            : {
                backgroundColor: 'transparent',
              },
          match && {
            boxShadow: (theme) =>
              `inset 2px 0 0 0 ${theme.palette.primary.main}`,
            '&:hover': {
              boxShadow: (theme) =>
                `inset 2px 0 0 0 ${theme.palette.primary.main}`,
            },
          },
        ]}
        ref={anchorEl}
        onClick={() => {
          navigate(`${route?.path ?? ''}/${items[0]?.path ?? ''}`);
        }}
        onMouseEnter={() => {
          setOpen(true);
        }}
        onMouseLeave={() => {
          setOpen(false);
        }}
      >
        <SvgIcon
          component={route.handle.icon}
          sx={{ fontSize: 24, transform: 'translateX(-12px)' }}
        />
      </Button>
      <Popper
        transition
        placement="right-start"
        modifiers={[
          {
            name: 'preventOverflow',
            enabled: true,
            options: {
              altAxis: true,
              altBoundary: false,
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
                mt: -1.5,
                borderRadius: 4,
                padding: 2,
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.highlight',
                minWidth: 200,
              }}
            >
              <MenuList
                variant="selectedMenu"
                sx={{ display: 'flex', flexDirection: 'column', p: 0 }}
              >
                {items.map((r) => (
                  <ListMenuItem
                    key={`${r?.path ?? r?.href}-${index}`}
                    route={route}
                    item={r}
                    onClick={() => {
                      setOpen(false);
                    }}
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
