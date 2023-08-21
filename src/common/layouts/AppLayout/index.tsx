import { Outlet } from "react-router-dom";
import VideoShowcase from "../../../features/videoShowcase/VideoShowcase";
import ScrollToTop from "../../components/utils/ScrollToTop";
import BottomNavbar from "./BottomNavbar";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <>
      <ScrollToTop>
        <Navbar />
        <Outlet />
        <BottomNavbar />
      </ScrollToTop>
      <VideoShowcase />
    </>
  );
};

export default AppLayout;
