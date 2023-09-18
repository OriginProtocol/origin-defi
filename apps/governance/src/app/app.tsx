import { useContext } from 'react';

import { Link } from 'react-router-dom';

import Logo from '../assets/logo.svg';
import OGVIcon from '../assets/ogv.svg';
import veOGVIcon from '../assets/ve-ogv.svg';
import { StateContext } from '../components/AppState';
import { ExternalLink, Profile, Sync } from '../components/Icons';
import { MyLockups } from '../components/MyLockups';
import { NumberSpinner } from '../components/NumberSpinner';
import { ExtendStakeModal, StakeModal } from '../components/StakeModal';
import { Toaster } from '../components/Toaster';

export function App() {
  const { state } = useContext(StateContext);
  return (
    <>
      <Toaster />
      <Nav />
      <div className="container mx-auto max-w-6xl">
        <Heading />
        <Actions />
        <Stats />
        <div className="flex gap-6 mb-32">
          <div className="flex-1 flex flex-col gap-6">
            <MyStake />
            <MyLockups lockups={state.lockups} />
          </div>
          <div className="flex flex-col gap-6 w-[375px]">
            <RewardsToCollect />
            <VotingPower />
          </div>
        </div>
      </div>
      <StakeModal />
      <ExtendStakeModal />
    </>
  );
}

const Nav = () => {
  const { state, setState } = useContext(StateContext);
  return (
    <div className="border-b border-b-gray-900 mb-16">
      <div className="px-6 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between gap-10 leading-relaxed">
            <img src={Logo} alt="logo" className="w-[175px] mr-2" />
            <Link to="/" className="text-gray-500 py-6 relative">
              Governance
            </Link>
            <Link to="/" className="py-6 relative">
              Staking
              <div className="absolute left-0 right-0 h-[2px] bg-blue-gradient -bottom-px rounded-full"></div>
            </Link>
          </div>
          <div className="flex items-center justify-between gap-4">
            <button className="btn-secondary px-6 py-3">View on IPFS</button>

            {state.connected ? (
              <button
                className="btn-secondary px-4 py-2 flex items-center gap-3 font-medium self-stretch"
                onClick={() => setState({ connected: false })}
              >
                <div className="rounded-full overflow-hidden">
                  <Profile />
                </div>
                <div>0x22b&hellip;bA44</div>
              </button>
            ) : (
              <button
                className="btn px-6 py-3"
                onClick={() => setState({ connected: true })}
              >
                Connect
              </button>
            )}
            <button className="btn-secondary px-2 py-2 text-blue-500">
              <Sync />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Heading = () => (
  <div className="font-bold text-4xl leading-snug mb-6">
    Origin DeFi Staking
  </div>
);

const Actions = () => (
  <div className="flex items-center gap-4">
    <button className="border-blue-600 border border-px rounded-full text-xs pl-4 pr-3 py-2 leading-tight flex items-center gap-1">
      OGV dashboard
      <ExternalLink />
    </button>
    <button className="border-blue-600 border border-px rounded-full text-xs pl-4 pr-3 py-2 leading-tight flex items-center gap-1">
      Get OGV
      <ExternalLink />
    </button>
  </div>
);

const Stats = () => (
  <div className="mt-16 mb-16 py-6 px-8 border border-gray-900 flex justify-between items-stretch max-w-3xl text-sm rounded-lg">
    <div className="flex flex-col items-start gap-3">
      <div className="text-gray-500">vAPY</div>
      <div className="bg-orange-gradient bg-clip-text text-transparent font-bold text-3xl">
        52.89%
      </div>
    </div>
    <div className="w-px bg-gray-900" />
    <div className="flex flex-col items-start gap-3">
      <div className="text-gray-500">Total OGV staked</div>
      <div className="font-bold text-3xl flex items-baseline gap-3">
        80.06%
        <div className="text-xs font-normal">(3.418b)</div>
      </div>
    </div>
    <div className="w-px bg-gray-900" />
    <div className="flex flex-col items-start gap-3 pr-8">
      <div className="text-gray-500">Voting addresses</div>
      <div className="font-bold text-3xl">
        <NumberSpinner num={1462} slow spinAtStart />
      </div>
    </div>
  </div>
);

const MyStake = () => {
  const { state, setState } = useContext(StateContext);

  const totalLocked = state.lockups.reduce((m, l) => {
    return m + l.tokens;
  }, 0);

  return (
    <div className="bg-gray-900 rounded-lg p-6 flex justify-between items-center">
      <div className="flex flex-col items-start gap-3">
        <div className="text-gray-500 text-sm">My stake</div>
        <div className="flex items-center gap-3">
          <img src={OGVIcon} alt="OGV" />
          {!state.lockups.length ? (
            <div className="mt-2 h-[2.5px] w-3 bg-gray-500" />
          ) : (
            <div className="text-2xl font-bold">
              {totalLocked.toLocaleString()}
            </div>
          )}
        </div>
      </div>
      <div className="mt-2 flex flex-col items-start gap-3">
        <div className="text-gray-500 text-sm">Wallet balance</div>
        <div className="flex items-center gap-3">
          <img src={OGVIcon} alt="OGV" />
          {state.connected && state.walletBalance ? (
            <div className="text-2xl font-bold">
              {state.walletBalance.toLocaleString()}
            </div>
          ) : (
            <>
              <div className="mt-2 h-[2.5px] w-3 bg-gray-500" />
              <button
                className="ml-4 border-blue-600 border border-px rounded-full text-xs pl-4 pr-3 py-2 leading-tight flex items-center gap-1"
                onClick={() => {
                  if (state.connected) {
                    setState({ walletBalance: 2000000 });
                  }
                }}
              >
                Get OGV
                <ExternalLink />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="py-1">
        {state.connected ? (
          <button
            className="btn px-20 py-4 leading-none"
            onClick={() => setState({ stakeModal: true })}
          >
            Stake
          </button>
        ) : (
          <button
            className="btn px-20 py-4 leading-none"
            onClick={() => setState({ connected: true })}
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

const RewardsToCollect = () => (
  <div className="bg-gray-900 rounded-lg text-sm text-gray-500 py-8 px-6">
    <div className="leading-loose">Rewards Available to collect</div>
    <div className="flex justify-between items-center text-2xl mt-2">
      <div>0.00</div>
      <div className="flex items-center text-off-white gap-2 text-xl">
        <img src={OGVIcon} alt="OGV" />
        OGV
      </div>
    </div>
    <button className="mt-6 border-blue-600/50 bg-blue-600/5 border border-px rounded-full text-sm px-4 py-2 w-full text-gray-500/30">
      Collect rewards
    </button>
  </div>
);

const VotingPower = () => {
  const { state } = useContext(StateContext);

  const totalVotingPower = state.lockups.reduce((m, l) => {
    return m + l.votingPower;
  }, 0);
  return (
    <div className="bg-gray-900 rounded-lg text-sm py-8 px-6">
      <div className="leading-loose text-gray-500">My voting power</div>
      <div className="flex justify-between items-center text-2xl mt-2">
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

export default App;
