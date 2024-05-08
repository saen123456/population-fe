import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import BarChart from "./BarChart";
import axios from "axios";

const App: React.FC = () => {
  const [populationData, setPopulationData] = useState([]);
  const [year, setYear] = useState(1950);
  const maxYear = 2021;

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get<any>(
        "https://population-be-production.up.railway.app/api/getAllPoppulation"
      );
      console.log(Object.entries(response.data).length);
      setPopulationData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [setPopulationData]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      setYear((prevYear) => {
        if (prevYear >= maxYear) clearInterval(interval);
        return prevYear < maxYear ? prevYear + 1 : prevYear;
      });
    }, 1000); // Change the year every second
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {Object.entries(populationData).length > 0 ? (
          <BarChart data={populationData} year={year} />
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
};

export default App;
