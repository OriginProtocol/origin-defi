import { Box } from '@mui/material';

import type { BoxProps } from '@mui/material';

export type ExpandIconProps = {
  isExpanded: boolean;
  direction?: 'vertical' | 'horizontal';
} & BoxProps<'img'>;

const iconPaths: Record<string, string> = {
  down: '/images/icons/chevron-down-regular.svg',
  left: '/images/icons/chevron-left-light.svg',
  right: '/images/icons/chevron-right-light.svg',
  up: '/images/icons/chevron-up-light.svg',
};

export const ExpandIcon = ({
  isExpanded,
  direction = 'vertical',
  ...rest
}: ExpandIconProps) => {
  return (
    <Box
      width={20}
      {...rest}
      component="img"
      alt={`expand-${isExpanded ? 'less' : 'more'}-icon`}
      src={
        iconPaths[
          isExpanded
            ? direction === 'vertical'
              ? 'up'
              : 'left'
            : direction === 'vertical'
            ? 'down'
            : 'right'
        ]
      }
    />
  );
};
