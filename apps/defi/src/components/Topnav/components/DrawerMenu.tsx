import { useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
  FaBookRegular,
  FaXmarkRegular,
  OriginLabel,
} from '@origin/shared/icons';
import { isNilOrEmpty } from '@origin/shared/utils';
import { remove } from 'ramda';
import { useIntl } from 'react-intl';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { routes } from '../../../routes';
import { additionalLinks } from '../constants';

import type { StackProps } from '@mui/material';
import type { MouseEvent } from 'react';
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
          py: 2,
          pl: 2,
          pr: 3,
          height: 64,
          color: 'text.primary',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <Stack direction="row" flexGrow={1} alignItems="center" spacing={1}>
          <FaBookRegular sx={{ fontSize: 16 }} />
          <Typography fontWeight="medium">
            {intl.formatMessage({ defaultMessage: 'Docs' })}
          </Typography>
        </Stack>
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

  const handleMenuClick = (path: string) => (evt: MouseEvent) => {
    onClose();
    navigate(`${route.path}/${path ?? ''}`);
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
          height: 64,
          px: 0,
          fontWeight: 'medium',
          '&:hover': {
            backgroundColor: 'transparent',
          },
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
    <Accordion
      key={key}
      expanded={expanded.includes(key)}
      onChange={handleToggle(key)}
      sx={{
        p: 0,
        border: 'none',
      }}
      disableGutters
    >
      <AccordionSummary sx={{ pl: 2, pr: 3, height: 64 }}>
        <Stack
          width={1}
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={1} alignItems="center">
            {!isNilOrEmpty(route?.handle?.icon) && (
              <Box
                component={route.handle.icon}
                sx={{ width: 16, height: 16, color: 'text.tertiary' }}
              />
            )}
            <Typography fontWeight="medium">
              {intl.formatMessage(route.handle.title)}
            </Typography>
          </Stack>
          <ExpandIcon
            isExpanded={expanded.includes(key)}
            sx={{ fontSize: 16 }}
          />
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <MenuList sx={{ p: 0 }}>
          {items.map((r) => (
            <MenuItem
              key={`${r?.path ?? r?.href}-${index}`}
              {...(isNilOrEmpty(r.href)
                ? { onClick: handleMenuClick(r?.path ?? '') }
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
                height: 64,
                pl: 3,
                pr: 2,
                '.subtitle': { color: 'text.secondary' },
                '.arrow': {
                  color: 'text.secondary',
                  fontSize: 18,
                },
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <Box
                component={r.icon}
                sx={{ width: 16, height: 16, color: 'text.secondary' }}
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
                <FaArrowUpRightRegular className="arrow" />
              )}
            </MenuItem>
          ))}
        </MenuList>
      </AccordionDetails>
    </Accordion>
  );
};
