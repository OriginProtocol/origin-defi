import { Info } from '../../components/Icons';
import { NumberSpinner } from '../../components/NumberSpinner';
import { Tooltip } from '../../components/Tooltip';

export const Stats = () => (
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
        {/* <NumberSpinner num={1462} slow spinAtStart /> */}
        <NumberSpinner num={1462} slow spinAtStart />
      </div>
    </div>
  </div>
);
