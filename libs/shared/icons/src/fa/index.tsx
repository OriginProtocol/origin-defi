// import { forwardRef, useEffect, useState } from 'react';

// import { Box, SvgIcon } from '@mui/material';

// import type { SvgIconProps } from '@mui/material';

// type FaName =
//   | 'arrow-down-from-arc'
//   | 'arrow-down-long'
//   | 'arrow-down-to-bracket'
//   | 'arrow-down'
//   | 'arrow-left'
//   | 'arrow-right-arrow-left'
//   | 'arrow-right'
//   | 'arrow-up-arrow-down'
//   | 'arrow-up-right-from-square'
//   | 'arrow-up-right'
//   | 'arrow-up'
//   | 'arrows-rotate'
//   | 'bars-filter'
//   | 'bars'
//   | 'book'
//   | 'chart-pie'
//   | 'check'
//   | 'chevron-down'
//   | 'chevron-left'
//   | 'chevron-right'
//   | 'chevron-up'
//   | 'circle-arrow-down'
//   | 'circle-arrow-left'
//   | 'circle-arrow-right'
//   | 'circle-arrow-up'
//   | 'circle-check'
//   | 'circle-dollar'
//   | 'circle-exclamation'
//   | 'circle-info'
//   | 'circle-question'
//   | 'circle-xmark'
//   | 'clock'
//   | 'coins'
//   | 'comments'
//   | 'ellipsis-vertical'
//   | 'file-lines'
//   | 'gavel'
//   | 'gear-complex'
//   | 'grid-2'
//   | 'link'
//   | 'magnifying-glass-dollar'
//   | 'magnifying-glass'
//   | 'minus'
//   | 'percent'
//   | 'rotate-left'
//   | 'square-list'
//   | 'user'
//   | 'xmark';

// export type FaIconProps = { name: FaName; light?: boolean } & SvgIconProps;

// export const FaIcon = forwardRef<SVGSVGElement, FaIconProps>(
//   ({ name, light, ...rest }, ref) => {
//     const [icon, setIcon] = useState(null);

//     useEffect(() => {
//       (async () => {
//         let modules: { [s: string]: unknown } | ArrayLike<unknown>;
//         if (light) {
//           modules = import.meta.glob('./light/*.svg', {
//             import: 'default',
//             as: 'raw',
//             eager: true,
//           });
//         } else {
//           modules = import.meta.glob('./regular/*.svg', {
//             import: 'default',
//             as: 'raw',
//             eager: true,
//           });
//         }
//         setIcon(
//           await Object.entries(modules).find(
//             ([path]) => path === `./${light ? 'light' : 'regular'}/${name}.svg`,
//           )[1],
//         );
//       })();
//     }, [name, light]);

//     return (
//       <SvgIcon ref={ref} fontSize="inherit" {...rest} inheritViewBox>
//         <Box component="svg" dangerouslySetInnerHTML={{ __html: icon }} />
//       </SvgIcon>
//     );
//   },
// );
// FaIcon.displayName = 'FaIcon';

export * from './duotone';
export * from './regular';
export * from './light';
