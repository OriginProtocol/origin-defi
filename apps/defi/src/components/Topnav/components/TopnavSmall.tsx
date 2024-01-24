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
import { not } from 'ramda';
import { useIntl } from 'react-intl';
import { Link as RouterLink, useMatch, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';

import { routes } from '../../../routes';

import type { ButtonProps } from '@mui/material';
import type { KeyboardEvent } from 'react';
import type { RouteObject } from 'react-router-dom';

export const TopnavSmall = () => {
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
        height: '56px',
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
            gap: 2,
          }}
        >
          {routes[0].children.map((route, i) => (
            <NavItem key={`${route?.path ?? 'topButton'}-${i}`} route={route} />
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

type NavItemProps = {
  route: RouteObject;
} & Omit<ButtonProps, 'onClick'>;

const NavItem = ({ route, ...rest }: NavItemProps) => {
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

  return (
    <>
      <Button
        variant="text"
        {...rest}
        sx={{
          color: isNilOrEmpty(match) ? 'text.secondary' : 'text.primary',
          ...rest?.sx,
        }}
        ref={anchorEl}
        onClick={() => {
          setOpen(not);
        }}
        onMouseEnter={() => {
          setOpen(true);
        }}
        onMouseLeave={() => {
          setOpen(false);
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
                padding: 0,
              }}
            >
              <MenuList
                autoFocusItem={open}
                onKeyDown={handleListKeyDown}
                sx={{ py: 0 }}
              >
                {route?.children?.map((r, i) => (
                  <MenuItem
                    key={`${r?.handle?.label ?? 'menu'}-${i}`}
                    onClick={handleMenuClick(r?.path ?? '')}
                  >
                    <Stack direction="row">
                      {r.handle.icon}
                      <Stack>
                        <Typography>{r.handle.title}</Typography>
                        <Typography>{r.handle.subtitle}</Typography>
                      </Stack>
                    </Stack>
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
