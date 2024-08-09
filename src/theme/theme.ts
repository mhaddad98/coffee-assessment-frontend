import { ThemeOptions } from "@mui/material/styles";
import useThemeStore from "./themeStore";

const lightThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#8d493a",
    },
    secondary: {
      main: "#D0B8A8",
    },
  },
};

const darkThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#D0B8A8",
    },
    secondary: {
      main: "#8D493A",
    },
    mode: "dark",
    text: {
      primary: "#F8EDE3",
    },
  },
};

function useThemeOptions() {
  const store = useThemeStore();
  return store.theme === "dark" ? darkThemeOptions : lightThemeOptions;
}

export default useThemeOptions;
