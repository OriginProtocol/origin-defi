import { useContext } from 'react';

import veOGVIcon from '../../assets/ve-ogv.svg';
import { StateContext } from '../../components/AppState';

export const VotingPower = () => {
  const { state } = useContext(StateContext);

  const totalVotingPower = state.lockups.reduce((m, l) => {
    return m + l.votingPower;
  }, 0);
  return (
    <div className="bg-gray-900 rounded-lg text-sm p-6">
      <div className="text-gray-500">My voting power</div>
      <div className="flex justify-between items-center text-2xl mt-2 font-medium">
        <div>
          {totalVotingPower.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
        </div>
        <div className="flex items-center text-off-white gap-2 text-xl">
          <img src={veOGVIcon} alt="veOGV" />
          veOGV
        </div>
      </div>
    </div>
  );
};
