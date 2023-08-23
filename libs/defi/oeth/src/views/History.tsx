import { APY, HistoryCard } from '../components';

export function HistoryView() {
  return (
    <>
      <APY
        value={6.71}
        balance={0}
        pendingYield={0}
        earnings={0}
        tokenIcon="https://app.oeth.com/images/oeth.svg"
      />
      <HistoryCard />
    </>
  );
}
