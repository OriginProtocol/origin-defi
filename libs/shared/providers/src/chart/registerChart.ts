import 'chartjs-adapter-date-fns';

import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  registerables,
  TimeScale,
} from 'chart.js';

export function registerChart() {
  ChartJS.register(
    ...registerables,
    CategoryScale,
    LinearScale,
    TimeScale,
    LineElement,
    PointElement,
  );
}
