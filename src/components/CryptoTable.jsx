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
import "../../styles/CryptoTable.css";

export default function CryptoTable({ coins }) {
  return (
    <TableContainer component={Paper}>
      <Table className="customTable">
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

              {/* 1h % */}
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
                  : 0}
                %
              </TableCell>

              {/* 24h % */}
              <TableCell
                sx={{
                  color:
                    coin.price_change_percentage_24h_in_currency > 0
                      ? "green"
                      : "red",
                }}
              >
                {coin.price_change_percentage_24h_in_currency
                  ? coin.price_change_percentage_24h_in_currency.toFixed(2)
                  : 0}
                %
              </TableCell>

              {/* 7d % */}
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
                  : 0}
                %
              </TableCell>

              <TableCell>${coin.total_volume.toLocaleString()}</TableCell>
              <TableCell>${coin.market_cap.toLocaleString()}</TableCell>

              {/* Sparkline for last 7 days */}
              <TableCell sx={{ width: 160 }}>
                {coin.sparkline_in_7d && (
                  <Sparklines
                    data={coin.sparkline_in_7d.price}
                    width={130}
                    height={50}
                  >
                    <SparklinesLine
                      color={
                        coin.price_change_percentage_7d_in_currency > 0
                          ? "green"
                          : "red"
                      }
                    />
                  </Sparklines>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
