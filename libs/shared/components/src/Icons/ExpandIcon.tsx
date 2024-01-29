import {
  FaChevronDownRegular,
  FaChevronLeftRegular,
  FaChevronRightRegular,
  FaChevronUpRegular,
} from '@origin/shared/icons';

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
  return isExpanded ? (
    direction === 'vertical' ? (
      <FaChevronUpRegular {...rest} />
    ) : (
      <FaChevronLeftRegular {...rest} />
    )
  ) : direction === 'vertical' ? (
    <FaChevronDownRegular {...rest} />
  ) : (
    <FaChevronRightRegular {...rest} />
  );
};
