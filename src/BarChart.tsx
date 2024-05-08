import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: any; // Adjust the typing based on your actual data structure
  year: any;
}

const BarChart: React.FC<BarChartProps> = ({ data, year }) => {
    const chartData = {
        labels: data[year].map((item: any) => item.country),
        datasets: [
            {
                label: `Population in ${year}`,
                data: data[year].map((item: any) => item.population),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options: ChartOptions<"bar"> = {
        indexAxis: "y", // This will make the bar chart horizontal
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Population",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Country",
                },
            },
        },
        plugins: {
            legend: {
                position: "top",
            },
            tooltip: {
                mode: "index",
                intersect: false,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div style={{ height: "500px", width: "800px" }}>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default BarChart;

