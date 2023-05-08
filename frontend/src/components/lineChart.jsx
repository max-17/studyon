import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import theme from './theme';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Get top insights about your performance',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Data',
      data: labels.map(() => Math.random() * 1000),
      borderColor: theme.palette.primary.main,
    },
  ],
};

export function Chart() {
  return <Line options={options} data={data} />;
}
