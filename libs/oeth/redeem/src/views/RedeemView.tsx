import { Stack, Tab, Tabs } from '@mui/material';
import { useIntl } from 'react-intl';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { redeemRoute } from '../routes';

export const RedeemView = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Stack spacing={3}>
      <Tabs
        centered
        value={location.pathname}
        onChange={(_, value) => {
          navigate(value);
        }}
      >
        {redeemRoute?.children?.map((route) => {
          const path = route.index
            ? redeemRoute.path
            : `${redeemRoute.path}/${route.path}`;

          return (
            <Tab
              key={path}
              value={path}
              label={intl.formatMessage(route.handle.label)}
            />
          );
        })}
      </Tabs>
      <Outlet />
    </Stack>
  );
};
