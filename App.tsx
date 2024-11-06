import { StatusBar } from "expo-status-bar";
import Router from "./src/routes";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/styledComponents/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        backgroundColor={theme.colors.primary}
        style="light"
        translucent={false}
      />
      <Router />
    </ThemeProvider>
  );
}
