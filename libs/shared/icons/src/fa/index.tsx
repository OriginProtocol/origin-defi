import { useEffect, useState } from 'react';

import { Box, SvgIcon } from '@mui/material';

import type { SvgIconProps } from '@mui/material';

type FaName =
  | 'arrow-down-from-arc'
  | 'arrow-down-long'
  | 'arrow-down-to-bracket'
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right-arrow-left'
  | 'arrow-right'
  | 'arrow-up-arrow-down'
  | 'arrow-up-right-from-square'
  | 'arrow-up-right'
  | 'arrow-up'
  | 'arrows-rotate'
  | 'bars-filter'
  | 'bars'
  | 'book'
  | 'chart-pie'
  | 'check'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'circle-arrow-down'
  | 'circle-arrow-left'
  | 'circle-arrow-right'
  | 'circle-arrow-up'
  | 'circle-check'
  | 'circle-dollar'
  | 'circle-exclamation'
  | 'circle-info'
  | 'circle-question'
  | 'circle-xmark'
  | 'clock'
  | 'coins'
  | 'comments'
  | 'ellipsis-vertical'
  | 'file-lines'
  | 'gavel'
  | 'gear-complex'
  | 'grid-2'
  | 'link'
  | 'magnifying-glass-dollar'
  | 'magnifying-glass'
  | 'minus'
  | 'percent'
  | 'rotate-left'
  | 'square-list'
  | 'user'
  | 'xmark;';

export type FaIconProps = { name: FaName; light?: boolean } & SvgIconProps;

export const FaIcon = ({ name, light, ...rest }: FaIconProps) => {
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    (async () => {
      const module = await import(
        `./${light ? 'light' : 'regular'}/${name}.svg?raw`
      );
      setIcon(module.default);
    })();
  }, [name, light]);

  return icon ? (
    <SvgIcon {...rest} inheritViewBox>
      <Box component="svg" dangerouslySetInnerHTML={{ __html: icon }} />
    </SvgIcon>
  ) : null;
};
