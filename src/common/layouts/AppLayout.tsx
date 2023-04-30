import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import ScrollToTop from "../components/utils/ScrollToTop";

const AppLayout = () => {
  return (
    <ScrollToTop>
      <Navbar />
      <Outlet />
    </ScrollToTop>
  );
};

export default AppLayout;
