import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SingleCoin } from "../../config/api";
import { Typography, LinearProgress, Button } from "@mui/material";
import ReactHtmlParser from "react-html-parser";
import CoinInfo from "../../components/CoinInfo/CoinInfo";
import { CryptoState } from "../../CryptoContext";
import "./CoinPage.css";
import { db } from "../../firebase";
import { doc,  setDoc } from "firebase/firestore";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);

  const { currency, symbol, numberWithCommas, user, watchlist, setAlert } =
    CryptoState();

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  };

  useEffect(() => {
    fetchCoin();
    
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  const htmlContent = coin?.description?.en; // Assuming 'description.en' contains HTML content



  //WatchList Button Function

  const isWatchList = watchlist.includes(coin?.id);

  // Add coin to WatchList

  const addWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinRef, {
        coins: watchlist ? [...watchlist, coin?.id] : [coin?.id],
      });
      
      setAlert({
        open: true,
        message: `${coin.id} can be Added to watchList`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  // Remove Coin From WatchList

  const removefromWatchlist = async() => {

    const coinref = doc(db, "watchlist", user.uid);

    try {

       await setDoc(coinref,{
        coins : watchlist.filter((watch)=> watch !== coin?.id)
      },{
        merge : "true"
      });

      setAlert({
        open: true,
        message: `${coin.id} Can Be Removed From WatchList`,
        type: "error",
      });

    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      
    }

  }



  return (
    <div className="container">
      <div className="sidebar">
        <img
          src={coin?.image?.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className="heading">
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className="description">
          {ReactHtmlParser(htmlContent)}
        </Typography>
        <div className="marketData">
          <span style={{ display: "flex" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data?.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data?.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
          {user && (
            <Button
              style={{
                width: "30%",
                height: 40,
                backgroundColor: isWatchList ? "#ff0000" : "#EEBC1D",
                marginTop: 20,
               
              }}
              onClick={ isWatchList ? removefromWatchlist : addWatchlist}
            >
              {isWatchList ? "Remove WatchList" : "Add WatchList"}
            </Button>
          )}
        </div>
      </div>

      <div className="marketData">
        <CoinInfo coin={coin} />
      </div>
    </div>
  );
};

export default CoinPage;
