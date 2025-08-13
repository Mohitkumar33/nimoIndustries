import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ color: "#fff", textDecoration: "none" }}
        >
          Crypto Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
