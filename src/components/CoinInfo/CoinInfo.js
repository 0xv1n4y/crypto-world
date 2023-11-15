import React, { useEffect, useState } from "react";
import { HistoricalChart } from "../../config/api";
import axios from "axios";
import { CryptoState } from "../../CryptoContext";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CircularProgress, ThemeProvider } from "@material-ui/core";
import { chartDays } from "../../config/data";
import "./CoinInfo.css";

const CoinInfo = ({ coin }) => {
  const { currency, darkTheme } = CryptoState();
  const [historicalCoin, setHistoricalCoin] = useState([]);
  const [days, setDays] = useState(1);

  const fetchHistoricalCoin = async () => {
    try {
      const { data } = await axios.get(
        HistoricalChart(coin.id, days, currency) // Assuming you want data for the last 30 days
      );
      setHistoricalCoin(data.prices);
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  useEffect(() => {
    fetchHistoricalCoin();
  }, [currency, coin.id, days]); // Include coin.id as a dependency

  // Function to format date/time
  const formatDateTime = (days) => {
    const date = new Date(days);
    const time =
      date.getHours() > 12
        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
        : `${date.getHours()}:${date.getMinutes()} AM`;

    return days === 1 ? time : date.toLocaleDateString();
  };

  // Prepare data for the chart
  const chartData = {
    labels: historicalCoin.map((entry) => formatDateTime(entry[0])),
    datasets: [
      {
        label: `Price ( Past ${days} Days ) in ${currency}`,
        data: historicalCoin.map((entry) => entry[1]),
        fill: false,
        borderColor: "gold",
        tension: 0,
      },
    ],
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="charts">
        {!historicalCoin ? (
          <CircularProgress style={{ color: "red" }} size={250} thickness={1} />
        ) : (
          <>
            <Line
              style={{ width: "1000px" }}
              data={chartData}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
          </>
        )}
      </div>

      <div className="buttons-container">
        {chartDays.map((day) => (
          <button
            className="date"
            key={day.value}
            onClick={() => setDays(day.value)}
          >
            {day.label}
          </button>
        ))}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
