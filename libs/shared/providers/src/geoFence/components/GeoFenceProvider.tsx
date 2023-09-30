import { useState } from 'react';

import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useLocalStorageValue } from '@react-hookz/web';
import { useIntl } from 'react-intl';

import type { ReactNode } from 'react';

export type GeoFenceProviderProps = { children: ReactNode };

export const GeoFenceProvider = ({ children }: GeoFenceProviderProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [checked, setChecked] = useState(false);
  const { value: geoCheck, set: setGeoCheck } = useLocalStorageValue(
    '@originprotocol/oeth-geo-check',
    {
      defaultValue: false,
    },
  );

  return (
    <>
      {children}
      <Dialog open={!geoCheck} maxWidth="sm" fullScreen={fullScreen}>
        <DialogTitle>
          {intl.formatMessage({ defaultMessage: 'Restricted Access' })}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            {intl.formatMessage({
              defaultMessage: `The Origin Ether dapp is not available to restricted jurisdictions. Before proceeding, please carefully read the following:`,
            })}
          </DialogContentText>
          <Stack
            component="ul"
            sx={{
              backgroundColor: 'grey.800',
              my: 3,
              pl: 5,
              pr: 3,
              py: 3,
              borderRadius: 1,
            }}
            spacing={3}
          >
            <Typography component="li" variant="body2">
              {intl.formatMessage({
                defaultMessage: `You confirm that you are not a resident of, citizen of, located in, incorporated in, or have a registered office in the United States or any country or region currently currently subject to sanctions by the United States.`,
              })}
            </Typography>
            <Typography component="li" variant="body2">
              {intl.formatMessage({
                defaultMessage: `You affirm that you are not a subject of economic or trade sanctions administered or enforced by any governmental authority or otherwise designated on any list of prohibited or restricted parties, including the list maintained by the Office of Foreign Assets Control of the U.S. Department of the Treasury.`,
              })}
            </Typography>
            <Typography component="li" variant="body2">
              {intl.formatMessage({
                defaultMessage: `You agree not to use any VPN or other privacy or anonymization tools or techniques to attempt to circumvent these eligibility restrictions.`,
              })}
            </Typography>
            <Typography component="li" variant="body2">
              {intl.formatMessage({
                defaultMessage: `You are lawfully permitted to access this site. You understand and accept the risks associated with using Origin Ether.`,
              })}
            </Typography>
          </Stack>
          <FormControlLabel
            label={intl.formatMessage({
              defaultMessage: 'I have read and agree to the above terms',
            })}
            onChange={(_, val) => {
              setChecked(val);
            }}
            control={<Checkbox checked={checked} />}
            sx={{ pl: 0.2 }}
          />
        </DialogContent>
        <DialogActions sx={{ gap: 3, px: 3, pt: { xs: 2, sm: 0 }, pb: 3 }}>
          <Button
            href="https://oeth.com"
            variant="action"
            fullWidth
            sx={{
              fontSize: 16,
              borderRadius: 8,
              padding: 1,
            }}
          >
            {intl.formatMessage({ defaultMessage: 'Exit' })}
          </Button>
          <Button
            disabled={!checked}
            variant="action"
            fullWidth
            onClick={() => {
              setGeoCheck(true);
            }}
            sx={{
              fontSize: 16,
              borderRadius: 8,
              padding: 1,
            }}
          >
            {intl.formatMessage({ defaultMessage: 'I agree' })}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
