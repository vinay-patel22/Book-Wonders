import { Button, List, ListItem, TextField } from "@mui/material";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/auth";
import { useCartContext } from "../context/cart";
import bookService from "../service/book.service";
import shared from "../utils/shared";

export default function Searchbar() {
  // State variables
  const [query, setQuery] = useState("");
  const [bookList, setBookList] = useState([]);
  const [openSearchResult, setOpenSearchResult] = useState(false);

  // Function to search for books
  const searchBook = async () => {
    const res = await bookService.searchBook(query);
    setBookList(res);
  };

  // Function to perform the search
  const search = () => {
    searchBook();
    setOpenSearchResult(true);
  };

  // Hook to navigate to different routes
  const navigate = useNavigate();
  
  // Access the authentication context
  const authContext = useAuthContext();
  
  // Access the cart context
  const cartContext = useCartContext();

  // Function to add a book to the cart
  const addToCart = (book) => {
    if (!authContext.user.id) {
      navigate("/login");
      toast.error("Please login before adding books to cart");
    } else {
      shared
        .addToCart(book, authContext.user.id)
        .then((res) => {
          if (res.error) {
            toast.error(res.error);
          } else {
            toast.success("Item added in cart");
            cartContext.updateCart();
          }
        })
        .catch((err) => {
          toast.warning(err);
        });
    }
  };

  // Render the search bar component
  return (
    <div className="flex bg-[#514ef5] h-20 items-center justify-center space-x-3 ">
      <div style={{ position: "relative" }}>
        {/* Text input for search */}
        <TextField
          hiddenLabel
          label="What are you Looking for..."
          type={"text"}
          value={query}
          variant="outlined"
          size="small"
          sx={{
            width: "550px",
            backgroundColor: "white",
            fontStyle: "italic",
            "& .MuiInputBase-input": {
              fontStyle: "normal",
            },
          }}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />

        {openSearchResult && (
          <div
            className="bg-white w-[550px] shadow-lg absolute"
            style={{
              background: "white",
              zIndex: "9",
              borderRadius: "4px",
              padding: "15px",
            }}
          >
            {/* Display search results */}
            {bookList?.length === 0 && <p>No Product Found</p>}
            <List>
              {bookList?.length > 0 &&
                bookList.map((item, index) => (
                  <ListItem className="flex-1 " key={index}>
                    <div className="flex  w-full ">
                      <div className="flex-1 ">
                        <p className="font-semibold">{item.name}</p>
                        <p className=" line-clamp-1">{item.description}</p>
                      </div>
                      <div className=" text-right ml-4">
                        <p>{item.price}</p>
                        {/* Button to add book to cart */}
                        <Button
                          sx={{
                            color: "#f14d54",
                            textTransform: "capitalize",
                          }}
                          onClick={() => addToCart(item)}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </ListItem>
                ))}
            </List>
          </div>
        )}
      </div>

      {/* Button to initiate the search */}
      <Button
        variant="contained"
        startIcon={<AiOutlineSearch />}
        sx={{
          color: "white",
          backgroundColor: "#10fc08",
          "&:hover": {
            backgroundColor: "#10fc08",
          },
          textTransform: "capitalize",
        }}
        onClick={search}
      >
        Search
      </Button>

      {/* Button to cancel the search */}
      <Button
        variant="contained"
        sx={{
          color: "white",
          backgroundColor: "#fa1115",
          "&:hover": {
            backgroundColor: "#fa1115",
          },
          textTransform: "capitalize",
        }}
        onClick={() => {
          setOpenSearchResult(false);
          setQuery("");
        }}
      >
        Cancel
      </Button>
    </div>
  );
}
