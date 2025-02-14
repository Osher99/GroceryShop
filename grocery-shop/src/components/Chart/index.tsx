import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { useChart } from "./hooks/useChart";
import "chartjs-adapter-date-fns";
import { PaginationData } from "../../interfaces/PaginationData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
  TimeScale
);

interface ChartComponentProps {
  data: PaginationData;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data }) => {
  const { chartData } = useChart(data);
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      zoom: {
        pan: {
          enabled: false,
          mode: "x" as const,
        },
        zoom: {
          wheel: {
            enabled: false,
          },
          pinch: {
            enabled: false,
          },
          drag: {
            enabled: false,
          },
          mode: "x" as const,
        },
      },
    },
  };

  return (
    <div className="chart w-full h-[500px]">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;