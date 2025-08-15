import { useEffect, useState } from "react";
import { Container, Typography, CircularProgress } from "@mui/material";
import CryptoTable from "../components/CryptoTable";
import { getMarketData } from "../api/allApis"; // ✅ import the function

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const coinsData = async () => {
      try {
        setLoading(true);
        const data = await getMarketData();
        setCoins(data);
        console.log(data);
      } catch (err) {
        setError("Failed to fetch cryptocurrency data.");
      } finally {
        setLoading(false);
      }
    };
    coinsData();
  }, []);

  if (loading)
    return <CircularProgress sx={{ display: "block", margin: "2rem auto" }} />;

  if (error)
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 4 }}>
        {error}
      </Typography>
    );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        Top 10 Cryptocurrencies
      </Typography>
      <CryptoTable coins={coins} />
    </Container>
  );
}
