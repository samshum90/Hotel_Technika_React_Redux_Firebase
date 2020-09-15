import React from "react";

import landingImage from "./landing.jpg";
import "./landing.css";

const Landing = () => (
  <img
    className="landing"
    src={landingImage}
    alt="Landing page of a Hotel room"
  />
);

export default Landing;
