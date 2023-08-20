import { Outlet } from "react-router-dom";
import VideoShowcase from "../../../features/videoShowcase/VideoShowcase";
import ScrollToTop from "../../components/utils/ScrollToTop";
import Navbar from "./Navbar";

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
