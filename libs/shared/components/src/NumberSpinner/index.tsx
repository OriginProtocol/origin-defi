import { Box, keyframes, Typography } from '@mui/material';

import type { BoxProps, TypographyProps } from '@mui/material';

const spin = keyframes`
  0% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(360deg);
  }
`;

export type NumberSpinnerProps = {
  duration?: number;
  typographyProps?: TypographyProps;
} & BoxProps;

export const NumberSpinner = ({
  duration = 1.7,
  typographyProps,
  ...rest
}: NumberSpinnerProps) => {
  return (
    <Box
      {...rest}
      sx={{
        perspective: 1000,
        width: '2ch',
        overflow: 'hidden',
        position: 'relative',
        maskImage: `linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)`,

        '.spinner-wheel': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 1,
          height: 1,
          position: 'absolute',
          transformStyle: 'preserve-3d',
          animation: `${spin} ${duration}s linear infinite`,
        },

        '.spinner-number': {
          position: 'absolute',
          color: 'inherit',
          backfaceVisibility: 'hidden',
        },

        '.spinner-number:nth-child(1)': {
          transform: `rotateX(36deg) translateZ(1.75em)`,
        },
        '.spinner-number:nth-child(2)': {
          transform: `rotateX(72deg) translateZ(1.75em)`,
        },
        '.spinner-number:nth-child(3)': {
          transform: `rotateX(108deg) translateZ(1.75em)`,
        },
        '.spinner-number:nth-child(4)': {
          transform: `rotateX(144deg) translateZ(1.75em)`,
        },
        '.spinner-number:nth-child(5)': {
          transform: `rotateX(180deg) translateZ(1.75em)`,
        },
        '.spinner-number:nth-child(6)': {
          transform: `rotateX(216deg) translateZ(1.75em)`,
        },
        '.spinner-number:nth-child(7)': {
          transform: `rotateX(252deg) translateZ(1.75em)`,
        },
        '.spinner-number:nth-child(8)': {
          transform: `rotateX(288deg) translateZ(1.75em)`,
        },
        '.spinner-number:nth-child(9)': {
          transform: `rotateX(324deg) translateZ(1.75em)`,
        },
        '.spinner-number:nth-child(10)': {
          transform: `rotateX(360deg) translateZ(1.75em)`,
        },
        ...rest?.sx,
      }}
    >
      <Box className="spinner-wheel">
        {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((i) => (
          <Typography key={i} {...typographyProps} className="spinner-number">
            {i}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};
