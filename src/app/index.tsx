import "react-lazy-load-image-component/src/effects/blur.css";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "../styles/style.css";
import { router } from "./router";
import { store } from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
