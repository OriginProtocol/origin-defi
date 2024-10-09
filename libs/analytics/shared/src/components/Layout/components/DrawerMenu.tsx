import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  alpha,
  Button,
  Divider,
  MenuItem,
  MenuList,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ExpandIcon, OriginProductIcon } from '@origin/shared/components';
import {
  FaChevronLeftRegular,
  FaChevronRightRegular,
  OriginLogo,
} from '@origin/shared/icons';
import { ThemeModeIconButton } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { Link as RouterLink, useMatch, useNavigate } from 'react-router-dom';

import { useLayout } from '../hooks';

import type { MenuItemProps, StackProps } from '@mui/material';
import type { RouteObject } from 'react-router-dom';

import type { NavItem } from '../types';

export const DrawerMenu = (props: StackProps) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const [{ isDrawerOpen, routes }, { handleSetDrawer, handleToggleDrawer }] =
    useLayout();

  const isWide = isSm || isDrawerOpen;

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
        {isWide ? (
          <RouterLink to="/" style={{ textDecoration: 'none' }}>
            <OriginProductIcon name="Analytics" />
          </RouterLink>
        ) : (
          <RouterLink to="/" style={{ textDecoration: 'none' }}>
            <OriginLogo sx={{ fontSize: 32 }} />
          </RouterLink>
        )}
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
            isWide={isWide}
          />
        ))}
      </Stack>
      <Stack
        useFlexGap
        sx={[
          {
            rowGap: 1,
            columnGap: 1,
            alignItems: 'flex-end',
            pr: 1.5,
          },
          isWide
            ? {
                flexDirection: 'row-reverse',
              }
            : {
                flexDirection: 'column-reverse',
              },
        ]}
      >
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleToggleDrawer}
        >
          {isWide ? <FaChevronLeftRegular /> : <FaChevronRightRegular />}
        </Button>
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
  const theme = useTheme();
  const navigate = useNavigate();
  const match = useMatch(`${route?.path ?? ''}/*`);
  const [{ expandedSections }, { handleToggleSection }] = useLayout();

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
      expanded={expandedSections.includes(key)}
      onChange={() => handleToggleSection(key)}
      sx={{
        p: 0,
        border: 'none',
        width: 1,
      }}
      disableGutters
    >
      <AccordionSummary
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
          match &&
            isWide && {
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              boxShadow: (theme) =>
                `inset 2px 0 0 0 ${theme.palette.primary.main}`,
            },
        ]}
      >
        {isWide ? (
          <Stack
            direction="row"
            sx={{
              width: 1,
              px: 3,
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
            <ExpandIcon isExpanded={expandedSections.includes(key)} />
          </Stack>
        ) : (
          <Stack
            direction="row"
            sx={{ width: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <SvgIcon component={route.handle.icon} sx={{ fontSize: 28 }} />
          </Stack>
        )}
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
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const match = useMatch({
    path: `${route.path}/${item?.path ? `${item.path}/*` : ''}`,
  });

  const handleMenuClick = (path: string) => () => {
    navigate(`${route.path}/${path ?? ''}`);
    if (isSm) {
      onClose();
    }
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
        isSelected
          ? {
              color: 'primary.main',
              svg: { color: 'primary.main' },
              backgroundColor: 'primary.faded',
            }
          : {
              color: 'text.secondary',
              svg: { color: 'text.secondary' },
            },
        isWide ? { pl: 4, py: 1.5 } : { margin: 'auto', py: 1 },
      ]}
    >
      {isWide ? (
        <Typography>{intl.formatMessage(item.title)}</Typography>
      ) : (
        <SvgIcon component={item.icon} sx={{ fontSize: 20 }} />
      )}
    </MenuItem>
  );
};
