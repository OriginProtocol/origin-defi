import { useEffect, useState } from 'react';

import { NumberSpinner } from '../components/NumberSpinner';

export const Spinner = () => {
  const [num, setNum] = useState(1);
  const [reset, setReset] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 1);
  }, [reset]);

  return (
    <div>
      <div className="my-4 text-3xl font-medium">
        {show && <NumberSpinner num={num} />}
      </div>
      <div className="flex gap-3">
        <button
          className="btn-outline px-4 py-1 text-sm"
          onClick={() => setNum(1)}
        >
          1
        </button>
        <button
          className="btn-outline px-4 py-1 text-sm"
          onClick={() => setNum(9)}
        >
          9
        </button>
        <button
          className="btn-outline px-4 py-1 text-sm"
          onClick={() => setNum(111)}
        >
          111
        </button>
        <button
          className="btn-outline px-4 py-1 text-sm"
          onClick={() => setNum(num - 1)}
        >
          -1
        </button>
        <button
          className="btn-outline px-4 py-1 text-sm"
          onClick={() => setNum(num + 1)}
        >
          +1
        </button>
        <button
          className="btn-outline px-4 py-1 text-sm"
          onClick={() => setNum(num + 12)}
        >
          +12
        </button>
        <button
          className="btn-outline px-4 py-1 text-sm"
          onClick={() => setNum(num + 123)}
        >
          +123
        </button>
        <button
          className="btn-outline px-4 py-1 text-sm"
          onClick={() => setReset(reset + 1)}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
