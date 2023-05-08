import { Outlet } from "react-router-dom";
import VideoShowcase from "../../features/videoShowcase/VideoShowcase";
import Navbar from "../components/layout/Navbar";
import ScrollToTop from "../components/utils/ScrollToTop";

const AppLayout = () => {
  return (
    <>
      <ScrollToTop>
        <Navbar />
        <Outlet />
      </ScrollToTop>
      <VideoShowcase />
    </>
  );
};

export default AppLayout;
