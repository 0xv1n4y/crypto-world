import React from "react";
import "./Banner.css";
import { Container, Typography } from "@mui/material";
import Carousel from "../Carousel/Carousel";

const Banner = () => {
  return (
    <div className="banner">
      <Container className="bannerContent">
        <div className="tagline">
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
              color: "Red",
              
            }}
          >
            Crypto Currency
          </Typography>

          <Typography
            variant="subtitle2"
            style={{
              color: "#FF7F50",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
              fontWeight: "900",
            }}
          >
            Get all the information regrading crypto currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
