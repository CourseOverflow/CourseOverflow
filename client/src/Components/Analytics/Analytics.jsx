import React from "react";
import styles from "./Analytics.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Views",
        data: [5000, 7000, 6000, 8000, 9000, 12000],
        fill: true,
        borderColor: "green",
        backgroundColor: "green",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",
        labels: data.labels,
      },
      y: {
        beginAtZero: false,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  };

  return (
    <div className={styles.analyticsContainer}>
      <h2 className={styles.chartTitle}>Analytics</h2>
      <div className={styles.chartWrapper}>
        <Line data={data} options={options} className="bg-transparent h-full" />
      </div>
    </div>
  );
};

export default Analytics;
