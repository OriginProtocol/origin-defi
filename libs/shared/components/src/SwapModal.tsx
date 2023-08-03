import {
  Box,
  Dialog,
  MenuItem,
  MenuList,
  Stack,
  Typography,
} from '@mui/material';
import { Fragment } from 'react';

interface TextProps {
  children: string;
}

const PrimaryText = ({ children }: TextProps) => (
  <Typography
    component="p"
    sx={{
      color: 'primary.contrastText',
      fontWeight: 500,
    }}
  >
    {children}
  </Typography>
);

const SecondaryText = ({ children }: TextProps) => (
  <Typography
    sx={{
      fontWeight: 400,
      fontSize: (theme) => theme.typography.pxToRem(12),
    }}
  >
    {children}
  </Typography>
);

export interface SwapOption {
  imgSrc: string;
  name: string;
  abbrevation: string;
  quantity: string;
  value: string;
}

interface Props {
  handleClose: () => void;
  isOpen: boolean;
  options: SwapOption[];
  onSelection: (option: Pick<SwapOption, 'abbrevation' | 'imgSrc'>) => void;
}

export function SwapModal({
  handleClose,
  isOpen,
  options,
  onSelection,
}: Props) {
  return (
    <Dialog onClose={handleClose} open={isOpen} maxWidth="xs" fullWidth>
      <MenuList>
        {options.map((option) => (
          <MenuItem
            key={option.name}
            sx={{
              display: 'grid',
              gridTemplateColumns: '2rem 4fr 1fr',
              gap: 2,
              alignItems: 'center',
              '&:hover': {
                opacity: 0.8,
              },
            }}
            onClick={() => {
              onSelection({
                abbrevation: option.abbrevation,
                imgSrc: option.imgSrc,
              });
              handleClose();
            }}
          >
            <Box
              component="img"
              src={option.imgSrc}
              sx={{ width: '100%', height: 'auto' }}
            />
            <Box>
              <PrimaryText>{option.name}</PrimaryText>
              <SecondaryText>{option.abbrevation}</SecondaryText>
            </Box>
            <Box>
              <PrimaryText>{option.quantity}</PrimaryText>
              <SecondaryText>{option.value}</SecondaryText>
            </Box>
          </MenuItem>
        ))}
      </MenuList>
    </Dialog>
  );
}
