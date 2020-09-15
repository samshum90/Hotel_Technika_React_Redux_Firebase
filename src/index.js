import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";

import { ThemeProvider } from "@material-ui/styles";

import theme from "./theme";
import store from "./store";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import Firebase, { FirebaseContext } from "./components/Firebase";

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
