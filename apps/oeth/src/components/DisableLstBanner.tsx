import {
  Link,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';

export const DisableLstBanner = (props: StackProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack
      {...props}
      direction={{ xs: 'column', md: 'row' }}
      spacing={{ xs: 1, md: 3 }}
      sx={{
        backgroundColor: (theme) => theme.palette.secondary.main,
        color: 'text.primary',
        p: { xs: 1.5, md: 1 },
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        ...props?.sx,
      }}
    >
      <Typography textAlign="center" noWrap={!isSmall}>
        {intl.formatMessage(
          {
            defaultMessage:
              "We're working to simplify and strengthen OETH, using LSTs to mint is disabled. {link}",
          },
          {
            link: (
              <Link
                color="secondary.contrastText"
                href="https://vote.ousd.com/#/proposal/0x76f64251d37310c5d241ec84a892751c7a34874faff7af848db193141ea24a6f"
                target="_blank"
                rel="noopener noreferrer nofollow"
                underline="always"
              >
                {intl.formatMessage({ defaultMessage: 'Learn More.' })}
              </Link>
            ),
          },
        )}
      </Typography>
    </Stack>
  );
};
