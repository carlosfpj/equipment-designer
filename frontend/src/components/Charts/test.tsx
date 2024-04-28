import {Chart as ChartJS, CategoryScale, LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options ={
  responsive: true,
  interaction: {
    mode:  'index' as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Figure 2.1 Velocity in Liquid Lines"
    },
  },
  scales: {
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const labels = ['0', '1', '2', '3'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [0,1,2,3,4,5,6],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      yAxisID: 'y',
    },
    {
      label: 'Dataset 2',
      data: [0,5,7,32,41,1,2,3],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      yAxisID: 'y1',
    }
  ]
}
