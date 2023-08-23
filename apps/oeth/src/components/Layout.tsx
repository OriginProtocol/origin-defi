import { Container } from '@mui/material';
import { TopNav } from '@origin/shared/components';
import { useIntl } from 'react-intl';
import { Outlet } from 'react-router-dom';

export function Layout() {
  const intl = useIntl();

  return (
    <>
      <TopNav
        logo="https://app.oeth.com/images/origin-ether-logo.svg"
        tabs={[
          intl.formatMessage({ defaultMessage: 'Swap' }),
          intl.formatMessage({ defaultMessage: 'Wrap' }),
          intl.formatMessage({ defaultMessage: 'History' }),
        ]}
        selected={0}
        connected={false}
        ipfsLink={'https://oeth.on.fleek.co/'}
      />
      <Container
        sx={{
          mt: {
            xs: 3,
            md: 5,
            paddingInline: {
              xs: 2,
              md: 0,
            },
          },
        }}
        maxWidth="sm"
      >
        <Outlet />
      </Container>
    </>
  );
}
