import { createTheme } from "@mui/material"; 
import { green, teal, blue, cyan, lightBlue, deepOrange } from "@mui/material/colors";

const theme = createTheme ({
    palette: {
        primary: {
          main: lightBlue[600],
        },
        secondary: {
          main: deepOrange[200],
        },
      },
});

export default theme;