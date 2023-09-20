import { Outlet } from 'react-router-dom';

import { DevControls } from '../components/DevControls';
import { Nav } from '../components/Nav';
import { Toaster } from '../components/Toaster';
import { ExtendStakeModal, StakeModal } from './staking/StakeModal';

export function App() {
  return (
    <>
      <Nav />
      <div className="container mx-auto max-w-6xl px-3 sm:px-6">
        <Outlet />
      </div>
      <StakeModal />
      <ExtendStakeModal />
      <Toaster />
      <DevControls />
    </>
  );
}

export default App;
