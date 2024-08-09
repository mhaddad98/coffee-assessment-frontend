import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Stack } from "@mui/material";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import useThemeStore from "../theme/themeStore";

import AddIcon from "@mui/icons-material/Add";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import BlenderIcon from "@mui/icons-material/Blender";
import CoffeeMakerIcon from "@mui/icons-material/CoffeeMaker";
import CoffeeIcon from "@mui/icons-material/Coffee";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DoneIcon from "@mui/icons-material/Done";
import BlockIcon from "@mui/icons-material/Block";

import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";

const menu = [
  { text: "Boil Water", route: "boilWater" },
  { text: "Grind Beans", route: "grindBeans" },
  { text: "Brew Coffee", route: "brewCoffee" },
  { text: "Serve", route: "serve" },
];
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface Props {
  children: React.ReactNode;
}

export default function MiniDrawer({ children }: Props) {
  const theme = useTheme();
  const themeStore = useThemeStore();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            <Box>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Box>
              <Typography variant="h6" color="inherit" component="div">
                Coffee Assessment
              </Typography>
            </Box>
            <Box>
              <IconButton
                sx={{ ml: 1 }}
                onClick={themeStore.toggle}
                color="inherit"
              >
                {themeStore.theme === "dark" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            </Box>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => navigate("/")}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Dashboard"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => navigate("/newOrder")}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AddIcon />
              </ListItemIcon>
              <ListItemText
                primary={"New Order"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
            <Divider />
          </ListItem>
          <ListItem>
            <PlayArrowIcon color="success" sx={{ ml: "2px" }} />
            <Typography
              variant="h6"
              color={"green"}
              ml={2}
              sx={{ opacity: open ? 1 : 0 }}
            >
              Started
            </Typography>
          </ListItem>
          {menu.map((item, index) => (
            <ListItem disablePadding sx={{ display: "block" }} key={index}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => navigate(`started/${item.route}`)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.route === "boilWater" ? (
                    <WaterDropIcon />
                  ) : item.route === "grindBeans" ? (
                    <BlenderIcon />
                  ) : item.route === "brewCoffee" ? (
                    <CoffeeMakerIcon />
                  ) : (
                    <CoffeeIcon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider />
          <ListItem>
            <DoneIcon color="info" sx={{ ml: "2px" }} />
            <Typography
              variant="h6"
              color={"blue"}
              ml={2}
              sx={{ opacity: open ? 1 : 0 }}
            >
              Finished
            </Typography>
          </ListItem>
          {menu.map((item, index) => (
            <ListItem disablePadding sx={{ display: "block" }} key={index}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => navigate(`finished/${item.route}`)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.route === "boilWater" ? (
                    <WaterDropIcon />
                  ) : item.route === "grindBeans" ? (
                    <BlenderIcon />
                  ) : item.route === "brewCoffee" ? (
                    <CoffeeMakerIcon />
                  ) : (
                    <CoffeeIcon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider />
          <ListItem>
            <BlockIcon color="error" sx={{ ml: "2px" }} />
            <Typography
              variant="h6"
              color={"red"}
              ml={2}
              sx={{ opacity: open ? 1 : 0 }}
            >
              Failed
            </Typography>
          </ListItem>
          {menu.map((item, index) => (
            <ListItem disablePadding sx={{ display: "block" }} key={index}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => navigate(`Failed/${item.route}`)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.route === "boilWater" ? (
                    <WaterDropIcon />
                  ) : item.route === "grindBeans" ? (
                    <BlenderIcon />
                  ) : item.route === "brewCoffee" ? (
                    <CoffeeMakerIcon />
                  ) : (
                    <CoffeeIcon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider />
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
