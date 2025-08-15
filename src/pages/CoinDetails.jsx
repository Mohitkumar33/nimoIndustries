import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getSingleCoinData } from "../api/allApis";

export default function CoinDetail() {
  const { id } = useParams();
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

  // Prepare 7-day sparkline data
  const chartData = coin.market_data.sparkline_7d.price.map((price, index) => ({
    time: index,
    price: price,
  }));

  return (
    <Container sx={{ mt: 4 }}>
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
            <Typography variant="h6">${coin.market_data.current_price.usd.toLocaleString()}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography>1h Change</Typography>
            <Typography variant="h6" color={coin.market_data.price_change_percentage_1h_in_currency.usd >= 0 ? "green" : "red"}>
              {coin.market_data.price_change_percentage_1h_in_currency.usd?.toFixed(2)}%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography>24h Change</Typography>
            <Typography variant="h6" color={coin.market_data.price_change_percentage_24h >= 0 ? "green" : "red"}>
              {coin.market_data.price_change_percentage_24h?.toFixed(2)}%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography>7d Change</Typography>
            <Typography variant="h6" color={coin.market_data.price_change_percentage_7d_in_currency.usd >= 0 ? "green" : "red"}>
              {coin.market_data.price_change_percentage_7d_in_currency.usd?.toFixed(2)}%
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* 7-Day Price Chart */}
      <Box sx={{ height: 300 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Last 7 Days Price
        </Typography>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="time" hide />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Line type="monotone" dataKey="price" stroke="#1976d2" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Container>
  );
}
