import { useMemo } from 'react';

import { Box, Stack, useTheme } from '@mui/material';
import { motion } from 'motion/react';

import InputCircleGrid from '../assets/input-circle-grid.svg?react';
import InputEthGrid from '../assets/input-eth-grid.svg?react';
import LeftLogo from '../assets/left-logo.svg?react';
import OutputCircleSolid from '../assets/output-circle-solid.svg?react';
import Axis from '../assets/right-axis.svg?react';
import RightLogo from '../assets/right-wire-logo.svg?react';

const NUM_INPUT_ELEMENTS = 4;
const NUM_OUTPUT_ELEMENTS = 3;

// Generate angles for input and output elements
const generateElements = (count: number) =>
  Array.from({ length: count }).map((_, i) => ({
    id: `element-${i}`,
    angle: (i * 360) / count,
  }));

export const AnimatedHero = () => {
  const theme = useTheme();

  const inputElements = useMemo(() => generateElements(NUM_INPUT_ELEMENTS), []);
  const outputElements = useMemo(
    () => generateElements(NUM_OUTPUT_ELEMENTS),
    [],
  );

  return (
    <Stack
      sx={{
        position: 'relative',
        width: 1,
        height: '800px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Input Elements Animation */}
      {inputElements.map((element) => (
        <motion.div
          key={element.id}
          initial={{
            x: -200,
            y: Math.sin(element.angle * (Math.PI / 180)) * 200,
            scale: 2,
            opacity: 0,
          }}
          animate={{
            x: 400,
            opacity: [0, 1, 1, 0],
            scale: [2, 1.5, 1, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.2, 0.8, 1],
          }}
          style={{
            position: 'absolute',
            width: '60px',
            height: '60px',
          }}
        >
          {Math.random() > 0.5 ? (
            <InputEthGrid width="100%" height="100%" />
          ) : (
            <InputCircleGrid width="100%" height="100%" />
          )}
        </motion.div>
      ))}

      <Box
        sx={{
          position: 'relative',
          width: 480,
          height: 480,
          overflow: 'visible',
        }}
      >
        <LeftLogo
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: 240,
            height: 240,
            transform: 'translatex(25%)',
          }}
        />
        <RightLogo
          style={{
            position: 'absolute',
            top: '50%',
            right: 0,
            width: 240,
            height: 240,
            transform: 'translatex(-25%)',
          }}
        />
        <Axis
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 960,
            height: 960,
            transform: 'translate(45px, 6%)',
          }}
        />
      </Box>

      {/* Output Elements Animation */}
      {outputElements.map((element) => (
        <motion.div
          key={element.id}
          initial={{
            x: 400,
            y: Math.sin(element.angle * (Math.PI / 180)) * 200,
            scale: 0.5,
            opacity: 0,
          }}
          animate={{
            x: 1000,
            scale: 1,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear',
            delay: (element.angle / 360) * 2,
          }}
          style={{
            position: 'absolute',
            width: '40px',
            height: '40px',
          }}
        >
          <OutputCircleSolid width="100%" height="100%" />
        </motion.div>
      ))}
    </Stack>
  );
};
