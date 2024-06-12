import 'chartjs-adapter-date-fns';

import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  registerables,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

export function registerChart() {
  ChartJS.register(
    ...registerables,
    annotationPlugin,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
  );
}
