import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#455a64",
      contrastText: "#ffa000",
    },
    secondary: {
      main: "#ffeb3b",
      // contrastText: "#000000",
    },
  },
});

export default theme;
