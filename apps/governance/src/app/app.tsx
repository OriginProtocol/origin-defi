import { useContext, useEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';

import Logo from '../assets/logo.svg';
import OGVIcon from '../assets/ogv.svg';
import veOGVIcon from '../assets/ve-ogv.svg';
import { StateContext } from '../components/AppState';
import { ExternalLink, Info, Profile, Sync } from '../components/Icons';
import { MyLockups } from '../components/MyLockups';
import { NumberSpinner } from '../components/NumberSpinner';
import { ExtendStakeModal, StakeModal } from '../components/StakeModal';
import { Tabs } from '../components/Tabs';
import { Toaster } from '../components/Toaster';
import { Tooltip } from '../components/Tooltip';

import type { ReactNode } from 'react';

export function App() {
  return (
    <>
      <Toaster />
      <Nav />
      <div className="container mx-auto max-w-6xl px-3 sm:px-6">
        <Outlet />
      </div>
      <StakeModal />
      <ExtendStakeModal />
    </>
  );
}

export const Governance = () => {
  return <Heading>Origin DeFi Governance</Heading>;
};

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

const Nav = () => {
  const { state, setState } = useContext(StateContext);
  return (
    <div className="border-b border-b-gray-900 mb-8 sm:mb-16">
      <div className="px-3 sm:px-6 mx-auto flex items-center gap-12 py-6 sm:py-0">
        <img src={Logo} alt="logo" className="w-[125px] sm:w-[175px]" />
        <NavTabs className="hidden sm:flex justify-between" />
        <div className="hidden sm:flex items-center justify-between gap-4 ml-auto">
          <button className="btn-secondary px-6 py-3">
            <span className="hidden sm:inline">{'View on '}</span>IPFS
          </button>

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
      <NavTabs className="flex sm:hidden justify-center" />
    </div>
  );
};

const NavTabs = (props: { className?: string }) => {
  return (
    <Tabs
      className={props.className}
      tabs={[
        { label: 'Governance', href: '/governance' },
        { label: 'Staking', href: '/' },
      ]}
    />
  );
};

const Heading = ({ children }: { children: ReactNode }) => (
  <div className="font-bold text-3xl sm:text-4xl leading-snug mb-6">
    {children}
  </div>
);

const Actions = () => (
  <div className="flex items-center gap-4">
    <button className="btn-outline text-xs pl-4 pr-3 py-2 leading-tight flex items-center gap-1">
      OGV dashboard
      <ExternalLink />
    </button>
    <button className="btn-outline text-xs pl-4 pr-3 py-2 leading-tight flex items-center gap-1">
      Get OGV
      <ExternalLink />
    </button>
  </div>
);

const Stats = () => (
  <div className="mt-16 mb-16 py-6 px-8 border border-gray-900 flex flex-wrap gap-4 sm:gap-0 justify-between items-stretch max-w-3xl text-sm rounded-lg">
    <div className="flex flex-col items-start gap-3">
      <div className="text-gray-500 flex items-center gap-1.5">
        vAPY
        <Tooltip title="vAPY info blah blah">
          <Info size={14} />
        </Tooltip>
      </div>
      <div className="bg-orange-gradient bg-clip-text text-transparent font-bold text-3xl">
        52.89%
      </div>
    </div>
    <div className="hidden sm:block w-px bg-gray-900" />
    <div className="flex flex-col items-start gap-3">
      <div className="text-gray-500">Total OGV staked</div>
      <div className="font-bold text-3xl flex items-baseline gap-3">
        80.06%
        <div className="text-xs font-normal">(3.418b)</div>
      </div>
    </div>
    <div className="hidden sm:block w-px bg-gray-900" />
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
    <div className="bg-gray-900 rounded-lg p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0">
      <div className="flex flex-col items-start gap-1 sm:gap-3">
        <div className="text-gray-500 text-sm">My stake</div>
        <div className="flex items-center gap-3">
          <img src={OGVIcon} alt="OGV" />
          {!state.connected ? (
            <div className="mt-2 h-[2.5px] w-3 bg-gray-500" />
          ) : (
            <div className="text-2xl font-bold">
              {totalLocked.toLocaleString()}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-start gap-1 sm:gap-3">
        <div className="text-gray-500 text-sm">Wallet balance</div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <img src={OGVIcon} alt="OGV" />
          {state.connected ? (
            <div className="text-2xl font-bold">
              {state.walletBalance.toLocaleString()}
            </div>
          ) : (
            <div className="mt-2 h-[2.5px] w-3 bg-gray-500" />
          )}
          {state.walletBalance ? null : (
            <button
              className="ml-auto sm:ml-4 border-blue-600 border border-px rounded-full text-xs pl-4 pr-3 py-2 leading-tight flex items-center gap-1"
              onClick={() => {
                if (state.connected) {
                  setState({ walletBalance: 2000000 });
                }
              }}
            >
              Get OGV
              <ExternalLink />
            </button>
          )}
        </div>
      </div>
      <div className="py-1">
        {state.connected ? (
          <button
            className="btn w-full sm:w-auto sm:px-20 py-4 leading-none"
            onClick={() => setState({ stakeModal: true })}
          >
            Stake
          </button>
        ) : (
          <button
            className="btn w-full sm:w-auto sm:px-20 py-4 leading-none"
            onClick={() => setState({ connected: true })}
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

const RewardsToCollect = () => {
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

const VotingPower = () => {
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

export default App;
