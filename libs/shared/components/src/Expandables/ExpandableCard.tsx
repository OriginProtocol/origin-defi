import { useState } from 'react';

import {
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FaExpandAltRegular } from '@origin/shared/icons';
import { FaXmarkRegular } from '@origin/shared/icons';
import { useMeasure } from '@react-hookz/web';

import type { CardProps } from '@mui/material';
import type { ReactNode } from 'react';

import type { Measurements } from './types';

export type ExpandableCardProps = {
  title?: ReactNode;
  height: number;
  children: (measurements: Measurements) => ReactNode;
} & Omit<CardProps, 'title'>;

export const ExpandableCard = ({
  children,
  height,
  title,
  ...rest
}: ExpandableCardProps) => {
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
      <Card {...rest} ref={initialRef}>
        <CardHeader
          title={title}
          action={
            <Button onClick={() => setOpen(true)}>
              <FaExpandAltRegular />
            </Button>
          }
        />
        <Divider />
        {children(initial)}
      </Card>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        {...(isSm
          ? {
              fullScreen: true,
              PaperProps: { sx: { borderRadius: 0 } },
            }
          : { fullWidth: true, maxWidth: 'xl' })}
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
        <Divider />
        <DialogContent sx={{ height: '80vh' }} ref={expandedRef}>
          {children(expanded)}
        </DialogContent>
      </Dialog>
    </>
  );
};
