import { useContext } from 'react';

import { StateContext } from '../../components/AppState';
import { Heading } from '../../components/Heading';
import { Actions } from './Actions';
import { MyLockups } from './MyLockups';
import { MyStake } from './MyStake';
import { RewardsToCollect } from './RewardsToCollect';
import { Stats } from './Stats';
import { VotingPower } from './VotingPower';

export const Staking = () => {
  const { state } = useContext(StateContext);
  return (
    <>
      <Heading>Origin DeFi Staking</Heading>
      <Actions />
      <Stats />
      <div className="flex flex-col sm:flex-row gap-6 mb-32">
        <div className="flex-1 flex flex-col gap-6">
          <MyStake />
          <MyLockups lockups={state.lockups} />
        </div>
        <div className="flex flex-col gap-6 sm:w-[375px]">
          <RewardsToCollect />
          <VotingPower />
        </div>
      </div>
    </>
  );
};
