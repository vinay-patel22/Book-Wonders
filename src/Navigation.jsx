import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/auth";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import UpdateProfile from "./Pages/UpdateProfile";
import Register from "./Pages/Register";
import Book from "./Pages/Book/Book";
import AddBook from "./Pages/Book/AddBook";
import EditUser from "./Pages/User/EditUser";
import User from "./Pages/User/User";
import Categories from "./Pages/Categories/Categories";
import AddCategories from "./Pages/Categories/AddCategories";
import Cart from "./Pages/Cart";

function Navigation() {
  // Access the authentication context
  const authContext = useAuthContext();

  // Redirect component to the login page
  const Redirect = <Navigate to={"/login"} />;

  return (
    <Routes>
      {/* Route for the home page */}
      <Route path="/" element={authContext.user.id ? <Home /> : Redirect} />

      {/* Route for the login page */}
      <Route path="/login" element={<Login />} />

      {/* Route for the registration page */}
      <Route
        path="/register"
        element={!authContext.user.id ? <Register /> : Redirect}
      />

      {/* Route for the update profile page */}
      <Route
        path="/update-profile"
        element={authContext.user.id ? <UpdateProfile /> : Redirect}
      />

      {/* Route for the user page */}
      <Route path="/user" element={authContext.user.id ? <User /> : Redirect} />

      {/* Route for editing user profile */}
      <Route
        path="/edit-user/:id"
        element={authContext.user.id ? <EditUser /> : Redirect}
      />

      {/* Route for the categories page */}
      <Route
        path="/categories"
        element={authContext.user.id ? <Categories /> : Redirect}
      />

      {/* Route for adding a new category */}
      <Route
        path="/add-category"
        element={authContext.user.id ? <AddCategories /> : Redirect}
      />

      {/* Route for editing a category */}
      <Route
        path="/add-category/:id"
        element={authContext.user.id ? <AddCategories /> : Redirect}
      />

      {/* Route for the book page */}
      <Route path="/book" element={authContext.user.id ? <Book /> : Redirect} />

      {/* Route for adding a new book */}
      <Route
        path="/add-book"
        element={authContext.user.id ? <AddBook /> : Redirect}
      />

      {/* Route for editing a book */}
      <Route
        path="/add-book/:id"
        element={authContext.user.id ? <AddBook /> : Redirect}
      />

      {/* Route for the cart page */}
      <Route
        path="/cart-page"
        element={authContext.user.id ? <Cart /> : Redirect}
      />
    </Routes>
  );
}

export default Navigation;
