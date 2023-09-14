import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
} from 'chart.js';

import preview from './decorators';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

export default preview;
