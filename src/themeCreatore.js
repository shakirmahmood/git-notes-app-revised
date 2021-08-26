import { createTheme } from "@material-ui/core/styles";
const customTheme = createTheme({
  palette: {
    primary: {
      light: "#def5ec",
      main: "#5acba1",
      dark: "darkgray",
      contrastText: "#fff",
      medium: "lightgray",
      links: "#1a7eff",
    },
    secondary: {
      light: "#ff7961",
      main: "#1a7eff",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

export default customTheme;
