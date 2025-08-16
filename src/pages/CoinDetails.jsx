import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Grid,
  Paper,
  Breadcrumbs,
  Link,
  TextField,
  Button,
} from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import { Table, TableBody, TableRow, TableCell } from "@mui/material";
import { getSingleCoinData } from "../api/allApis";

export default function CoinDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoinDetail = async () => {
      try {
        setLoading(true);
        const data = await getSingleCoinData(id);
        setCoin(data);
      } catch (err) {
        setError("Failed to fetch coin details");
      } finally {
        setLoading(false);
      }
    };
    fetchCoinDetail();
  }, [id]);

  if (loading)
    return <CircularProgress sx={{ display: "block", margin: "2rem auto" }} />;

  if (error)
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 4 }}>
        {error}
      </Typography>
    );

  if (!coin) return null;

  // Prepare 7-day sparkline data with time
  const chartData = coin.market_data.sparkline_7d.price.map((price, index) => {
    const startTimestamp = dayjs().subtract(7, "day").valueOf();
    const interval =
      (7 * 24 * 60 * 60 * 1000) / coin.market_data.sparkline_7d.price.length; // interval in ms
    const timestamp = startTimestamp + index * interval;
    return {
      time: dayjs(timestamp).format("MMM D, HH:mm"), // date + hour:minute
      price: price,
      volume: coin.market_data.total_volume.usd, // placeholder
    };
  });

  const change7d = coin.market_data.price_change_percentage_7d_in_currency.usd;
  const lineColor = change7d >= 0 ? "#4caf50" : "#f44336";
  const fillColor =
    change7d >= 0 ? "rgba(76, 175, 80, 0.2)" : "rgba(244, 67, 54, 0.2)";

  return (
    <Container sx={{ mt: 4 }}>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link
          underline="hover"
          color="inherit"
          onClick={() => navigate("/")}
          sx={{ cursor: "pointer" }}
        >
          Home
        </Link>
        <Typography color="text.primary">{coin.name}</Typography>
      </Breadcrumbs>

      {/* Coin Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <img
          src={coin.image.large}
          alt={coin.name}
          style={{ width: 50, marginRight: 16 }}
        />
        <Typography variant="h4">
          {coin.name} ({coin.symbol.toUpperCase()})
        </Typography>
      </Box>

      {/* Coin Market Data */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography>Current Price</Typography>
            <Typography variant="h6">
              ${coin.market_data.current_price.usd.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography>1h Change</Typography>
            <Typography
              variant="h6"
              color={
                coin.market_data.price_change_percentage_1h_in_currency.usd >= 0
                  ? "green"
                  : "red"
              }
            >
              {coin.market_data.price_change_percentage_1h_in_currency.usd?.toFixed(
                2
              )}
              %
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography>24h Change</Typography>
            <Typography
              variant="h6"
              color={
                coin.market_data.price_change_percentage_24h >= 0
                  ? "green"
                  : "red"
              }
            >
              {coin.market_data.price_change_percentage_24h?.toFixed(2)}%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography>7d Change</Typography>
            <Typography variant="h6" color={change7d >= 0 ? "green" : "red"}>
              {change7d?.toFixed(2)}%
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* 7-Day Price Chart */}
      <Box sx={{ height: 300, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Last 7 Days Price
        </Typography>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={lineColor} stopOpacity={0.3} />
                <stop offset="75%" stopColor={lineColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip
              formatter={(value) => `$${value.toLocaleString()}`}
              labelFormatter={(label) => `Date & Time: ${label}`}
              // you can also show volume if available per timestamp
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={lineColor}
              fill="url(#colorFill)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>

      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Historical Price
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>24h Range</TableCell>
                <TableCell>
                  ${coin.market_data.high_24h.usd.toFixed(2)} – $
                  {coin.market_data.low_24h.usd.toFixed(2)}
                </TableCell>
              </TableRow>
              {/* <TableRow>
                <TableCell>7d Range</TableCell>
                <TableCell>
                  ${coin.market_data.high_7d?.usd?.toFixed(2) || "-"} – $
                  {coin.market_data.low_7d?.usd?.toFixed(2) || "-"}
                </TableCell>
              </TableRow> */}
              <TableRow>
                <TableCell>All-Time High</TableCell>
                <TableCell>
                  ${coin.market_data.ath.usd.toFixed(2)} (
                  {coin.market_data.ath_change_percentage.usd.toFixed(2)}%){" "}
                  <br />
                  {dayjs(coin.market_data.ath_date.usd).format("MMM D, YYYY")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>All-Time Low</TableCell>
                <TableCell>
                  ${coin.market_data.atl.usd.toFixed(6)} (
                  {coin.market_data.atl_change_percentage.usd.toFixed(2)}%){" "}
                  <br />
                  {dayjs(coin.market_data.atl_date.usd).format("MMM D, YYYY")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Container>
  );
}
