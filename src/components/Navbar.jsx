import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  InputBase,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

export default function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#1e1e2f",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo / Title */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: { xs: "1rem", sm: "1.25rem" },
          }}
        >
          Crypto Dashboard
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {[
            { label: "Cryptocurrencies", path: "/" },
            { label: "Exchanges", path: "/" },
            { label: "NFT", path: "/" },
            { label: "Learn", path: "/" },
            { label: "API", path: "/" },
            {
              label: "My Portfolio Website",
              path: "https://www.mohitkumar.in/",
              external: true,
            },
          ].map((item) =>
            item.external ? (
              <Button
                key={item.label}
                component="a"
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "#fff",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                {item.label}
              </Button>
            ) : (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{
                  color: "#fff",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                {item.label}
              </Button>
            )
          )}
        </Box>

        {/* Search */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.15)",
            borderRadius: 1,
            px: 1,
          }}
        >
          <InputBase
            placeholder="Search…"
            sx={{ color: "#fff", ml: 1, flex: 1 }}
          />
          <IconButton type="submit" sx={{ p: "10px", color: "#fff" }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
