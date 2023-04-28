import { Route, Routes } from "react-router-dom";
import AppLayout from "../common/layouts/AppLayout";
import Category from "../pages/Category";
import Details from "../pages/Details";
import Home from "../pages/Home";
import NotFound from "../pages/error/NotFound";

const Router = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/:category">
          <Route index element={<Category />} />
          <Route path=":slug" element={<Details />} />
        </Route>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
