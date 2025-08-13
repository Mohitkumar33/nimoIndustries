import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, CircularProgress } from "@mui/material";
import CryptoTable from "../components/CryptoTable";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
          sparkline: false,
        },
      })
      .then((res) => {
        setCoins(res.data);
        setLoading(false);
      });
    console.log("Hi");
  }, []);

  if (loading)
    return <CircularProgress sx={{ display: "block", m: "2rem auto" }} />;

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 3 }}>
        Top 10 Cryptocurrencies
      </Typography>
      <CryptoTable coins={coins} />
    </Container>
  );
}
