import { Button, Divider } from "@mui/material";
import React, { useMemo } from "react";
import logo from "../assets/logo.jpg";
import { HiShoppingCart } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import shared from "../utils/shared";

import { useAuthContext } from "../context/auth";
import { useCartContext } from "../context/cart";

const Header = () => {
  // Hook to navigate to different routes
  const navigate = useNavigate();
  
  // Access the authentication context
  const authContext = useAuthContext();
  
  // Access the cart context
  const cartContext = useCartContext();
  
  // Function to handle user logout
  const logOut = () => {
    authContext.signOut();
  };
  
  // Compute the filtered items based on user role using useMemo to memoize the result
  const items = useMemo(() => {
    return shared.NavigationItems.filter(
      (item) =>
        !item.access.length || item.access.includes(authContext.user.roleId)
    );
  }, [authContext.user]);

  // Render the header component
  return (
    <>
      <div className="flex justify-between items-center">
        {/* Render the logo */}
        <img src={logo} alt="TatvaSoft_Logo" className="h-24 ml-40 w-44" />
        <div className="mr-40  space-x-1 flex">
          {/* Render login and register buttons if the user is not logged in */}
          {!authContext.user.id && (
            <>
              <Button
                variant="text"
                sx={{
                  color: "#bf0cf0",
                  textTransform: "capitalize",
                }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ backgroundColor: "#bf0cf0" }}
              />
              <Button
                variant="text"
                sx={{ color: "#bf0cf0", textTransform: "capitalize" }}
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </Button>
            </>
          )}
          
          {/* Render navigation buttons based on the user's role */}
          {items.map((item, index) => (
            <>
              <Button
                key={index}
                variant="text"
                sx={{
                  color: "#bf0cf0",
                  textTransform: "capitalize",
                }}
                onClick={() => {
                  navigate(item.route);
                }}
              >
                {item.name}
              </Button>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ backgroundColor: "#bf0cf0" }}
              />
            </>
          ))}
          
          {/* Render the shopping cart button */}
          <Button
            variant="outlined"
            sx={{
              color: "#bf0cf0",
              borderColor: "#bf0cf0",
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
            startIcon={<HiShoppingCart />}
            onClick={() => {
              navigate("/cart-page");
            }}
          >
            {cartContext.cartData.length}
            <span
              style={{
                color: "black",
                marginLeft: "4px",
                fontWeight: "normal",
              }}
            >
              cart
            </span>
          </Button>
          
          {/* Render the logout button if the user is logged in */}
          {!!authContext.user.id ? (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#bf0cf0",
                "&:hover": {
                  backgroundColor: "#bf0cf0", // Change the hover background color
                },
                textTransform: "capitalize",
              }}
              onClick={() => {
                logOut();
              }}
            >
              LogOut
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Header;
