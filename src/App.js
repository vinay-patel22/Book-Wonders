import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./Components/Footer";
import Header from "./Components/Header";

import Searchbar from "./Components/Searchbar";
import store from "./State/store";
import Navigation from "./Navigation";
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer />
        <Header />
        <Searchbar />

        <Navigation/>
        <Footer />
      </Provider>
    </BrowserRouter>
  );
}

export default App;