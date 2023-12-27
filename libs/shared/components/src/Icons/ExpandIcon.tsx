import { SvgIcon } from '@mui/material';
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
} from 'react-icons/fa6';

import type { SvgIconProps } from '@mui/material';

export type ExpandIconProps = {
  isExpanded: boolean;
  direction?: 'vertical' | 'horizontal';
} & SvgIconProps;

export const ExpandIcon = ({
  isExpanded,
  direction = 'vertical',
  ...rest
}: ExpandIconProps) => {
  return (
    <SvgIcon {...rest}>
      {isExpanded ? (
        direction === 'vertical' ? (
          <FaChevronUp />
        ) : (
          <FaChevronLeft />
        )
      ) : direction === 'vertical' ? (
        <FaChevronDown />
      ) : (
        <FaChevronRight />
      )}
    </SvgIcon>
  );
};
