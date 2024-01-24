import { useRef, useState } from 'react';

import {
  alpha,
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
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { trackEvent } from '@origin/defi/shared';
import { tokens } from '@origin/shared/contracts';
import { OriginLabel } from '@origin/shared/icons';
import {
  AccountPopover,
  ActivityButton,
  OpenAccountModalButton,
} from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { FaChevronDown } from 'react-icons/fa';
import { GoArrowUpRight } from 'react-icons/go';
import { useIntl } from 'react-intl';
import { Link as RouterLink, useMatch, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

import { routes } from '../../../routes';
import { additionalLinks } from '../constants';

import type { ButtonProps } from '@mui/material';
import type { KeyboardEvent } from 'react';
import type { RouteObject } from 'react-router-dom';

import type { NavItem } from '../types';

export const TopnavLarge = () => {
  const { isConnected } = useAccount();
  const [accountModalAnchor, setAccountModalAnchor] =
    useState<HTMLButtonElement | null>(null);

  return (
    <Box
      component="nav"
      sx={(theme) => ({
        position: 'fixed',
        top: 0,
        left: 0,
        width: 1,
        height: '72px',
        zIndex: theme.zIndex.appBar,
        backgroundColor: alpha(theme.palette.background.default, 0.6),
        backdropFilter: 'blur(15px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        px: {
          xs: 2.5,
          md: 5,
        },
      })}
    >
      <Grid2 container height={1} width={1}>
        <Grid2
          xs={3}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
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
        </Grid2>
        <Grid2
          xs={6}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          {routes[0].children.map((route, i) => (
            <NavMenuItem
              key={`${route?.path ?? 'topButton'}-${i}`}
              route={route}
            />
          ))}
        </Grid2>
        <Grid2
          xs={3}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 1,
          }}
        >
          <OpenAccountModalButton
            onClick={(e) => {
              if (isConnected) {
                setAccountModalAnchor(e.currentTarget);
                trackEvent({
                  name: 'open_account',
                });
              } else {
                trackEvent({
                  name: 'connect_click',
                });
              }
            }}
            sx={{
              borderRadius: 25,
              paddingX: {
                md: 3,
                xs: 2,
              },
              paddingY: {
                md: 1,
                xs: 0.75,
              },
              minWidth: 36,
              maxWidth: { xs: isConnected ? 36 : 160, sm: 160, lg: 220 },
              fontWeight: 500,
              minHeight: { xs: 36, md: 44 },
            }}
          />
          <AccountPopover
            anchor={accountModalAnchor}
            setAnchor={setAccountModalAnchor}
            balanceTokens={[
              tokens.mainnet.OETH,
              tokens.mainnet.wOETH,
              tokens.mainnet.WETH,
              tokens.mainnet.rETH,
              tokens.mainnet.frxETH,
              tokens.mainnet.sfrxETH,
              tokens.mainnet.stETH,
            ]}
          />
          <ActivityButton
            sx={{
              width: { xs: 36, md: 44 },
              height: { xs: 36, md: 44 },
              padding: {
                xs: 0.75,
                md: 1,
              },
            }}
          />
        </Grid2>
      </Grid2>
    </Box>
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
          svg: { ml: 0.75 },
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
                borderWidth: 1,
                borderColor: 'divider',
              }}
            >
              <MenuList onKeyDown={handleListKeyDown} sx={{ p: 0 }}>
                {items.map((r, i) => (
                  <MenuItem
                    key={`${r?.path ?? r?.href}-${i}`}
                    disableGutters
                    {...(isNilOrEmpty(r?.path)
                      ? {
                          href: r.href,
                          target: '_blank',
                          rel: 'noopener noreferrer nofollow',
                          component: 'a',
                        }
                      : { onClick: handleMenuClick(r.path ?? '') })}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 2,
                      px: 1.5,
                      ...(i === 0 && {
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                      }),
                      ...(i === items.length - 1 && {
                        borderBottomLeftRadius: 8,
                        borderBottomRightRadius: 8,
                      }),
                      svg: { width: 16, height: 16, color: 'text.tertiary' },
                      '.subtitle': { color: 'text.tertiary' },
                      ':hover': {
                        backgroundColor: 'background.header',
                        '.subtitle': { color: 'text.primary' },
                      },
                    }}
                  >
                    <Box component={r.icon} />
                    <Stack flexGrow={1}>
                      <Typography>{intl.formatMessage(r.title)}</Typography>
                      <Typography className="subtitle">
                        {intl.formatMessage(r.subtitle)}
                      </Typography>
                    </Stack>
                    {!isNilOrEmpty(r.href) && <GoArrowUpRight />}
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
