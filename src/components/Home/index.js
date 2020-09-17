import React from "react";
import { compose } from "recompose";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";

import register from "./register.jpg";
import booking from "./booking.jpg";
import activities from "./activities.jpg";
import staff from "./staff.jpg";
import { withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";

import * as ROUTES from "../../constants/routes";

const images = [
  {
    url: register,
    title: "Register",
    width: "31%",
    link: ROUTES.REGISTER,
  },
  {
    url: booking,
    title: "Bookings",
    width: "31%",
    link: ROUTES.BOOKINGS,
  },
  {
    url: activities,
    title: "Activities",
    width: "31%",
    link: ROUTES.ACTIVITIES,
  },
  {
    url: staff,
    title: "Staff",
    width: "31%",
    link: ROUTES.STAFF,
  },
  {
    url: "",
    title: "Admin",
    width: "31%",
    link: ROUTES.ADMIN,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "100%",
    justifyContent: "center",
  },
  image: {
    position: "relative",
    height: 200,
    margin: 5,
    [theme.breakpoints.down("xs")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &$focusVisible": {
      zIndex: 1,
      "& $imageBackdrop": {
        opacity: 0.15,
      },
      "& $imageMarked": {
        opacity: 0,
      },
      "& $imageTitle": {
        border: "4px solid currentColor",
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span
        style={{
          backgroundImage: "./register.jpg",
        }}
      />
      {images.map((image) => (
        <ButtonBase
          focusRipple
          key={image.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: image.width,
          }}
        >
          <Link to={image.link}>
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
              </Typography>
            </span>
          </Link>
        </ButtonBase>
      ))}
    </div>
  );
};

const condition = (authUser) => !!authUser;

export default compose(withFirebase, withAuthorization(condition))(Home);
