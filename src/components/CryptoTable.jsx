import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Sparklines, SparklinesLine } from "react-sparklines";

export default function CryptoTable({ coins }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Coin</TableCell>
            <TableCell>Price (USD)</TableCell>
            <TableCell>1h %</TableCell>
            <TableCell>24h %</TableCell>
            <TableCell>7d %</TableCell>
            <TableCell>24h Volume</TableCell>
            <TableCell>Market Cap</TableCell>
            <TableCell>Last 7d</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map((coin) => (
            <TableRow key={coin.id}>
              <TableCell>{coin.market_cap_rank}</TableCell>
              <TableCell>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={coin.image}
                    alt={coin.name}
                    sx={{ width: 24, height: 24, mr: 1 }}
                  />
                  <Link
                    to={`/coin/${coin.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography>{coin.name}</Typography>
                  </Link>
                  <Typography sx={{ ml: 1, color: "gray" }}>
                    {coin.symbol.toUpperCase()}
                  </Typography>
                </div>
              </TableCell>
              <TableCell>${coin.current_price.toLocaleString()}</TableCell>

              <TableCell
                sx={{
                  color:
                    coin.price_change_percentage_1h_in_currency > 0
                      ? "green"
                      : "red",
                }}
              >
                {coin.price_change_percentage_1h_in_currency
                  ? coin.price_change_percentage_1h_in_currency.toFixed(2)
                  : "N/A"}
                %
              </TableCell>

              <TableCell
                sx={{
                  color: coin.price_change_percentage_24h > 0 ? "green" : "red",
                }}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </TableCell>

              <TableCell
                sx={{
                  color:
                    coin.price_change_percentage_7d_in_currency > 0
                      ? "green"
                      : "red",
                }}
              >
                {coin.price_change_percentage_7d_in_currency
                  ? coin.price_change_percentage_7d_in_currency.toFixed(2)
                  : "N/A"}
                %
              </TableCell>

              <TableCell>${coin.total_volume.toLocaleString()}</TableCell>
              <TableCell>${coin.market_cap.toLocaleString()}</TableCell>
              <TableCell>
                {coin.sparkline_in_7d ? (
                  <Sparklines
                    data={coin.sparkline_in_7d.price}
                    width={100}
                    height={30}
                  >
                    <SparklinesLine
                      color={
                        coin.price_change_percentage_7d_in_currency > 0
                          ? "green"
                          : "red"
                      }
                    />
                  </Sparklines>
                ) : (
                  "N/A"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
