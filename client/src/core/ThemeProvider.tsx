import { createTheme, ThemeProvider } from "@mui/material/styles";

import { pureTraceLabsColors } from "./../hooks/transform_data";

const theme = createTheme({
  palette: {
    primary: {
      main: pureTraceLabsColors[0],
    },
  },
});

export default theme;
