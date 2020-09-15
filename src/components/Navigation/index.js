import React from "react";
import Navigation from "./Navigation";

import { useTheme, makeStyles } from "@material-ui/core/styles";
import "./Navigation.css";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={theme}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            Hotel Technika
          </Typography>
          <Navigation />
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Navbar;
