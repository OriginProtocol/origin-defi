import 'chartjs-adapter-date-fns';

import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  registerables,
} from 'chart.js';

export function registerChart() {
  ChartJS.register(
    ...registerables,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
  );
}
