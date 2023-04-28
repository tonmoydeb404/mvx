import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default AppLayout;
