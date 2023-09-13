import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from 'chart.js';

export function registerChart() {
  ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);
}
