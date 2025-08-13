import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function CryptoTable({ coins }) {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Coin</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Market Cap</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map((coin) => (
            <TableRow key={coin.id}>
              <TableCell>
                <Link
                  to={`/coin/${coin.id}`}
                  style={{ textDecoration: "none", color: "blue" }}
                >
                  {coin.name}
                </Link>
              </TableCell>
              <TableCell>${coin.current_price.toLocaleString()}</TableCell>
              <TableCell>${coin.market_cap.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
