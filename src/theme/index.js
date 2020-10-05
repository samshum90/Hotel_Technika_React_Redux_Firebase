import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#424242",
      light: "#6d6d6d",
      dark: "#1b1b1b",
      contrastText: "#ffa000",
    },
    secondary: {
      main: "#ffeb3b",
      contrastText: "#000000",
    },
    background: {
      paper: "#fff",
      default: "#e1e2e1",
      grid: "#F5F5F6",
    },
  },
});

export default theme;
