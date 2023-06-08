// Import some stuff..
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Searchbar from "./Components/Searchbar";
import { AuthWarpper } from "./context/auth";
import { CartWrapper } from "./context/cart";
import Navigation from "./Navigation";

function App() {
  return (
    <BrowserRouter>
      {/* Wrap the application with the authentication context */}
      <AuthWarpper>
        {/* Wrap the application with the cart context */}
        <CartWrapper>
          {/* Container for displaying toast messages */}
          <ToastContainer />

          {/* Header component */}
          <Header />

          {/* Searchbar component */}
          <Searchbar />

          {/* Component for handling application navigation */}
          <Navigation />

          {/* Footer component */}
          <Footer />
        </CartWrapper>
      </AuthWarpper>
    </BrowserRouter>
  );
}

export default App;
