// Import necessary dependencies and functions from React and other libraries
import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import shared from "../utils/shared";

// Define the initial user value
const intialUserValue = {
  email: "",
  firstName: "",
  id: 0,
  lastName: "",
  password: "",
  role: "",
  roleId: 0,
};

// Define the initial state for the authentication context
const initialState = {
  setUser: () => { },
  user: intialUserValue,
  signOut: () => { },
};

// Create the authentication context
const authContext = createContext(initialState);

// Define and export a component called 'AuthWarpper'
export const AuthWarpper = ({ children }) => {
  const [user, _setUser] = useState(intialUserValue);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // useEffect to load user data from localStorage when the component mounts
  useEffect(() => {
    const str = JSON.parse(localStorage.getItem("user")) || intialUserValue;
    if (str.id) {
      _setUser(str);
    }
    if (!str.id) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  // useEffect to handle page access and redirection based on user authentication
  useEffect(() => {
    if (pathname === "/login" && user.id) {
      navigate("/");
    }
    if (!user.id) {
      return;
    }
    const access = shared.hasAccess(pathname, user);
    if (!access) {
      toast.warning("sorry, you are not authorized to access this page");
      navigate("/");
      return;
    }
    // eslint-disable-next-line
  }, [user, pathname]);

  // Function to set the user data in local storage and update the user state
  const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    _setUser(user);
  };

  // Function to handle user sign out
  const signOut = () => {
    setUser(intialUserValue);
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Create the value object to be passed as the value of the authentication context
  const value = {
    user,
    setUser,
    signOut,
  };

  // Provide the authentication context to its children components
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

// Export a custom hook called 'useAuthContext' to consume the authentication context
export const useAuthContext = () => {
  return useContext(authContext);
};
