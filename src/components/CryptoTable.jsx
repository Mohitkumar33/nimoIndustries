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


export default function CryptoTable({ coins }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Coin</TableCell>
            <TableCell>Price (USD)</TableCell>
            <TableCell>24h %</TableCell>
            <TableCell>24h Volume</TableCell>
            <TableCell>Market Cap</TableCell>
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
                  <Link to={`/coin/${coin.id}`} style={{ textDecoration: "none" }}>
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
                  color: coin.price_change_percentage_24h > 0 ? "green" : "red",
                }}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </TableCell>
              <TableCell>${coin.total_volume.toLocaleString()}</TableCell>
              <TableCell>${coin.market_cap.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
