import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#424242",
      Light: "#6d6d6d",
      contrastText: "#ffa000",
    },
    secondary: {
      main: "#ffeb3b",
      contrastText: "#000000",
    },
  },
});

export default theme;
