import { Container } from '@mui/material';
import { PageTitle } from '@origin/defi/shared';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';
import { Outlet } from 'react-router-dom';

export const RedeemView = () => {
  const intl = useIntl();
  // const navigate = useNavigate();
  // const location = useLocation();

  return (
    <Container maxWidth="sm">
      <PageTitle
        title={intl.formatMessage({ defaultMessage: 'Redeem' })}
        subtitle={intl.formatMessage({
          defaultMessage: 'Request redemptions to ETH or a mix of LSTs',
        })}
        token={tokens.mainnet.OETH}
      />
      {/* <Tabs
        centered
        value={location.pathname}
        onChange={(_, value) => {
          navigate(value);
        }}
        sx={{ mb: 5 }}
      >
        {oethRedeemRoute?.children?.map((route) => {
          const path = route.index
            ? '/oeth/redeem'
            : `/oeth/redeem/${route.path}`;

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
    </Container>
  );
};
