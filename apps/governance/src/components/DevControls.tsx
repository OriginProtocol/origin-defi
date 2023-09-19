import { useContext, useState } from 'react';

import { AnimatedModal, ModalHeader } from '../components/AnimatedModal';
import { StateContext } from './AppState';

export const DevControls = () => {
  const [open, setOpen] = useState(false);
  const [shouldClose, setShouldClose] = useState(false);
  const { state, setState } = useContext(StateContext);

  return (
    <>
      <button
        className="bg-gray-900 fixed bottom-2 right-2 px-2 py-1 rounded text-xs font-bold hover:bg-gray-800"
        onClick={() => setOpen(true)}
      >
        DEV
      </button>
      <AnimatedModal
        open={open}
        shouldClose={shouldClose}
        maxWidth={300}
        onClose={() => {
          setOpen(false);
          setShouldClose(false);
        }}
      >
        <ModalHeader onClose={() => setShouldClose(true)}>
          Dev controls
        </ModalHeader>
        <div className="p-6 flex flex-col gap-4">
          <button
            className="btn-outline py-2 text-sm"
            onClick={() => {
              setState({ walletBalance: state.walletBalance + 1000000 });
              setShouldClose(true);
            }}
          >
            +1,000,000 OGV
          </button>
        </div>
      </AnimatedModal>
    </>
  );
};
