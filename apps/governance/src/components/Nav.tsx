import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import Logo from '../assets/logo.svg';
import { ProfileIcon, SyncIcon } from '../components/Icons';
import { Tabs } from '../components/Tabs';
import { truncateAddress } from '../utils/string';

export const Nav = () => {
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

  return (
    <div className="border-b border-b-gray-900 mb-8 sm:mb-16">
      <div className="px-3 sm:px-6 mx-auto flex items-center gap-12 py-6 sm:py-0">
        <img src={Logo} alt="logo" className="w-[125px] sm:w-[175px]" />
        <NavTabs className="hidden sm:flex justify-between" />
        <div className="hidden sm:flex items-center justify-between gap-4 ml-auto">
          <button className="btn-secondary px-6 py-3">
            <span className="hidden sm:inline">{'View on '}</span>IPFS
          </button>

          {isConnected ? (
            <button
              className="btn-secondary px-4 py-2 flex items-center gap-3 font-medium self-stretch"
              onClick={openAccountModal}
            >
              <div className="rounded-full overflow-hidden">
                <ProfileIcon />
              </div>
              <div>{truncateAddress(address)}</div>
            </button>
          ) : (
            <button className="btn px-6 py-3" onClick={openConnectModal}>
              Connect
            </button>
          )}
          <button className="btn-secondary p-2 text-blue-500">
            <SyncIcon />
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
