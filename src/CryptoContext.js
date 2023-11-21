import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { TrendingCoins, CoinList } from "./config/api";
import { createTheme } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  //FireBase  Authentication
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  // watchList

  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);

      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setWatchlist(coin.data().coins);
        } else {
          console.log("NO Coins in Watch List");
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  // Main

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

  //CoinsTable

  const [coins, setCoins] = useState([]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);



 


  const fetchCoins = async ()=>{
    setLoading(true);
    const {data} = await axios.get(CoinList(currency));
    setCoins(data)
    setLoading(false)
  }

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
        coins,
        symbol,
        setCurrency,
        loading,
        err,
        setErr,
        numberWithCommas,
        handleSearch,
        setSearch,
        page,
        setPage,
        darkTheam,
        alert,
        setAlert,
        user,
        watchlist,
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
