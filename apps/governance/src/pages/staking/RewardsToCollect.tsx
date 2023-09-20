import { useContext, useEffect, useState } from 'react';

import OGVIcon from '../../assets/ogv.svg';
import { StateContext } from '../../components/AppState';
import { NumberSpinner } from '../../components/NumberSpinner';

export const RewardsToCollect = () => {
  const { state, setState } = useContext(StateContext);

  const totalLocked = state.lockups.reduce((m, l) => {
    return m + l.tokens;
  }, 0);

  const [mode, setMode] = useState('collect');

  const disabled = state.rewardsToCollect === 0;
  const btnClass =
    disabled || mode !== 'collect' ? 'btn-outline-disabled' : 'btn-outline';

  useEffect(() => {
    const multiplier = 0.56 / (60 * 60 * 24 * 365);
    const i = setInterval(() => {
      const newTotal = state.rewardsToCollect + totalLocked * multiplier;
      setState({ rewardsToCollect: newTotal });
    }, 1000);
    return () => clearInterval(i);
  }, [totalLocked, state.rewardsToCollect]);

  function collect() {
    if (disabled) {
      return;
    }
    if (mode === 'collect') {
      setMode('confirm');
    } else if (mode === 'confirm') {
      setMode('pending');
    } else {
      setState({
        rewardsToCollect: 0,
        walletBalance: state.walletBalance + state.rewardsToCollect,
        toast: {
          title: 'OGV rewards collected',
          text: `${state.rewardsToCollect.toLocaleString()} OGV`,
          icon: 'OGV',
        },
      });

      setMode('collect');
    }
  }

  return (
    <div className="bg-gray-900 rounded-lg text-sm p-6">
      <div className="text-gray-500">Rewards Available to collect</div>
      <div className="flex justify-between items-center text-2xl mt-2 font-medium">
        <div>
          <NumberSpinner num={state.rewardsToCollect} />
        </div>
        <div className="flex items-center text-off-white gap-2 text-xl">
          <img src={OGVIcon} alt="OGV" />
          OGV
        </div>
      </div>
      <button
        className={`${btnClass} mt-6 px-4 py-2 w-full`}
        onClick={(e) => {
          e.stopPropagation();
          collect();
        }}
      >
        {mode === 'confirm'
          ? 'Confirm'
          : mode === 'pending'
          ? 'Pending'
          : 'Collect rewards'}
      </button>
    </div>
  );
};
