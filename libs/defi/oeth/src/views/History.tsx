import { WidgetContainer } from '@origin/shared/components';
import { APY, ChartCard, Portfolio } from '../components';

export function HistoryView() {
  return (
    <>
      <WidgetContainer>
        <APY />
        <Portfolio />
      </WidgetContainer>
      <ChartCard />
    </>
  );
}
