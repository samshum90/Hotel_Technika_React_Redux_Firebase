import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import store from "./store";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import Firebase, { FirebaseContext } from "./components/Firebase";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#455a64",
      contrastText: "#ffeb3b",
    },
    secondary: {
      main: "#ffeb3b",
      contrastText: "#000000",
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
