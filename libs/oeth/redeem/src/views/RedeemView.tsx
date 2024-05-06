import { Container, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const RedeemView = () => {
  // const intl = useIntl();
  // const navigate = useNavigate();
  // const location = useLocation();

  return (
    <Container
      sx={{
        mt: 3,
        mb: 10,
      }}
      maxWidth="sm"
    >
      <Stack spacing={3}>
        {/* <Tabs
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
      </Tabs> */}
        <Outlet />
      </Stack>
    </Container>
  );
};
