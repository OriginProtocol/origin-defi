import { useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  alpha,
  Box,
  Button,
  IconButton,
  MenuItem,
  MenuList,
  Stack,
  Typography,
} from '@mui/material';
import { ExpandIcon } from '@origin/shared/components';
import { OUSD_DOCS_URL } from '@origin/shared/constants';
import {
  FaArrowUpRightRegular,
  FaXmarkRegular,
  OriginLabel,
} from '@origin/shared/icons';
import { isNilOrEmpty } from '@origin/shared/utils';
import { remove } from 'ramda';
import { useIntl } from 'react-intl';
import { Link as RouterLink, useMatch, useNavigate } from 'react-router-dom';

import { routes } from '../../../routes';
import { additionalLinks } from '../constants';

import type { MenuItemProps, StackProps } from '@mui/material';
import type { RouteObject } from 'react-router-dom';

import type { NavItem } from '../types';

export type DrawerMenuProps = { onClose: () => void } & StackProps;

export const DrawerMenu = ({ onClose, ...rest }: DrawerMenuProps) => {
  const intl = useIntl();

  const visibleRoutes = routes?.[0]?.children?.filter(
    (r) => !isNilOrEmpty(r?.handle?.title),
  );

  return (
    <Stack {...rest}>
      <Stack direction="row" justifyContent="space-between" p={2}>
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
          onClick={onClose}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <FaXmarkRegular sx={{ fontSize: 16 }} />
        </IconButton>
      </Stack>
      {visibleRoutes?.map((route, i) => (
        <NavItem
          key={route?.path ?? `index-${i}}`}
          route={route}
          index={i}
          onClose={onClose}
        />
      ))}
      <Button
        href={OUSD_DOCS_URL}
        target="_blank"
        rel="noopener noreferrer nofollow"
        variant="text"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 1.5,
          py: 2,
          pl: 2,
          pr: 3,
          height: 36,
          color: 'text.primary',
        }}
      >
        <Typography fontWeight="medium">
          {intl.formatMessage({ defaultMessage: 'Docs' })}
        </Typography>
        <FaArrowUpRightRegular className="arrow" />
      </Button>
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
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: 36,
          px: 0,
          fontWeight: 'medium',
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
            icon: r.handle.icon,
            path: r.path,
            href: null,
          }) as unknown as NavItem,
      ) ?? []),
    ...(additionalLinks?.[route?.path ?? ''] ?? []),
  ];

  return (
    <Accordion
      key={key}
      expanded={expanded.includes(key)}
      onChange={handleToggle(key)}
      sx={{
        px: 0,
        py: 1,
        border: 'none',
      }}
      disableGutters
    >
      <AccordionSummary
        sx={{
          pl: 2,
          pr: 3,
          height: 36,
          '&:hover': {
            backgroundColor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.hoverOpacity,
              ),
          },
        }}
      >
        <Stack
          width={1}
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography fontWeight="medium">
            {intl.formatMessage(route.handle.title)}
          </Typography>
          <ExpandIcon
            isExpanded={expanded.includes(key)}
            sx={{ fontSize: 16 }}
          />
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <MenuList sx={{ py: 0, px: 2 }}>
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

  const handleMenuClick = (path: string) => () => {
    onClose();
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
        gap: 1.5,
        height: 36,
        pl: 3,
        pr: 2,
        my: 0.25,
        borderRadius: 1,
        color: isSelected ? 'primary.main' : 'text.primary',
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
