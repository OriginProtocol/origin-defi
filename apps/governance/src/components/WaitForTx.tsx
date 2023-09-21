import { useContext } from 'react';

import { StateContext } from '../components/AppState';

export function WaitForTx({ children }: { children: React.ReactNode }) {
  const { state, setState } = useContext(StateContext);
  return (
    <>
      <div className={state.waitForTx ? 'blur-sm pointer-events-none' : null}>
        {children}
      </div>
      {!state.waitForTx ? null : (
        <div
          className="fixed inset-0 flex items-center justify-center"
          onClick={() => setState({ waitForTx: false })}
        >
          <div className="bg-blue-500 text-3xl text-off-white rounded-lg z-50 font-bold px-8 py-5 leading-tight max-w-[280px]">
            Sign approval in wallet...
          </div>
        </div>
      )}
    </>
  );
}
