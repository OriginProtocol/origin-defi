import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
} from 'chart.js';

export function registerChart() {
  ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);
}
