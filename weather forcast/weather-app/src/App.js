import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleGetWeather = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/weather?city=${encodeURIComponent(city)}`
      );
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];

  // const data = {
  //   labels: [], // Array of timestamps or labels for x-axis
  //   datasets: [
  //     {
  //       label: "Temperature (°C)",
  //       data: [], // Array of temperature values for y-axis
  //       fill: false,
  //       borderColor: "rgb(75, 192, 192)",
  //       tension: 0.1,
  //     },
  //   ],
  // };

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: labels.map((l, index) => weatherData?.hourly_f[index]['temp_c']),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Humidity (%)",
        data: labels.map((l, index) => weatherData?.hourly_f[index]['humidity']),
        borderColor: "rgb(230,230,250)",
        tension: 0.1,
        backgroundColor: "rgb(230,230,250)",
      },
       {
        label: "Wind Speed (KM)",
        data: labels.map((l, index) => weatherData?.hourly_f[index]['wind_kph']),
        borderColor: "rgb(190, 100, 0)",
        tension: 0.1,
        backgroundColor: "rgb(190, 100, 0)",
      },
    ],
  };

  return (
    <div>
      <h1>Weather Forecast</h1>

      {/* Weather Form */}
      <form onSubmit={handleGetWeather}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      {/* Weather Data */}
      {weatherData && (
        <div>
          <h2>{weatherData.location}</h2>
          <p>Temperature: {weatherData.temperature}°C</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Description: {weatherData.description}</p>
        </div>
      )}

      {/* Chart */}
      {weatherData && (
        <div style={{ height: '400px', width: '800px' }}>
          <Line data={data} options={options} />
        </div>
      )}
    </div>
  );
}

export default App;
