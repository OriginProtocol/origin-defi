import {
  FormControl,
  Popover,
  Stack,
  InputLabel,
  Button,
  InputBase,
  Box,
  Typography,
} from '@mui/material';
import { useIntl } from 'react-intl';

const gridStyles = {
  display: 'grid',
  gridTemplateColumns: '1fr 0.5fr 1fr',
  gap: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
};

interface Props {
  anchorEl: HTMLButtonElement | null;
  setAnchorEl: (item: HTMLButtonElement | null) => void;
}

export function GasPopover({ anchorEl, setAnchorEl }: Props) {
  const intl = useIntl();
  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      sx={{
        '& .MuiPaper-root.MuiPopover-paper': {
          padding: 2,
          maxWidth: '20rem',
        },
      }}
    >
      <Stack gap={2}>
        <FormControl variant="standard">
          <InputLabel htmlFor="tolerance" shrink>
            {intl.formatMessage({ defaultMessage: 'Price tolerance' })}
          </InputLabel>
          <Box sx={gridStyles}>
            <InputBase id="tolerance" defaultValue={0.01} />
            <Typography>%</Typography>
            <Button color="primary" variant="contained">
              {intl.formatMessage({ defaultMessage: 'Auto' })}
            </Button>
          </Box>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="gas" shrink>
            {intl.formatMessage({ defaultMessage: 'Gas Price' })}
          </InputLabel>
          <Box sx={gridStyles}>
            <InputBase id="gas" defaultValue={42} />
            <Typography>
              {intl.formatMessage({ defaultMessage: 'GWEI' })}
            </Typography>
          </Box>
        </FormControl>
      </Stack>
    </Popover>
  );
}
