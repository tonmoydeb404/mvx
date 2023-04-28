import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "../styles/style.css";
import Router from "./Router";
import { store } from "./store";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Router />
      </Provider>
    </BrowserRouter>
  );
};

export default App;
