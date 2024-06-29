import { Card, Stack, Typography } from '@mui/material';
import { InfoTooltip } from '@origin/shared/components';
import { AirdropStar, Seeds, YieldNestHexagon } from '@origin/shared/icons';
import { useIntl } from 'react-intl';

import type { CardProps, StackProps } from '@mui/material';
import type { ReactNode } from 'react';

type Ad = {
  icon: ReactNode;
  title?: string;
  subtitle?: string;
  tooltip?: ReactNode;
  background?: string;
};

export const AdCards = (props: StackProps) => {
  const intl = useIntl();

  const ads: Ad[] = [
    {
      icon: <AirdropStar sx={{ width: 60, height: 60 }} />,
      title: intl.formatMessage({
        defaultMessage: 'Participate in the YieldNest Airdrop',
      }),
      subtitle: intl.formatMessage({
        defaultMessage:
          'Mint primeETH with OETH and get whitelisted for the upcoming YieldNest Airdrop.',
      }),
      background: `
        linear-gradient(-45deg, transparent 0, transparent 25px, #281928 25px, #281928 50px, transparent 50px, transparent 100%),
        linear-gradient(-45deg, transparent 0, transparent 220px, #281928 220px, #281928 260px, transparent 260px, transparent 100%),
        linear-gradient(-45deg, transparent 0, transparent 265px, #281928 265px, #281928 290px, transparent 290px, transparent 100%),
        linear-gradient(-45deg, #101 0, #101 100%)
      `,
    },
    {
      icon: <Seeds sx={{ width: 40, height: 40 }} />,
      title: intl.formatMessage({
        defaultMessage: '5% bonus on YieldNest Seeds',
      }),
      subtitle: intl.formatMessage({
        defaultMessage:
          'primeETH holders who migrate to ynLSD will receive a 5% boost for the YND Season 1 airdrop',
      }),
      background: `
        linear-gradient(-45deg, transparent 0, transparent 10px, #281928 10px, #281928 30px, transparent 30px, transparent 100%),
        linear-gradient(-45deg, transparent 0, transparent 235px, #281928 235px, #281928 270px, transparent 270px, transparent 100%),
        linear-gradient(-45deg, transparent 0, transparent 275px, #281928 275px, #281928 290px, transparent 290px, transparent 100%),
        linear-gradient(-45deg, #101 0, #101 100%)
      `,
    },
    {
      icon: <YieldNestHexagon sx={{ width: 40, height: 40 }} />,
      title: intl.formatMessage({
        defaultMessage: 'YieldNest Pioneer NFT',
      }),
      subtitle: intl.formatMessage({
        defaultMessage:
          'Migrate at least 5 primeETH to ynLSD to get the Pioneer NFT which earns a permanent 15% boost for all YND airdrop seasons',
      }),
      background: `
        linear-gradient(-45deg, transparent 0, transparent 15px, #281928 15px, #281928 30px, transparent 30px, transparent 100%),
        linear-gradient(-45deg, transparent 0, transparent 35px, #281928 35px, #281928 60px, transparent 60px, transparent 100%),
        linear-gradient(-45deg, transparent 0, transparent 240px, #281928 240px, #281928 270px, transparent 270px, transparent 100%),
        linear-gradient(-45deg, #101 0, #101 100%)
      `,
    },

    // {
    //   icon: <FaClockRegular color="primary" sx={{ width: 40, height: 40 }} />,
    //   title: intl.formatMessage({ defaultMessage: 'Be early!' }),
    //   subtitle: intl.formatMessage({
    //     defaultMessage:
    //       'Early depositers will earn an XP multiplier on their deposit',
    //   }),
    //   tooltip: (
    //     <Stack spacing={1} py={1}>
    //       <Typography textAlign="center">
    //         {intl.formatMessage({ defaultMessage: 'Bonus multiplier' })}
    //       </Typography>
    //       <Box component="img" src="/images/beEarly.webp" sx={{ width: 1 }} />
    //       <Typography textAlign="center">
    //         {intl.formatMessage({ defaultMessage: 'Deposit day' })}
    //       </Typography>
    //     </Stack>
    //   ),
    // },
    // {
    //   icon: <Whale color="primary" sx={{ width: 40, height: 40 }} />,
    //   title: intl.formatMessage({ defaultMessage: 'Go BIG!' }),
    //   subtitle: intl.formatMessage({
    //     defaultMessage:
    //       'Earn an XP multiplier for larger deposits for the duration of the campaign',
    //   }),
    //   tooltip: (
    //     <Stack spacing={1} py={1}>
    //       <Typography textAlign="center">
    //         {intl.formatMessage({ defaultMessage: 'Bonus multiplier' })}
    //       </Typography>
    //       <Box component="img" src="/images/goBig.webp" sx={{ width: 1 }} />
    //       <Typography textAlign="center">
    //         {intl.formatMessage({ defaultMessage: 'ETH amount' })}
    //       </Typography>
    //     </Stack>
    //   ),
    // },
    // {
    //   icon: <OETH sx={{ width: 40, height: 40 }} />,
    //   title: intl.formatMessage({
    //     defaultMessage:
    //       'Deposit with OETH and earn<br></br><strong>2X REWARDS*</strong>',
    //   }),
    //   subtitle: '',
    //   tooltip: (
    //     <Typography>
    //       {intl.formatMessage({
    //         defaultMessage:
    //           '*2x bonus applies only to primeETH minted with OETH and held in the same wallet',
    //       })}
    //     </Typography>
    //   ),
    // },
    // {
    //   icon: <PrimePoints sx={{ width: 40, height: 40 }} />,
    //   title: intl.formatMessage({
    //     defaultMessage: '1.5X XP Bonus',
    //   }),
    //   subtitle: intl.formatMessage({ defaultMessage: 'for a limited time' }),
    //   tooltip: (
    //     <Typography variant="body2">
    //       {intl.formatMessage({
    //         defaultMessage:
    //           'The 1.5x XP boost applies to all primeETH minted or bought on Uniswap since Feb 9 at 12pm PST. The 1.5x bonus runs until March 25th at 12pm PDT.',
    //       })}
    //     </Typography>
    //   ),
    // },
    // {
    //   icon: <EigenPoints sx={{ width: 40, height: 40 }} />,
    //   title: intl.formatMessage({
    //     defaultMessage: 'EigenLayer Points Bonus',
    //   }),
    //   subtitle: intl.formatMessage({
    //     defaultMessage:
    //       'Up to 1,000,000 EL points distributed to early ETH depositors',
    //   }),
    //   tooltip: (
    //     <Typography variant="body2">
    //       {intl.formatMessage(
    //         {
    //           defaultMessage:
    //             'Early ETH restakers will earn extra Eigenlayer points during Eigen Bonus Week. The sooner you buy or mint primeETH, the more Eigenlayer points you will earn. {link}',
    //         },
    //         {
    //           link: (
    //             <Link
    //               color="primary.main"
    //               href="https://twitter.com/PrimeStaked/status/1767265161876824362"
    //               target="_blank"
    //               rel="noopener noreferrer nofollow"
    //             >
    //               {intl.formatMessage({ defaultMessage: 'Learn More.' })}
    //             </Link>
    //           ),
    //         },
    //       )}
    //     </Typography>
    //   ),
    // },
  ];

  return (
    <Stack spacing={3} {...props}>
      {ads.map((a, i) => (
        <AdCard key={`ad-${i}`} ad={a} />
      ))}
    </Stack>
  );
};

type AdCardProps = { ad: Ad } & CardProps;

const AdCard = ({ ad, ...rest }: AdCardProps) => {
  return (
    <Card
      {...rest}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        p: 3,
        border: (theme) => `1px solid ${theme.palette.common.black}`,
        background: ad.background ?? '#101',
        borderRadius: 5,
        ...rest?.sx,
      }}
    >
      {ad.icon}
      {ad?.title && (
        <Typography variant="h6" textAlign="center" sx={{ color: '#FAFBFB' }}>
          {ad.title}
        </Typography>
      )}
      {ad?.subtitle && (
        <Typography textAlign="center" variant="body2" color="text.secondary">
          {ad.subtitle}
        </Typography>
      )}
      {ad?.tooltip && (
        <InfoTooltip
          tooltipLabel={ad.tooltip}
          tooltipProps={{
            placement: 'right',
            slotProps: { tooltip: { sx: { backgroundColor: '#fff' } } },
          }}
        />
      )}
    </Card>
  );
};
