import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  alpha,
  Button,
  Divider,
  IconButton,
  MenuList,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ExpandIcon, OriginProductIcon } from '@origin/shared/components';
import {
  FaChevronLeftRegular,
  FaChevronRightRegular,
} from '@origin/shared/icons';
import { ThemeModeIconButton } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { Link as RouterLink, useMatch, useNavigate } from 'react-router';

import { useLayout } from '../hooks';
import { ListMenuItem } from './ListMenuItem';

import type { StackProps } from '@mui/material';
import type { MouseEvent } from 'react';
import type { RouteObject } from 'react-router';

import type { NavItem } from '../types';

export const DrawerMenu = (props: StackProps) => {
  const [{ isDrawerOpen, routes }, { handleSetDrawer, handleToggleDrawer }] =
    useLayout();

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
          <OriginProductIcon name="Analytics" />
        </RouterLink>
      </Stack>
      <Stack divider={<Divider />} sx={{ flexGrow: 1 }}>
        {routes?.map((route, i) => (
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
        direction="row"
        spacing={1}
        sx={{ justifyContent: 'flex-end', pr: 1.5 }}
      >
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
  onClose: () => void;
};

const NavItem = ({ route, index, onClose }: NavItemProps) => {
  const key = route?.path ?? `index-${index}}`;

  const intl = useIntl();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const routeMatch = useMatch('/');
  const match = useMatch(`${route?.path ?? ''}/*`);
  const [
    { expandedSections },
    { handleToggleSection, handleAddSection, handleSetDrawer },
  ] = useLayout();

  const handleClick = () => {
    if (isSm) {
      handleSetDrawer(false);
    }
  };

  if (isNilOrEmpty(route?.children)) {
    return (
      <Button
        variant="text"
        color="secondary"
        key={key}
        onClick={handleClick}
        sx={[
          {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderRadius: 0,
            width: 1,
            px: 3,
            py: 2,
            '&:hover': {
              boxShadow: (theme) =>
                `inset 2px 0 0 0 ${theme.palette.primary.main}`,
            },
          },
          routeMatch && {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            boxShadow: (theme) =>
              `inset 2px 0 0 0 ${theme.palette.primary.main}`,
          },
        ]}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 'medium',
          }}
        >
          {intl.formatMessage(route.handle.title)}
        </Typography>
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
      expanded={expandedSections.includes(key)}
      sx={{
        p: 0,
        border: 'none',
        width: 1,
      }}
      disableGutters
    >
      <AccordionSummary
        onClick={() => {
          navigate(`${route.path}/`);
          handleAddSection(key);
        }}
        sx={[
          {
            py: 1.5,
            justifyContent: 'flex-start',
            alignItems: 'center',
            '&:hover': {
              backgroundColor: (theme) =>
                alpha(
                  theme.palette.primary.main,
                  theme.palette.action.hoverOpacity,
                ),
            },
          },
          match && {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            boxShadow: (theme) =>
              `inset 2px 0 0 0 ${theme.palette.primary.main}`,
          },
        ]}
      >
        <Stack
          direction="row"
          sx={{
            width: 1,
            pl: 3,
            pr: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 'medium',
            }}
          >
            {intl.formatMessage(route.handle.title)}
          </Typography>
          <IconButton
            onClick={(evt: MouseEvent) => {
              evt.stopPropagation();
              handleToggleSection(key);
            }}
          >
            <ExpandIcon
              isExpanded={expandedSections.includes(key)}
              sx={{ color: 'text.secondary', fontSize: 14 }}
            />
          </IconButton>
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
              onClick={handleClick}
            />
          ))}
        </MenuList>
      </AccordionDetails>
    </Accordion>
  );
};
