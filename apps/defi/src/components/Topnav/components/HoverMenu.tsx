import { useRef, useState } from 'react';

import {
  Box,
  Button,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  Typography,
} from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';
import { FaChevronDown } from 'react-icons/fa6';
import { GoArrowUpRight } from 'react-icons/go';
import { useIntl } from 'react-intl';
import { useMatch, useNavigate } from 'react-router-dom';

import { routes } from '../../../routes';
import { additionalLinks } from '../constants';

import type { ButtonProps } from '@mui/material';
import type { KeyboardEvent } from 'react';
import type { RouteObject } from 'react-router-dom';

import type { NavItem } from '../types';

export const HoverMenu = () => {
  return (
    <Stack
      sx={{
        width: 1,
        height: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      {routes[0].children.map((route, i) => (
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
  const match = useMatch({ path: route?.path ?? '/', end: route.index });

  const handleMenuClick = (path: string) => () => {
    setOpen(false);
    navigate(`${route.path}/${path ?? ''}`);
  };

  const handleListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  if (isNilOrEmpty(route?.children)) {
    return (
      <Button
        variant="text"
        {...rest}
        sx={{
          color: isNilOrEmpty(match) ? 'text.secondary' : 'text.primary',
          ...rest?.sx,
        }}
        onClick={() => {
          navigate(`${route?.path ?? ''}/`);
        }}
      >
        {intl.formatMessage(route.handle.title)}
      </Button>
    );
  }

  const items = [
    ...(route?.children.map(
      (r) =>
        ({
          title: r.handle.title,
          subtitle: r.handle.subtitle,
          icon: r.handle.icon,
          path: r.path,
          href: null,
        }) as NavItem,
    ) ?? []),
    ...(additionalLinks?.[route.path] ?? []),
  ];

  return (
    <>
      <Button
        variant="text"
        {...rest}
        sx={{
          color: isNilOrEmpty(match) ? 'text.secondary' : 'text.primary',
          svg: { ml: 0.75, width: 12, height: 12 },
          ...rest?.sx,
        }}
        ref={anchorEl}
        onMouseEnter={() => {
          setOpen(true);
        }}
        onMouseLeave={() => {
          setOpen(false);
        }}
      >
        {intl.formatMessage(route.handle.title)}
        <FaChevronDown />
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
                borderRadius: 3,
                padding: 0.5,
                border: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            >
              <MenuList onKeyDown={handleListKeyDown} sx={{ p: 0 }}>
                {items.map((r, i) => (
                  <MenuItem
                    key={`${r?.path ?? r?.href}-${i}`}
                    {...(isNilOrEmpty(r.href)
                      ? { onClick: handleMenuClick(r?.path) }
                      : {
                          href: r.href,
                          target: '_blank',
                          rel: 'noopener noreferrer nofollow',
                          component: 'a',
                        })}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 1.5,
                      py: 1,
                      borderRadius: 2,
                      '.subtitle': { color: 'text.tertiary' },
                      '.arrow': {
                        color: 'text.tertiary',
                        fontSize: 18,
                        transform: 'translateY(4px)',
                      },
                      ':hover': {
                        backgroundColor: 'background.header',
                        '.subtitle': { color: 'text.primary' },
                      },
                    }}
                  >
                    <Box
                      component={r.icon}
                      sx={{ width: 16, height: 16, color: 'text.tertiary' }}
                    />
                    <Stack flexGrow={1}>
                      <Typography fontWeight="medium">
                        {intl.formatMessage(r.title)}
                      </Typography>
                      <Typography className="subtitle">
                        {intl.formatMessage(r.subtitle)}
                      </Typography>
                    </Stack>
                    {!isNilOrEmpty(r?.href) && (
                      <GoArrowUpRight className="arrow" />
                    )}
                  </MenuItem>
                ))}
              </MenuList>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};
