import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import styles from "./HourlyForecast.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

const getLocalHour = (unixTime, timezone) => {
  const date = new Date((unixTime + timezone) * 1000);

  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
};

export const HourlyForecast = ({ forecast }) => {
  if (!forecast || !forecast.list || !forecast.city) {
    return null;
  }
  const timezone = forecast.city.timezone;

  const hourlyItems = forecast.list.slice(0, 12);

  const labels = hourlyItems.map((item) => getLocalHour(item.dt, timezone));
  const temperatures = hourlyItems.map((item) => Math.round(item.main.temp));

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature",
        data: temperatures,
        borderColor: "#ffb36c",
        backgroundColor: "#ffb36c",
        tension: 0.35,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y}°C`,
        },
      },
    },

    scales: {
      x: {
        grid: {
          color: "#c7c7c7",
        },
        ticks: {
          color: "#000000",
          font: {
            size: 10,
          },
        },
      },
      y: {
        grid: {
          color: "#c7c7c7",
        },
        ticks: {
          color: "#000000",
          font: {
            size: 10,
          },
          callback: (value) => `${value}°C`,
        },
      },
    },
  };

  return (
    <div className={styles.chartBox}>
      <h2 className={styles.title}>Hourly forecast</h2>

      <div className={styles.chartWrapper}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};
