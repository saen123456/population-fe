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
      const response = await axios.get<any>(
        "http://localhost:3000/api/getAllPoppulation"
      );
      if (response.data) {
        const countryDataArray = Object.entries(response.data).map(
          (item: any) => ({
            "Country name": item[0],
            Population: item[1][0]?.Population, // Assuming you want the first element of the population array
          })
        );
        setPopulationData(countryDataArray);
        setlabels(countryDataArray.map((entry: any) => entry["Country name"]));
        setData(
          countryDataArray.map((entry: any) => parseInt(entry.Population))
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

  const options: ChartOptions<"bar"> = {
    indexAxis: "y", // Set the index axis to y
    scales: {
      x: {
        title: {
          display: true,
          text: "Population", // Set the title for the x axis
        },
      },
      y: {
        beginAtZero: true,
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
