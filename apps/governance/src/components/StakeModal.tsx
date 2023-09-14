import React, { useContext } from 'react';

import { Modal } from '@mui/base/Modal';
import { Slider } from '@mui/base/Slider';
import { clsx } from 'clsx';

import OGVIcon from '../assets/ogv.svg';
import veOGVIcon from '../assets/ve-ogv.svg';
import { StateContext } from '../components/AppState';

import type { SliderProps } from '@mui/base/Slider';

export const StakeModal = () => {
  const { state, setState } = useContext(StateContext);
  return (
    <Modal
      open={state.stakeModal}
      onClose={() => setState({ stakeModal: false })}
      className="fixed inset-0 flex justify-center items-center"
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: { className: 'fixed inset-0 bg-off-black/80 z-0' },
      }}
    >
      <div className="bg-gray-900 z-50 w-full max-w-[550px] rounded-lg">
        <div className="py-4 px-6 font-bold flex items-center justify-between border-b border-off-black leading-none">
          Stake
          <button
            className="btn-secondary px-6 py-3"
            onClick={() => setState({ stakeModal: false })}
          >
            X
          </button>
        </div>
        <div className="pt-6 pb-10 px-6 text-sm">
          <div className="flex items-center justify-between">
            <div className="font-medium">Amount to stake</div>
            <div className="text-gray-500 flex items-center gap-2">
              Balance: 2,000,000.00
              <button className="bg-[rgba(250,251,251,0.10)] rounded px-1 leading-1">
                <span className="transform translate-y-[-2px]">max</span>
              </button>
            </div>
          </div>
          <div className="bg-[#141519] border border-[rgba(81,84,102,0.50)] rounded flex items-stretch mt-4 text-2xl font-medium mb-6">
            <input
              className="bg-transparent border-none py-4 pl-6 leading-none flex-1"
              placeholder="0.00"
            />
            <div className="w-32 border-l border-[rgba(81,84,102,0.50)] flex justify-center items-center text-xl gap-2">
              <img src={OGVIcon} alt="OGV" />
              OGV
            </div>
          </div>
          <div className="bg-[rgba(81,84,102,0.20)] rounded px-6 py-3 leading-snug mb-2">
            <div className="border-b border-off-black mb-4">
              Stake duration
              <div className="px-2">
                <CustomSlider max={8} min={0} step={1} marks={marks} />
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <div>
                  <span className="mr-2">Lock time:</span>
                  <span className="font-bold">4 years</span>
                </div>
                <div className="mt-2">
                  <span className="mr-2">Withdrawal date:</span>
                  <span className="font-bold">06 Jul 2027</span>
                </div>
              </div>
              <div>
                <div>Staking vAPY</div>
                <div className="bg-orange-gradient bg-clip-text text-transparent font-bold text-2xl">
                  52.89%
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[rgba(81,84,102,0.20)] rounded px-6 py-4 leading-snug mb-6 flex items-center justify-between">
            Voting power
            <div className="flex items-center gap-1">
              <img src={veOGVIcon} alt="veOGV" />
              <div className="text-gray-500 ml-2">0.00</div>
              <div>veOGV</div>
            </div>
          </div>
          <button className="btn w-full py-4 text-base leading-none">
            Enter an amount
          </button>
        </div>
      </div>
    </Modal>
  );
};

const marks = [
  { value: 0, label: '0' },
  { value: 1, label: '6m' },
  { value: 2, label: '1y' },
  { value: 3, label: '1.5y' },
  { value: 4, label: '2y' },
  { value: 5, label: '2.5y' },
  { value: 6, label: '3y' },
  { value: 7, label: '3.5y' },
  { value: 8, label: '4y' },
];

const Backdrop = React.forwardRef<
  HTMLDivElement,
  { className: string; onClick?: () => void }
>((props, ref) => {
  const { className, onClick } = props;
  return <div className={className} ref={ref} onClick={onClick} />;
});
Backdrop.displayName = 'Backdrop';

const resolveSlotProps = (fn: unknown, args: unknown) =>
  typeof fn === 'function' ? fn(args) : fn;

const CustomSlider = React.forwardRef<HTMLSpanElement, SliderProps>(
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

CustomSlider.displayName = 'CustomSlider';
