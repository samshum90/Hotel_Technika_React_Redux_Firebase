import React from "react";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import "./Navigation.css";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import * as ROUTES from "../../constants/routes";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "15px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    "text-decoration": "none",
    color: theme.palette.primary.contrastText,
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
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
          <Link to={ROUTES.HOME} className={classes.link}>
            Hotel Technika
          </Link>
        </Typography>
        <Navigation />
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
