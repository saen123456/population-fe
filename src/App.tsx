import React, { useCallback, useEffect, useState } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import type { BarControllerDatasetOptions, ChartOptions } from "chart.js";
import axios from "axios";

ChartJS.register(...registerables);

interface PopulationData {
  "Country name": string;
  Population: string | number; // Modify the type to allow both string and number
}

interface PopulationResponse {
  [country: string]: number[]; // Assuming population data is an array of numbers
}

const App: React.FC = () => {
  const [populationData, setPopulationData] = useState<PopulationData[]>([]);
  const [labels, setlabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get<PopulationResponse>(
        "http://localhost:3000/api/getAllPoppulation"
      );
      if (response.data) {
        console.log(response.data);
        const countryDataArray = Object.entries(response.data).map(
          ([country, populationArray]) => ({
            "Country name": country,
            Population: populationArray[0], // Assuming you want the first element of the population array
          })
        );
        setPopulationData(countryDataArray);
        setlabels(countryDataArray.map((entry: any) => entry["Country name"]));
        setData(
          countryDataArray.map((entry: any) => parseInt(entry.Population) || 0)
        );
      } else {
        console.error("Invalid data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [setPopulationData, setlabels, setData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Population",
        data,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Population",
        },
      },
      x: {
        title: {
          display: true,
          text: "Country",
        },
      },
    },
  };

  return (
    <div style={{ height: "500px", width: "800px" }}>
      {populationData.length > 0 ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
