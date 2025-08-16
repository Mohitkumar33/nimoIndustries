import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  TablePagination,
  Box,
} from "@mui/material";
import CryptoTable from "../components/CryptoTable";
import { getMarketData } from "../api/allApis"; // ✅ API function

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0); // MUI uses zero-based index
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCoins, setTotalCoins] = useState(250); // approximate max (CoinGecko supports up to 250)

  const fetchCoins = async () => {
    try {
      setLoading(true);
      const data = await getMarketData(page + 1, rowsPerPage); // API uses 1-based index
      setCoins(data);
    } catch (err) {
      setError("Failed to fetch cryptocurrency data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // reset to first page
  };

  if (loading)
    return <CircularProgress sx={{ display: "block", margin: "2rem auto" }} />;

  if (error)
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 4 }}>
        {error}
      </Typography>
    );

  return (
    // <Container sx={{ mt: 4 }}>
    <Box sx={{ mt: 4, px: 20 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
        Top Cryptocurrencies
      </Typography>
      <CryptoTable coins={coins} />
      <TablePagination
        component="div"
        count={totalCoins} // total coins (use approximate or fetch total from API if needed)
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 25, 50, 100]}
        sx={{ mt: 2 }}
      />
    </Box>
    // </Container>
  );
}
