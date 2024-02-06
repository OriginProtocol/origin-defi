import { Stack, Tab, Tabs } from '@mui/material';
import { useIntl } from 'react-intl';
import { useLocation, useNavigate } from 'react-router-dom';

import { routes } from '../routes';

import type { StackProps } from '@mui/material';

export const LeftDrawer = (props: StackProps) => {
  const intl = useIntl();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Stack direction="column" {...props}>
      <Tabs
        orientation="vertical"
        value={location.pathname}
        onChange={(_, value) => {
          navigate(value);
        }}
        TabIndicatorProps={{
          sx: {
            left: 0,
            width: 3,
            transition: 'none',
          },
        }}
      >
        {routes[0].children.map((route) => (
          <Tab
            key={route?.path ?? '/'}
            value={route?.path ?? '/'}
            label={intl.formatMessage(route.handle.label)}
            sx={{
              py: 1,
              '.MuiTab-root': {
                justifyContent: 'flex-start',
              },
              ':hover': {
                backgroundColor: (theme) => theme.palette.action.hover,
              },
              '&.Mui-selected': {
                backgroundColor: (theme) => theme.palette.action.selected,
              },
            }}
          />
        ))}
      </Tabs>
    </Stack>
  );
};
