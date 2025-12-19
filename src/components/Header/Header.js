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
import AuthModal from "../Authentaction/AuthModel/AuthModel";
import UserSidebar from "../Authentaction/UserSidebar/UserSidebar";

const Header = () => {
  const navigate = useNavigate();

  const { currency, setCurrency, symbol, user } = CryptoState();

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
              style={{fontWeight:"bold"}}
              onClick={() => navigate("/")}
              
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
            {user ? <UserSidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
