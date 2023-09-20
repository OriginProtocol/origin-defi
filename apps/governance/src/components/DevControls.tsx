import { useContext, useState } from 'react';

import { AnimatedModal, ModalHeader } from '../components/AnimatedModal';
import { StateContext } from './AppState';

export const DevControls = () => {
  const [shouldClose, setShouldClose] = useState(false);
  const { state, setState } = useContext(StateContext);

  return (
    <>
      <button
        className="bg-gray-900 fixed bottom-2 right-2 px-2 py-1 rounded text-xs font-bold hover:bg-gray-800"
        onClick={() => setState({ devControls: true })}
      >
        DEV
      </button>
      <AnimatedModal
        open={state.devControls}
        shouldClose={shouldClose}
        maxWidth={300}
        onClose={() => {
          setState({ devControls: false });
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
          <button
            className="btn-outline py-2 text-sm"
            onClick={() => {
              const sixMonths = 1000 * 60 * 60 * 24 * 30 * 6;
              setState({
                lockups: state.lockups.map((l) => ({
                  ...l,
                  endsAt:
                    l.endsAt + (l.endsAt > Date.now() ? -sixMonths : sixMonths),
                })),
              });
              setShouldClose(true);
            }}
          >
            +6 months
          </button>
        </div>
      </AnimatedModal>
    </>
  );
};
