import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, CircularProgress, Box } from "@mui/material";
import { getSingleCoinData } from "../api/allApis"; // ✅ import your function

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
      <Typography variant="h6">
        Current Price: ${coin.market_data.current_price.usd.toLocaleString()}
      </Typography>
      <Typography>
        Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}
      </Typography>
      <Typography>
        24h High: ${coin.market_data.high_24h.usd.toLocaleString()}
      </Typography>
      <Typography>
        24h Low: ${coin.market_data.low_24h.usd.toLocaleString()}
      </Typography>
      <Typography>
        Circulating Supply:{" "}
        {coin.market_data.circulating_supply.toLocaleString()}
      </Typography>
      <Typography>
        Total Supply: {coin.market_data.total_supply?.toLocaleString() || "N/A"}
      </Typography>
      <Typography>
        All Time High: ${coin.market_data.ath.usd.toLocaleString()} (
        {coin.market_data.ath_change_percentage.usd.toFixed(2)}%)
      </Typography>
      <Typography>
        All Time Low: ${coin.market_data.atl.usd.toLocaleString()} (
        {coin.market_data.atl_change_percentage.usd.toFixed(2)}%)
      </Typography>
    </Container>
  );
}
