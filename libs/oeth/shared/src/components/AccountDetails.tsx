import {
  alpha,
  Box,
  Button,
  Divider,
  Popover,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { Icon, LinkIcon, MiddleTruncated } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { quantityFormat } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useAccount, useBalance, useDisconnect } from 'wagmi';

const values = ['eth', 'weth', 'reth', 'frxeth', 'sfrxeth', 'steth'];

const padding = { paddingInline: 2, paddingBlock: 3 };

interface Props {
  anchor: HTMLElement | null;
  setAnchor: (value: HTMLButtonElement | null) => void;
}

export function AccountDetails({ anchor, setAnchor }: Props) {
  const intl = useIntl();
  const { address, isConnected, connector } = useAccount();
  const { disconnect } = useDisconnect();

  const theme = useTheme();
  const { data: eth } = useBalance({
    address,
    token: tokens.mainnet.ETH.address,
    enabled: isConnected,
  });
  const { data: weth } = useBalance({
    address,
    token: tokens.mainnet.WETH.address,
    enabled: isConnected,
  });
  const { data: reth } = useBalance({
    address,
    token: tokens.mainnet.rETH.address,
  });
  const { data: frxeth } = useBalance({
    address,
    token: tokens.mainnet.frxETH.address,
  });
  const { data: sfrxeth } = useBalance({
    address,
    token: tokens.mainnet.sfrxETH.address,
  });
  const { data: steth } = useBalance({
    address,
    token: tokens.mainnet.stETH.address,
  });

  function close() {
    setAnchor(null);
  }
  if (!isConnected) return null;
  const balance = {
    eth: eth?.formatted || '0',
    weth: weth?.formatted || '0',
    reth: reth?.formatted || '0',
    frxeth: frxeth?.formatted || '0',
    sfrxeth: sfrxeth?.formatted || '0',
    steth: steth?.formatted || '0',
  };
  return (
    <Popover
      open={!!anchor}
      anchorEl={anchor}
      onClose={close}
      anchorOrigin={{
        vertical: 50,
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      sx={{
        '& .MuiPopover-paper': {
          width: (theme) => ({
            xs: '90vw',
            md: `min(${theme.typography.pxToRem(250)}, 90vw)`,
          }),
          [theme.breakpoints.down('md')]: {
            left: '0 !important',
            right: 0,
            marginInline: 'auto',
          },
        },
      }}
    >
      <Box>
        <Stack
          component={Typography}
          color="primary.contrastText"
          justifyContent="space-between"
          alignItems="center"
          direction="row"
          sx={padding}
        >
          Account
          <Button
            variant="contained"
            sx={{
              borderRadius: 7,
              paddingInline: 2.375,
              paddingBlock: 1.25,
              fontSize: '0.75rem',
              lineHeight: '0.75rem',
              '&:hover': {
                background: (theme) => alpha(theme.palette.common.white, 0.05),
              },
            }}
            color="secondary"
            disableElevation
            onClick={() => {
              disconnect();
              close();
            }}
          >
            Disconnect
          </Button>
        </Stack>
        <Divider />
        <Stack
          alignItems="center"
          gap={1.5}
          sx={padding}
          direction="row"
          color="primary.contrastText"
        >
          <Icon src={`/images/${connector.id.toLowerCase()}-icon.svg`} />

          <MiddleTruncated>{address}</MiddleTruncated>
          <LinkIcon
            url={`https://etherscan.io/address/${address}`}
            sx={{ transform: 'translateY(5%)' }}
          />
        </Stack>
        <Divider />
        <Stack sx={padding} gap={2}>
          {values.map((value) => (
            <Stack
              key={value}
              component={Typography}
              direction="row"
              alignItems="center"
              color="primary.contrastText"
              gap={1}
            >
              <Icon src={`/images/currency/${value}-icon-small.svg`} />
              {intl.formatNumber(+balance[value], quantityFormat)}
              &nbsp;
              {value}
            </Stack>
          ))}
        </Stack>
      </Box>
    </Popover>
  );
}
