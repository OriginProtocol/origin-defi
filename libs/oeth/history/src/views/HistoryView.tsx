import { HistoryCard } from '../components/HistoryCard';
import { useDummyQuery } from '../queries.generated';

export function HistoryView() {
  const { data } = useDummyQuery();

  console.log(data);

  return <HistoryCard />;
}
