import "./CoinsTable.css";

import { CryptoState } from "../../CryptoContext";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TableBody,
  TableContainer,
  TableHead,
  TextField,
  ThemeProvider,
  Typography,
 
  Table,
  LinearProgress,
  TableRow,
  TableCell,
  Pagination,
} from "@mui/material";

const CoinsTable = () => {
  const navigate = useNavigate();
  const rowarray = ["Coin", "Price", "24h Change", "Market Cap"];


  const {
    symbol,
    err,
    numberWithCommas,
    handleSearch,
    setSearch,
    loading,
    page,
    setPage,
    darkTheam,
  } = CryptoState();

  
  return (
    <ThemeProvider theme={darkTheam}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          CryptoCurrency Prices by Market Cap
        </Typography>

        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%", color: "red" }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {rowarray.map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {err ? (
                  <h1>Somthing Went Wrong</h1>
                ) : (
                  handleSearch()
                    .slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;

                      return (
                        <TableRow
                          className="row"
                          onClick={() => navigate(`/coin/${row.id}`)}
                          key={row.name}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            style={{
                              displa: "flex",
                              gap: 15,
                              color: "white",
                              fontWeight: "bold",
                            }}
                          >
                            <img
                              src={row?.image}
                              alt={row.name}
                              height="50"
                              style={{ marginBottom: 10 }}
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                }}
                              >
                                {row.symbol}
                              </span>

                              <span style={{ color: "darkgrey" }}>
                                {row.name}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell
                            align="right"
                            style={{ color: "whitesmoke", fontWeight: "900" }}
                          >
                            {symbol}{" "}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCell>

                          <TableCell
                            align="right"
                            style={{
                              color: profit > 0 ? "rgb(14,203,129)" : "red",
                              fontWeight: 500,
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>

                          <TableCell
                            align="right"
                            style={{ color: "whitesmoke", fontWeight: "900" }}
                          >
                            {symbol} {row.market_cap.toString().slice(0, -6)}M
                          </TableCell>
                        </TableRow>
                      );
                    })
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            color: "gold",
          }}
          className="pagination"
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
