import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, CircularProgress } from "@mui/material";

export default function Details() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((res) => setCoin(res.data));
  }, [id]);

  if (!coin)
    return <CircularProgress sx={{ display: "block", m: "2rem auto" }} />;

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 3 }}>
        {coin.name}
      </Typography>
      <Typography>Symbol: {coin.symbol.toUpperCase()}</Typography>
      <Typography>
        Current Price: ${coin.market_data.current_price.usd}
      </Typography>
      <Typography>
        Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}
      </Typography>
    </Container>
  );
}
