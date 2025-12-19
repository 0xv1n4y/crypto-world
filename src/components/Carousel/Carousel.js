import "./Carousel.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { CryptoState } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import { TrendingCoins } from "../../config/api";

const Carousel = () => {
  const { symbol, numberWithCommas, currency } = CryptoState();

  const [trending, setTrending] = useState([]); // To store Trending CoinsData
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTrendingCoins = async () => {
    setLoading(true);

    const { data } = await axios.get(TrendingCoins(currency));

    setTrending(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  // const fetchTrendingCoins = async () => {
  //   setLoading(true);

  //   try {
  //     const { data } = await axios.get(TrendingCoins(currency));
  //     setTrending(data);
  //   } catch (error) {
  //     setLoading(true)
  //     console.error("Error fetching data:", error);
  //     setError(error.message);
  //   } 
  // };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link to={`/coin/${coin.id}`} className="carouselItem">
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className="carousel">
      {loading ? (
        <LinearProgress style={{ backgroundColor: "red", width: "160vh" }} />
      )  : (
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          disableButtonsControls
          responsive={responsive}
          items={items}
          autoPlay
        />
      )}
    </div>
  );
};

export default Carousel;
