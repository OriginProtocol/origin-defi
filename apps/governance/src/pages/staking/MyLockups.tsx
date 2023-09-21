import { useContext, useEffect, useState } from 'react';

import { useSignMessage } from 'wagmi';

import OGVIcon from '../../assets/ogv.svg';
import veOGVIcon from '../../assets/ve-ogv.svg';
import { StateContext } from '../../components/AppState';
import { CaretDown, ExternalLink, Spinner } from '../../components/Icons';
import {
  estimateTimeToFutureTimestamp,
  formatDateFromTimestamp,
} from '../../utils/date';

import type { Lockup } from '../../components/AppState';

interface MyLockupsProps {
  disableActions?: boolean;
  lockups: Lockup[];
}

export const MyLockups = (props: MyLockupsProps) => {
  return (
    <div className="bg-gray-900 rounded-lg text-sm">
      <div className="p-6 border-b border-off-black">My lockups</div>
      <MyLockupsTable {...props} />
      {props.lockups.length ? null : (
        <div className="p-6 text-center text-gray-500">No lockups to show</div>
      )}
    </div>
  );
};

export const MyLockupsTable = (props: MyLockupsProps) => {
  return (
    <div
      className={`grid grid-cols-[auto,auto,max-content] sm:grid-cols-[auto,auto,auto,max-content]${
        props.disableActions ? '' : ' border-b border-off-black'
      }`}
    >
      <div className="text-gray-500 pl-6 py-4">OGV</div>
      <div className="text-gray-500 py-4 text-center">Time remaining</div>
      <div className="text-gray-500 py-4 text-center hidden sm:block">
        Lockup ends
      </div>
      <div className="text-gray-500 px-6 py-4 text-center">Voting power</div>
      {props.lockups.map((lockup, idx) => (
        <LockupRow
          key={idx}
          idx={idx}
          lockup={lockup}
          disableActions={props.disableActions}
        />
      ))}
    </div>
  );
};

const LockupRow = (props: {
  lockup: Lockup;
  idx: number;
  disableActions?: boolean;
}) => {
  const { setState } = useContext(StateContext);
  const { lockup } = props;
  const [open, setOpen] = useState(false);
  const rowClassBase = `items-center border-t border-off-black py-4 transition duration-150 ease-in-out`;
  const rowClass = open
    ? `${rowClassBase} bg-white/3`
    : `${rowClassBase}${props.disableActions ? '' : ' group-hover:bg-white/3'}`;

  return (
    <div
      className={`contents${
        props.disableActions ? '' : ' cursor-pointer group'
      }`}
      onClick={() => setOpen(!open)}
    >
      <div className={`${rowClass} flex pl-6 gap-2`}>
        <img src={OGVIcon} alt="veOGV" />
        {lockup.tokens.toLocaleString()}
      </div>
      <div className={`${rowClass} flex justify-center`}>
        {estimateTimeToFutureTimestamp(lockup.endsAt)}
      </div>
      <div className={`${rowClass} justify-center hidden sm:flex`}>
        {formatDateFromTimestamp(lockup.endsAt)}
      </div>
      <div className={`${rowClass} flex gap-2 justify-center px-6`}>
        <img src={veOGVIcon} alt="veOGV" />
        {lockup.votingPower.toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })}
        {props.disableActions ? null : (
          <button className="text-blue-500">
            <CaretDown className={open ? 'rotate-180' : ''} />
          </button>
        )}
      </div>
      {!open || props.disableActions ? null : (
        <div className="col-span-3 sm:col-span-4 px-6 pb-4 flex justify-end items-start gap-2 bg-white/3">
          <div className="overflow-hidden flex gap-2 items-start">
            <button
              className="btn-outline text-xs px-4 py-2"
              onClick={(e) => {
                e.stopPropagation();
                setState({ extendStakeModal: lockup.id });
              }}
            >
              Extend
            </button>
            <UnstakeButton lockup={lockup} />

            <button className="text-blue-500 ml-6">
              <ExternalLink size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const UnstakeButton = ({ lockup }: { lockup: Lockup }) => {
  const { state, setState } = useContext(StateContext);
  const [mode, setMode] = useState('unstake');

  useEffect(() => {
    if (mode !== 'pending') return;
    const timeout = setTimeout(unstake, 5000);
    return () => clearTimeout(timeout);
  }, [mode]);

  const { signMessage } = useSignMessage({
    message: 'Confirm unstake',
    onSuccess: () => setMode('pending'),
    onError: () => setMode('unstake'),
  });

  const disabled = lockup.endsAt > Date.now();
  const btnClass =
    disabled || mode !== 'unstake' ? 'btn-outline-disabled' : 'btn-outline';

  function unstake() {
    if (disabled) {
      return;
    }
    if (mode === 'unstake') {
      setMode('confirm');
      signMessage();
    } else if (mode === 'confirm') {
      /* Ignore */
    } else {
      setState({
        walletBalance: state.walletBalance + lockup.tokens,
        lockups: state.lockups.filter((l) => l !== lockup),
        toast: {
          title: 'OGV unstaked',
          text: `${lockup.tokens.toLocaleString()} OGV`,
          icon: 'OGV',
        },
      });
    }
  }

  if (mode === 'pending' || mode === 'confirm') {
    return (
      <button
        className="btn-outline-disabled text-xs pl-3 pr-4 py-2 flex items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <Spinner size={14} />
        {mode === 'confirm' ? 'Confirm...' : 'Pending...'}
      </button>
    );
  }

  return (
    <button
      className={`${btnClass} text-xs px-4 py-2 flex items-center gap-2`}
      onClick={(e) => {
        e.stopPropagation();
        unstake();
      }}
    >
      {mode === 'confirm' ? 'Confirm' : 'Unstake'}
    </button>
  );
};
