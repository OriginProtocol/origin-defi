import { Box, MenuItem, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { Mix } from '../../Mix';
import { currencyFormat, quantityFormat } from './SwapCard';

import type { Option } from './TokenListModal';

const gap = 1.5;
interface Props {
  option: Option;
  onSelection: (option: Pick<Option, 'name' | 'imgSrc'>) => void;
  selected: boolean;
}

export function TokenListItem({ option, onSelection, selected }: Props) {
  const intl = useIntl();
  return (
    <MenuItem
      sx={{
        display: 'flex',
        paddingInline: 2,
        paddingBlock: 1,
        justifyContent: 'space-between',
        gap,
        alignItems: 'center',
        background: (theme) => theme.palette.background.paper,
        borderRadius: 1,
        '&:hover': {
          background: (theme) => theme.palette.grey[700],
        },
        ...(selected ? { opacity: 0.5 } : {}),
      }}
      onClick={() => {
        onSelection({
          name:
            typeof option.abbreviation === 'string'
              ? option.abbreviation
              : option.name,
          imgSrc: option.imgSrc,
        });
      }}
    >
      <Stack direction="row" gap={gap} alignItems="center">
        {typeof option.imgSrc === 'string' ? (
          <Box
            component="img"
            src={option.imgSrc}
            sx={{ width: '2rem', height: '2rem' }}
          />
        ) : (
          <Mix imgSrc={option.imgSrc} />
        )}
        <Box>
          <Typography color="primary.contrastText">{option.name}</Typography>
          <Typography
            color="text.primary"
            variant="body2"
            sx={{
              '& > span:not(:last-child):after': {
                content: '", "',
              },
            }}
          >
            {typeof option.abbreviation === 'string'
              ? option.abbreviation
              : option.abbreviation.map((abbr) => (
                  <span key={abbr}>{abbr}</span>
                ))}
          </Typography>
        </Box>
      </Stack>

      <Box sx={{ textAlign: 'right' }}>
        <Typography color="primary.contrastText">
          {intl.formatNumber(option.quantity, quantityFormat)}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {intl.formatNumber(option.value, currencyFormat)}
        </Typography>
      </Box>
    </MenuItem>
  );
}
