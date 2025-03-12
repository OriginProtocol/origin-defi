import { useState } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FaExpandRegular, FaXmarkRegular } from '@origin/shared/icons';
import { useMeasure } from '@react-hookz/web';

import type { BoxProps } from '@mui/material';
import type { ReactNode } from 'react';

type Measurements = {
  width: number;
  height: number;
  isExpanded: boolean;
};

export type ExpandablePanelProps = {
  height: number;
  title?: string;
  children: (measurements: Measurements) => ReactNode;
} & Omit<BoxProps, 'children'>;

export const ExpandablePanel = ({
  height,
  title,
  children,
  ...rest
}: ExpandablePanelProps) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [initialMeasures, initialRef] = useMeasure<HTMLDivElement>();
  const [expandedMeasures, expandedRef] = useMeasure<HTMLDivElement>();

  const initial = {
    width: initialMeasures?.width ?? 0,
    height,
    isExpanded: false,
  };

  const expanded = {
    width: expandedMeasures?.width ?? 0,
    height: (expandedMeasures?.height ?? 0) - 10,
    isExpanded: true,
  };

  return (
    <>
      <Box
        {...rest}
        sx={[
          { position: 'relative', height },
          ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
        ]}
        ref={initialRef}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children(initial)}
        <Button
          color="secondary"
          onClick={() => setOpen(true)}
          sx={{
            position: 'absolute',
            top: 0,
            left: 20,
            display: visible ? 'flex' : 'none',
            p: 0.75,
            minWidth: 0,
            minHeight: 0,
            borderRadius: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FaExpandRegular sx={{ fontSize: 14 }} />
        </Button>
      </Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        {...(isSm ? { fullScreen: true } : { fullWidth: true, maxWidth: 'xl' })}
      >
        <DialogTitle
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>{title}</Typography>
          <IconButton onClick={() => setOpen(false)}>
            <FaXmarkRegular sx={{ fontSize: 14 }} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ height: '80vh' }} ref={expandedRef}>
          {children(expanded)}
        </DialogContent>
      </Dialog>
    </>
  );
};
