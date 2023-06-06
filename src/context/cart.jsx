// Import necessary dependencies and functions from React and other files
import React, { createContext, useContext, useEffect, useState } from "react";
import cartService from "../service/cart.service";
import { useAuthContext } from "./auth";

// Define the initial value for the cart context
const initialCartDetails = {
  cartData: [],
  updateCart: () => { },
  emptyCart: () => { },
};

// Create the cart context
const cartContext = createContext(initialCartDetails);

// Define and export a component called 'CartWrapper'
export const CartWrapper = ({ children }) => {
  const authContext = useAuthContext();
  const [cartData, setCartData] = useState([]);

  // Function to empty the cart data
  const emptyCart = () => {
    setCartData([]);
  };

  // Function to update the cart data
  const updateCart = (updatedCartList) => {
    if (updatedCartList) {
      setCartData(updatedCartList);
    } else if (authContext.user.id) {
      // Call the cart service to get the updated cart data based on the authenticated user
      cartService.getList(authContext.user.id).then((res) => setCartData(res));
    }
  };

  // useEffect to update the cart data when the authenticated user changes
  useEffect(() => {
    updateCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.user.id]);

  // Create the value object to be passed as the value of the cart context
  const value = {
    cartData,
    emptyCart,
    updateCart,
  };

  // Provide the cart context to its children components
  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};

// Export a custom hook called 'useCartContext' to consume the cart context
export const useCartContext = () => {
  return useContext(cartContext);
};
