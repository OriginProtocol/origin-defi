import { useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogContent,
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
  FaBarsRegular,
  FaBookRegular,
  FaXmarkRegular,
} from '@origin/shared/icons';
import { isNilOrEmpty } from '@origin/shared/utils';
import { remove } from 'ramda';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { routes } from '../../../routes';
import { additionalLinks } from '../constants';

import type { ButtonProps, DialogProps } from '@mui/material';
import type { MouseEvent } from 'react';

import type { NavItem } from '../types';

export const ModalMenuButton = (
  props: Omit<ButtonProps, 'onClick' | 'children'>,
) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        {...props}
        onClick={() => {
          setOpen(true);
        }}
      >
        <FaBarsRegular />
      </Button>
      <MenuDialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

const MenuDialog = (props: DialogProps) => {
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

  return (
    <Dialog {...props} fullWidth fullScreen>
      <Stack direction="row" justifyContent="flex-end" p={3}>
        <IconButton
          onClick={(evt) => {
            props?.onClose?.(evt, 'backdropClick');
          }}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <FaXmarkRegular sx={{ fontSize: 16 }} />
        </IconButton>
      </Stack>
      <DialogContent
        sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Stack
          direction="column"
          sx={{
            borderRadius: 2,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            px: 2,
          }}
        >
          {routes?.[0]?.children?.map((route, i) => {
            const key = route?.path ?? `index-${i}}`;

            const handleMenuClick = (path: string) => (evt: MouseEvent) => {
              props?.onClose?.(evt, 'backdropClick');
              navigate(`${route.path}/${path ?? ''}`);
            };

            if (isNilOrEmpty(route?.children)) {
              return (
                <Button
                  variant="text"
                  key={`index-${i}`}
                  onClick={() => {
                    navigate(`${route?.path ?? ''}/`);
                    props?.onClose?.({}, 'backdropClick');
                  }}
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    height: 64,
                    px: 0,
                    fontWeight: 'medium',
                  }}
                >
                  {intl.formatMessage(route.handle.title)}
                </Button>
              );
            }

            const items = [
              ...(route?.children?.map(
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
                  background: 'transparent',
                  border: 'none',
                }}
                disableGutters
              >
                <AccordionSummary sx={{ px: 0, height: 64 }}>
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
                <AccordionDetails sx={{ px: 0 }}>
                  <MenuList sx={{ p: 0 }}>
                    {items.map((r) => (
                      <MenuItem
                        key={`${r?.path ?? r?.href}-${i}`}
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
                          pl: 4,
                          pr: 0,
                          '.subtitle': { color: 'text.tertiary' },
                          '.arrow': {
                            color: 'text.tertiary',
                            fontSize: 18,
                          },
                          ':hover': {
                            backgroundColor: 'transparent',
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
                          <FaArrowUpRightRegular className="arrow" />
                        )}
                      </MenuItem>
                    ))}
                  </MenuList>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Stack>
        <Button
          href={OUSD_DOCS_URL}
          target="_blank"
          rel="noopener noreferrer nofollow"
          variant="text"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 2,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            p: 2,
            height: 64,
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
      </DialogContent>
    </Dialog>
  );
};
