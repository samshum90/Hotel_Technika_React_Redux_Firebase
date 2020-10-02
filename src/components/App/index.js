import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "../Navigation";
import Landing from "../Landing";
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import PasswordForget from "../PasswordForget";
import Home from "../Home";
import Register from "../Register";
import Bookings from "../Booking";
import Activities from "../Activities";
import Staff from "../Home";
import Account from "../Account";
import Admin from "../Admin";
import Room from "../Rooms";
import Guests from "../Guests";
import CreateBooking from "../Booking/CreateBooking";

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";

const App = () => (
  <Router>
    <Navbar />

    <Route exact path={ROUTES.LANDING} component={Landing} />
    <Route path={ROUTES.SIGN_UP} component={SignUp} />
    <Route path={ROUTES.SIGN_IN} component={SignIn} />
    <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
    <Route path={ROUTES.HOME} component={Home} />
    <Route path={ROUTES.REGISTER} component={Register} />
    <Route exact path={ROUTES.BOOKINGS} component={Bookings} />
    <Route exact path={ROUTES.CREATE_BOOKING} component={CreateBooking} />
    <Route path={ROUTES.ACTIVITIES} component={Activities} />
    <Route path={ROUTES.STAFF} component={Staff} />
    <Route path={ROUTES.ROOM} component={Room} />
    <Route path={ROUTES.ACCOUNT} component={Account} />
    <Route path={ROUTES.ADMIN} component={Admin} />
    <Route path={ROUTES.GUESTS} component={Guests} />
  </Router>
);

export default withAuthentication(App);
