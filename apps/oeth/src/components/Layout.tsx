import { Container } from '@mui/material';
import { TopNav } from '@origin/shared/components';
import { useIntl } from 'react-intl';
import { Outlet, useNavigate } from 'react-router-dom';

export function Layout() {
  const intl = useIntl();
  const navigate = useNavigate();
  return (
    <>
      <TopNav
        sx={{ marginBlockStart: 2 }}
        logo="https://app.oeth.com/images/origin-ether-logo.svg"
        tabs={[
          {
            name: intl.formatMessage({ defaultMessage: 'Swap' }),
            onClick: () => navigate('/'),
          },
          {
            name: intl.formatMessage({ defaultMessage: 'Wrap' }),
            onClick: () => navigate('/wrap'),
          },
          {
            name: intl.formatMessage({ defaultMessage: 'History' }),
            onClick: () => navigate('/history'),
          },
        ]}
      />
      <Container
        maxWidth="md"
        sx={{
          mt: {
            xs: 3,
            md: 5,
          },
        }}
      >
        <Outlet />
      </Container>
    </>
  );
}
