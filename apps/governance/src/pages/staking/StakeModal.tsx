import { useContext, useEffect, useState } from 'react';

import { useSignMessage } from 'wagmi';

import OGVIcon from '../../assets/ogv.svg';
import veOGVIcon from '../../assets/ve-ogv.svg';
import { AnimatedModal, ModalHeader } from '../../components/AnimatedModal';
import { StateContext } from '../../components/AppState';
import { StyledSlider } from '../../components/StyledSlider';
import { Tooltip } from '../../components/Tooltip';
import {
  formatDurationInMonths,
  getDateAfterMonths,
  getTimestampAfterMonths,
  monthsToTimestamp,
} from '../../utils/date';
import { estimateAPY, votingPowerMultiplier } from '../../utils/stakeMath';
import { MyLockupsTable } from './MyLockups';

export const StakeModal = () => {
  const { state, setState } = useContext(StateContext);
  const [amount, setAmount] = useState('');
  const [monthsToStake, setMonthsToStake] = useState(48);
  const [mode, setMode] = useState('start');
  const [shouldClose, setShouldClose] = useState(false);

  const { signMessage: signApproval } = useSignMessage({
    message: 'Approve token',
    onSuccess: () => setMode('stake'),
    onError: () => setMode('start'),
  });

  const { signMessage: signStake } = useSignMessage({
    message: 'Stake tokens',
    onSuccess: () => onStake(),
    onError: () => setMode('stake'),
  });

  useEffect(() => {
    if (!amount || amount === '0') {
      setAmount(String(state.walletBalance));
    }
  }, [state.walletBalance, state.stakeModal]);

  const sign = mode === 'approve' || mode === 'approve-stake';

  function onStake() {
    setState({
      toast: {
        title: 'Staked',
        text: `${Number(amount).toLocaleString()} OGV`,
        icon: 'OGV',
      },
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
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-blue-500 text-3xl text-off-white rounded-lg z-50 font-bold px-8 py-5 mx-24 leading-tight">
            Sign approval in wallet
          </div>
        </div>
      )}

      <ModalHeader onClose={() => setShouldClose(true)}>Stake</ModalHeader>

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
        <div className="bg-[#141519] border border-[#B5BECA] rounded flex items-stretch mt-4 text-2xl font-medium mb-6">
          <input
            className="bg-transparent border-none py-4 pl-6 leading-none flex-1"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="w-32 border-l border-[rgba(81,84,102,0.50)] flex justify-center items-center text-xl gap-2 text-gray-500">
            <img
              src={OGVIcon}
              alt="OGV"
              className="rounded-full border border-off-white"
            />
            OGV
          </div>
        </div>

        <StakeDuration {...{ monthsToStake, setMonthsToStake }} />

        <AmountReceived
          {...{ monthsToStake, setMonthsToStake }}
          amount={amount ? Number(amount) : 0}
        />

        <RewardsAPY monthsToStake={monthsToStake} />

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
                setMode('approve-stake');
                signStake();
              } else if (mode === 'start') {
                setMode('approve');
                signApproval();
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
  const lockup = state.lockups.find((l) => l.id === state.extendStakeModal);

  function onStake() {
    setState({
      toast: {
        title: 'Stake extended',
        text: `${lockup?.tokens.toLocaleString(undefined)} OGV`,
        icon: 'OGV',
      },
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

      <ModalHeader onClose={() => setShouldClose(true)}>
        Extend Stake
      </ModalHeader>

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

        {!state.rewardsToCollect ? null : (
          <div className="bg-[rgba(81,84,102,0.20)] rounded px-6 py-4 leading-snug mb-6 flex flex-col gap-2">
            <div className="font-medium">OGV Rewards will be collected</div>
            <div className="text-xs text-gray-500">
              {`You have accrued ${state.rewardsToCollect.toFixed(
                2,
              )} OVG in staking rewards. This OGV will be transferred to your wallet immediately when you extend your stake.`}
            </div>
          </div>
        )}

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
    <>
      <div className="font-bold mb-3 flex items-center gap-1">
        Stake Duration
        <Tooltip title="Stake duration explanation" placement="right" />
      </div>
      <div className="bg-[rgba(81,84,102,0.20)] border border-[rgba(81,84,102,0.50)] rounded px-6 pt-4 pb-2 leading-snug mb-6">
        <div className="text-2xl font-medium">
          {formatDurationInMonths(monthsToStake)}
        </div>
        <div className="mt-2 mb-2 text-xs">
          <span className="mr-2">Withdrawal date:</span>
          <span className="font-bold">{getDateAfterMonths(monthsToStake)}</span>
        </div>
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
    </>
  );
};

interface AmountReceivedProps {
  monthsToStake: number;
  amount: number;
}

const AmountReceived = (props: AmountReceivedProps) => {
  const { monthsToStake, amount } = props;
  return (
    <>
      <div className="font-bold mb-3 flex items-center gap-1">
        Amount received today
        <Tooltip title="Stake duration explanation" placement="right" />
      </div>
      <div className="bg-[rgba(81,84,102,0.20)] border border-[rgba(81,84,102,0.50)] rounded leading-snug mb-6 flex justify-stretch">
        <div className="px-6 pt-3 pb-2 flex-1">
          <div className="text-2xl font-medium">
            {(votingPowerMultiplier(monthsToStake) * amount).toLocaleString(
              undefined,
              {
                maximumFractionDigits: 2,
                minimumFractionDigits: 0,
              },
            )}
          </div>
          <div className="mt-2 mb-2 text-xs">
            <span className="mr-2">Voting power:</span>
            <span className="font-bold">1.764%</span>
          </div>
        </div>
        <div className="border-l border-[rgba(81,84,102,0.50)] flex items-center justify-center px-6 text-gray-500 font-medium gap-2 text-xl">
          <img src={veOGVIcon} alt="veOGV" /> veOGV
        </div>
      </div>
    </>
  );
};

interface RewardsAPYProps {
  monthsToStake: number;
}

const RewardsAPY = (props: RewardsAPYProps) => {
  const { monthsToStake } = props;
  return (
    <>
      <div className="font-bold mb-3 flex items-center gap-1">
        Rewards vAPY
        <Tooltip title="Rewards vAPY explanation" placement="right" />
      </div>
      <div className="bg-[rgba(81,84,102,0.20)] border border-[rgba(81,84,102,0.50)] rounded leading-snug mb-6 px-6 pt-3 pb-2 flex justify-start">
        <div className="bg-orange-gradient bg-clip-text text-transparent font-bold text-2xl">
          {`${estimateAPY(monthsToStake).toFixed(2)}%`}
        </div>
      </div>
    </>
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
