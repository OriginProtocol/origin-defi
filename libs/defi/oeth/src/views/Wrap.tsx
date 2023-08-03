import { Box, Button, Stack } from '@mui/material';
import { APY, PortfolioSwap, PortfolioWrap } from '../components';
import { Card, WidgetContainer } from '@origin/shared/components';
import { useIntl } from 'react-intl';
import { ConnectWallet } from '../components/shared';

export function WrapView() {
  const intl = useIntl();
  return (
    <>
      <WidgetContainer>
        <APY />
        <PortfolioWrap />
      </WidgetContainer>
      <Stack gap={3} mt={3}>
        <Card
          title={intl.formatMessage({
            defaultMessage:
              'Wrapped wOETH is a non-rebasing tokenized vault that appreciates in value instead of growing in number.',
          })}
          sxCardTitle={{
            borderBottom: 'none',
            color: 'primary.contrastText',
          }}
          sxCardContent={{ paddingBlockStart: 0 }}
        >
          <Button
            component="a"
            href="https://docs.oeth.com/core-concepts/wrapped-ousd"
            variant="contained"
            sx={{
              background: (theme) => theme.palette.background.gradient1,
              opacity: 0.9,
              display: 'flex',
              gap: 1.5,
              alignItems: 'center',
              maxWidth: '10rem',
              borderRadius: 10,
            }}
          >
            Learn more
            <img src="https://app.oeth.com/images/external-link-white.svg" />
          </Button>
          <PortfolioSwap />
        </Card>
        <ConnectWallet />
      </Stack>
    </>
  );
}
