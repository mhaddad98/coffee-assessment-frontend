import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, ThemeProvider } from "@mui/material";
import useThemeOptions from "./theme/theme.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NewOrder from "./components/NewOrder.tsx";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./components/Dashboard.tsx";
import Page from "./components/Page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "newOrder",
        element: <NewOrder />,
      },
      {
        path: "started",
        children: [
          {
            path: "boilWater",
            element: <Page service="boilWater" status="started" />,
          },
          {
            path: "grindBeans",
            element: <Page service="grindBeans" status="started" />,
          },
          {
            path: "brewCoffee",
            element: <Page service="brewCoffee" status="started" />,
          },
          {
            path: "serve",
            element: <Page service="serve" status="started" />,
          },
        ],
      },
      {
        path: "finished",
        children: [
          {
            path: "newOrder",
            element: <NewOrder />,
          },
          {
            path: "boilWater",
            element: <Page service="boilWater" status="finished" />,
          },
          {
            path: "grindBeans",
            element: <Page service="grindBeans" status="finished" />,
          },
          {
            path: "brewCoffee",
            element: <Page service="brewCoffee" status="finished" />,
          },
          {
            path: "serve",
            element: <Page service="serve" status="finished" />,
          },
        ],
      },
      {
        path: "failed",
        children: [
          {
            path: "newOrder",
            element: <NewOrder />,
          },
          {
            path: "boilWater",
            element: <Page service="boilWater" status="failed" />,
          },
          {
            path: "grindBeans",
            element: <Page service="grindBeans" status="failed" />,
          },
          {
            path: "brewCoffee",
            element: <Page service="brewCoffee" status="failed" />,
          },
          {
            path: "serve",
            element: <Page service="serve" status="failed" />,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

function Root() {
  const themeOptions = useThemeOptions();
  const theme = createTheme(themeOptions);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
