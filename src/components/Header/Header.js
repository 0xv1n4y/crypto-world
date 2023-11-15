import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import { CryptoState } from "../../CryptoContext";


const Header = () => {
  const navigate = useNavigate();

  const { currency, setCurrency, symbol } = CryptoState();

  const darkTheam = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  console.log(currency);
  console.log(symbol);

  return (
    <ThemeProvider theme={darkTheam}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              className="title"
              onClick={() => navigate("/")}
              variant="h6"
            >
              Crypto Hunter
            </Typography>

            <Select
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
                backgroundColor: "white",
                marginLeft: "10px",
              }}
              label="Cyrrency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <br></br>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
