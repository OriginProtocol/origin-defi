import { Button, Stack } from '@mui/material';
import { ActionButton, Card } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import { APY, PortfolioSwap } from '../components';

export function WrapView() {
  const intl = useIntl();
  return (
    <>
      <APY
        value={6.71}
        balance={0}
        pendingYield={0}
        earnings={0}
        tokenIcon="	/images/currency/woeth-icon-small.svg"
      />

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
            <img src="/images/external-link-white.svg" />
          </Button>
        </Card>
        <PortfolioSwap />
        <ActionButton onClick={() => console.log('test')}>
          {intl.formatMessage({ defaultMessage: 'Connect' })}
        </ActionButton>
      </Stack>
    </>
  );
}
