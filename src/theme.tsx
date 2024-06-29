import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
	palette: {
		primary: {
			main: "#000",
		},
		secondary: {
			main: "#f2f2f2",
		},
		error: {
			main: red.A400,
		},
	},
});

export default theme;
