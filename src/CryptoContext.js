import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { TrendingCoins, CoinList } from "./config/api";
import { createTheme } from "@mui/material";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (currency === "INR") {
      setSymbol("₹");
    } else if (currency === "USD") {
      setSymbol("$");
    }
  }, [currency, symbol]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const darkTheam = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  // Carousel
  const [trending, setTrending] = useState([]); // To store Trending CoinsData
  const [error, setError] = useState(null); // New state to handle errors
  const [loading, setLoading] = useState(false);

  const fetchTrendingCoins = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(data);
      setLoading(false);
      setError(null); // Reset error state on success
    } catch (error) {
      setError(error); // Set the error state to the caught error
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  //CoinsTable

  const [coins, setCoins] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    if (data) {
      setCoins(data);
      setLoading(false);
    } else {
      setErr(true);
    }
  };

  // When currency is changed DOM also update automatically

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  // Filter function

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <Crypto.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        err,
        setErr,
        numberWithCommas,
        trending,
        setTrending,
        error,
        setError,
        fetchTrendingCoins,
        handleSearch,
        setSearch,
        page,
        setPage,
        darkTheam,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
