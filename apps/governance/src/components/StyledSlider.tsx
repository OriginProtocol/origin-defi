import React from 'react';

import { Slider } from '@mui/base/Slider';
import { clsx } from 'clsx';

import type { SliderProps } from '@mui/base/Slider';

const resolveSlotProps = (fn: unknown, args: unknown) =>
  typeof fn === 'function' ? fn(args) : fn;

export const StyledSlider = React.forwardRef<HTMLSpanElement, SliderProps>(
  (props, ref) => {
    return (
      <Slider
        ref={ref}
        {...props}
        slotProps={{
          ...props.slotProps,
          root: (ownerState) => {
            const resolvedSlotProps = resolveSlotProps(
              props.slotProps?.root,
              ownerState,
            );
            return {
              className: clsx(
                `h-16 w-full py-4 inline-block relative touch-none ${
                  ownerState.disabled
                    ? 'opacity-50 cursor-default pointer-events-none text-slate-300 dark:text-slate-600'
                    : 'hover:opacity-100 cursor-pointer text-purple-500 dark:text-purple-400'
                }`,
                resolvedSlotProps?.className,
              ),
            };
          },
          rail: (ownerState) => {
            const resolvedSlotProps = resolveSlotProps(
              props.slotProps?.rail,
              ownerState,
            );
            return {
              ...resolvedSlotProps,
              className: clsx(
                'block absolute w-full h-2 rounded-full bg-[#515466]',
                resolvedSlotProps?.className,
              ),
            };
          },
          track: (ownerState) => {
            const resolvedSlotProps = resolveSlotProps(
              props.slotProps?.track,
              ownerState,
            );

            return {
              ...resolvedSlotProps,
              className: clsx(
                'block absolute h-2 rounded-full bg-blue-gradient',
                resolvedSlotProps?.className,
              ),
            };
          },
          thumb: (ownerState, { active, focused }) => {
            const resolvedSlotProps = resolveSlotProps(
              props.slotProps?.thumb,
              ownerState,
            );
            return {
              ...resolvedSlotProps,
              className: clsx(
                `absolute w-5 h-5 -ml-2.5 -mt-1.5 box-border rounded-full outline-0 border-3 border-solid border-current bg-blue-gradient hover:shadow-outline-purple ${
                  focused || active ? 'shadow-outline-purple' : ''
                }`,
                resolvedSlotProps?.className,
              ),
            };
          },
          markLabel: (ownerState) => {
            const resolvedSlotProps = resolveSlotProps(
              props.slotProps?.thumb,
              ownerState,
            );
            return {
              ...resolvedSlotProps,
              className: clsx(
                `top-10 absolute transform translate-x-[-50%] text-off-white text-xs leading-none`,
                resolvedSlotProps?.className,
              ),
            };
          },
        }}
      />
    );
  },
);

StyledSlider.displayName = 'CustomSlider';
