import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid2";
import RefreshIcon from "@mui/icons-material/Refresh";
import Tooltip from "@mui/material/Tooltip";
export interface HeaderProps {
  refresh: () => void;
}
const Header = ({ refresh }: HeaderProps) => {
  return (
    <Grid container spacing={2}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Link href="https://www.puretrace.com/" color="inherit">
              <img
                src={"puretrace-solutions-logo.svg"}
                style={{ height: "32px" }}
              />
            </Link>
            <Typography
              pl={4}
              variant="subtitle1"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <Tooltip title="Refresh">
              <IconButton
                onClick={() => {
                  refresh();
                }}
                color="inherit"
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box>
    </Grid>
  );
};

export default Header;
