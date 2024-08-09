import NavWithDrawer from "./components/NavWithDrawer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <NavWithDrawer>
        <Outlet />
      </NavWithDrawer>
    </>
  );
}

export default App;
