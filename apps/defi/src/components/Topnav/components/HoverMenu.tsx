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
import {
  FaArrowUpRightRegular,
  FaChevronDownRegular,
} from '@origin/shared/icons';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useMatch, useNavigate } from 'react-router-dom';

import { routes } from '../../../routes';
import { additionalLinks } from '../constants';

import type { ButtonProps, MenuItemProps } from '@mui/material';
import type { Dispatch, KeyboardEvent, SetStateAction } from 'react';
import type { RouteObject } from 'react-router-dom';

import type { NavItem } from '../types';

export const HoverMenu = () => {
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
  const match = useMatch({ path: route?.path ?? '/', end: route.index });
  const isSelected = !isNilOrEmpty(match);

  const handleListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
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
        sx={{
          color: 'text.primary',
          backgroundColor: isSelected ? 'primary.faded' : 'transparent',
          svg: { ml: 0.75, width: 12, height: 12 },
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
        sx={{
          color: 'text.primary',
          backgroundColor: isSelected ? 'primary.faded' : 'transparent',
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
        <FaChevronDownRegular />
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
              <MenuList onKeyDown={handleListKeyDown} sx={{ p: 0 }}>
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
  const navigate = useNavigate();
  const match = useMatch({
    path: `${route.path}/${item?.path ?? ''}`,
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
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1,
        borderRadius: 1,
        backgroundColor: isSelected ? 'primary.faded' : 'transparent',
        color: isSelected ? 'primary.main' : 'text.primary',
        my: 0.25,
        '&&&': { minHeight: 36 },
        '&:hover': {
          backgroundColor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.hoverOpacity,
            ),
        },
      }}
    >
      <Typography fontWeight="medium">
        {intl.formatMessage(item.title)}
      </Typography>
      {!isNilOrEmpty(item?.href) && (
        <FaArrowUpRightRegular sx={{ fontSize: 14 }} />
      )}
    </MenuItem>
  );
};
