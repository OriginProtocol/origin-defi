import React, { useContext, useState } from 'react';

import OGVIcon from '../assets/ogv.svg';
import veOGVIcon from '../assets/ve-ogv.svg';
import { AnimatedModal } from '../components/AnimatedModal';
import { StateContext } from '../components/AppState';
import { MyLockupsTable } from '../components/MyLockups';
import { StyledSlider } from '../components/StyledSlider';
import {
  formatDurationInMonths,
  getDateAfterMonths,
  getTimestampAfterMonths,
  monthsToTimestamp,
} from '../utils/date';
import { estimateAPY, votingPowerMultiplier } from '../utils/stakeMath';

export const StakeModal = () => {
  const { state, setState } = useContext(StateContext);
  const [amount, setAmount] = useState('');
  const [monthsToStake, setMonthsToStake] = useState(48);
  const [mode, setMode] = useState('start');
  const [shouldClose, setShouldClose] = useState(false);

  const sign = mode === 'approve' || mode === 'approve-stake';

  function onStake() {
    setState({
      toast: 'Staked successfully',
      walletBalance: state.walletBalance - Number(amount),
      lockups: [
        ...state.lockups,
        {
          id: Date.now(),
          tokens: Number(amount),
          endsAt: getTimestampAfterMonths(monthsToStake),
          votingPower: votingPowerMultiplier(monthsToStake) * Number(amount),
        },
      ],
    });
    setShouldClose(true);
  }

  return (
    <AnimatedModal
      open={state.stakeModal}
      shouldClose={shouldClose}
      onClose={() => {
        setState({ stakeModal: false });
        setShouldClose(false);
        setMode('start');
      }}
    >
      {!sign ? null : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          onClick={() => {
            setMode(mode === 'approve' ? 'stake' : 'done-stake');
          }}
        >
          <div className="bg-blue-500 text-3xl text-off-white rounded-lg z-50 font-bold px-8 py-5 mx-24 leading-tight">
            Sign approval in wallet
          </div>
        </div>
      )}

      <div className="py-4 px-6 font-bold flex items-center justify-between border-b border-off-black leading-none">
        Stake
        <button
          className="btn-secondary px-6 py-3"
          onClick={() => setShouldClose(true)}
        >
          X
        </button>
      </div>
      <div
        className={`pt-6 pb-10 px-6 text-sm ${
          sign ? 'blur-sm pointer-events-none' : ''
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="font-medium">Amount to stake</div>
          <div className="text-gray-500 flex items-center gap-2">
            {`Balance: ${state.walletBalance.toLocaleString(undefined, {
              maximumFractionDigits: 2,
              minimumFractionDigits: 0,
            })}`}
            <button
              className="bg-[rgba(250,251,251,0.10)] rounded px-1 leading-1"
              onClick={() => setAmount(String(state.walletBalance))}
            >
              <span className="transform translate-y-[-2px]">max</span>
            </button>
          </div>
        </div>
        <div className="bg-[#141519] border border-[rgba(81,84,102,0.50)] rounded flex items-stretch mt-4 text-2xl font-medium mb-6">
          <input
            className="bg-transparent border-none py-4 pl-6 leading-none flex-1"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="w-32 border-l border-[rgba(81,84,102,0.50)] flex justify-center items-center text-xl gap-2">
            <img src={OGVIcon} alt="OGV" />
            OGV
          </div>
        </div>

        <StakeDuration {...{ monthsToStake, setMonthsToStake }} />

        <VotingPower
          amount={amount ? Number(amount) : 0}
          monthsToStake={monthsToStake}
        />

        {!Number(amount) ? (
          <button className="btn w-full py-4 text-base leading-none opacity-50">
            Enter an amount
          </button>
        ) : Number(amount) > state.walletBalance ? (
          <button className="btn w-full py-4 text-base leading-none opacity-50">
            Insufficient balance
          </button>
        ) : (
          <button
            className="btn w-full py-4 text-base leading-none"
            onClick={() => {
              if (mode === 'stake') {
                onStake();
              } else {
                setMode(mode === 'start' ? 'approve' : 'approve-stake');
              }
            }}
          >
            {mode === 'start' ? 'Approve OGV' : 'Stake'}
          </button>
        )}
      </div>
    </AnimatedModal>
  );
};

export const ExtendStakeModal = () => {
  const { state, setState } = useContext(StateContext);
  const [monthsToStake, setMonthsToStake] = useState(48);
  const [mode, setMode] = useState('start');
  const [shouldClose, setShouldClose] = useState(false);

  const sign = mode === 'approve-stake';

  function onStake() {
    setState({
      toast: 'Extended Stake successfully',
      lockups: state.lockups.map((l) => {
        if (l.id === state.extendStakeModal) {
          l.endsAt = getTimestampAfterMonths(monthsToStake);
          l.votingPower = votingPowerMultiplier(monthsToStake) * l.tokens;
        }
        return l;
      }),
    });
    setShouldClose(true);
  }

  const lockup = state.lockups.find((l) => l.id === state.extendStakeModal);

  return (
    <AnimatedModal
      open={typeof state.extendStakeModal === 'number'}
      shouldClose={shouldClose}
      onClose={() => {
        setState({ extendStakeModal: null });
        setShouldClose(false);
        setMode('start');
      }}
    >
      {!sign ? null : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          onClick={() => {
            onStake();
          }}
        >
          <div className="bg-blue-500 text-3xl text-off-white rounded-lg z-50 font-bold px-8 py-5 mx-24 leading-tight">
            Sign approval in wallet
          </div>
        </div>
      )}

      <div className="py-4 px-6 font-bold flex items-center justify-between border-b border-off-black leading-none">
        Extend Stake
        <button
          className="btn-secondary px-6 py-3"
          onClick={() => setShouldClose(true)}
        >
          X
        </button>
      </div>
      <div
        className={`pt-6 pb-10 px-6 text-sm ${
          sign ? 'blur-sm pointer-events-none' : ''
        }`}
      >
        <div className="bg-[rgba(81,84,102,0.20)] rounded leading-snug mb-6">
          <MyLockupsTable lockups={lockup ? [lockup] : []} disableActions />
        </div>

        <StakeDuration
          {...{ monthsToStake, setMonthsToStake }}
          min={monthsToTimestamp(lockup?.endsAt || Date.now())}
        />

        <VotingPower
          amount={lockup?.tokens || 0}
          monthsToStake={monthsToStake}
        />

        <button
          className="btn w-full py-4 text-base leading-none"
          onClick={() => {
            if (mode === 'stake') {
              onStake();
            } else {
              setMode('approve-stake');
            }
          }}
        >
          Extend Stake
        </button>
      </div>
    </AnimatedModal>
  );
};

interface StakeDurationProps {
  monthsToStake: number;
  setMonthsToStake: (months: number) => void;
  min?: number;
}

const StakeDuration = (props: StakeDurationProps) => {
  const { monthsToStake, setMonthsToStake } = props;
  return (
    <div className="bg-[rgba(81,84,102,0.20)] rounded px-6 py-3 leading-snug mb-2">
      <div className="border-b border-off-black mb-4">
        Stake duration
        <div className="px-2">
          <StyledSlider
            max={48}
            min={props.min || 0}
            step={1}
            marks={marks}
            value={monthsToStake}
            onChange={(e, val) => setMonthsToStake(val as number)}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <div>
            <span className="mr-2">Lock time:</span>
            <span className="font-bold">
              {formatDurationInMonths(monthsToStake)}
            </span>
          </div>
          <div className="mt-2">
            <span className="mr-2">Withdrawal date:</span>
            <span className="font-bold">
              {getDateAfterMonths(monthsToStake)}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div>Staking vAPY</div>
          <div className="bg-orange-gradient bg-clip-text text-transparent font-bold text-2xl flex">
            {`${estimateAPY(monthsToStake).toFixed(2)}%`}
          </div>
        </div>
      </div>
    </div>
  );
};

interface VotingPowerProps {
  monthsToStake: number;
  amount: number;
}

const VotingPower = (props: VotingPowerProps) => {
  const { monthsToStake, amount } = props;
  return (
    <div className="bg-[rgba(81,84,102,0.20)] rounded px-6 py-4 leading-snug mb-6 flex items-center justify-between">
      Voting power
      <div className="flex items-center gap-1">
        <img src={veOGVIcon} alt="veOGV" />
        <div className="text-gray-500 ml-2">
          {(votingPowerMultiplier(monthsToStake) * amount).toLocaleString(
            undefined,
            {
              maximumFractionDigits: 2,
              minimumFractionDigits: 0,
            },
          )}
        </div>
        <div>veOGV</div>
      </div>
    </div>
  );
};

const marks = [
  { value: 0, label: '0' },
  { value: 6, label: '6m' },
  { value: 12, label: '1y' },
  { value: 18, label: '1.5y' },
  { value: 24, label: '2y' },
  { value: 30, label: '2.5y' },
  { value: 36, label: '3y' },
  { value: 42, label: '3.5y' },
  { value: 48, label: '4y' },
];
