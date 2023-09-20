import { useContext } from 'react';

import { Link } from 'react-router-dom';

import { StateContext } from '../../components/AppState';
import { ExternalLink } from '../../components/Icons';

export const Actions = () => {
  const { setState } = useContext(StateContext);
  return (
    <div className="flex items-center gap-4">
      <Link
        className="btn-outline text-xs pl-4 pr-3 py-2 leading-tight flex items-center gap-1"
        to="https://www.ousd.com/ogv-dashboard"
        target="_blank"
      >
        OGV dashboard
        <ExternalLink />
      </Link>
      <button
        className="btn-outline text-xs pl-4 pr-3 py-2 leading-tight flex items-center gap-1"
        // to="https://app.uniswap.org/swap?outputCurrency=0x9c354503C38481a7A7a51629142963F98eCC12D0&chain=mainnet"
        // target="_blank"
        onClick={() => setState({ devControls: true })}
      >
        Get OGV
        <ExternalLink />
      </button>
    </div>
  );
};
