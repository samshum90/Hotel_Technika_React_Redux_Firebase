import React from "react";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import "./Navigation.css";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Hidden,
  SwipeableDrawer,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import NavigationList from "./NavigationList";
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

function Navbar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          <Link to={ROUTES.HOME} className={classes.link}>
            Hotel Technika
          </Link>
        </Typography>
        <Hidden smDown>
          <Navigation />
        </Hidden>
        <Hidden mdUp>
          <IconButton
            edge="end"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <SwipeableDrawer
          anchor={"right"}
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
        >
          <NavigationList setOpen={setOpen} />
        </SwipeableDrawer>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
