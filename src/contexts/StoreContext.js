import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const { pathname } = useLocation();
  const [cart, setCart] = useState([]);
  const [books, setbooks] = useState([]);
  const [featuredBooks, setFeaturedbooks] = useState([]);
  const [allBooks, setAllbooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(false);
  const isSearchPage = pathname.includes("search");

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  useEffect(() => {
    if (!searchTerm) {
      setbooks(allBooks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const searchForBook = () => {
    if (searchTerm) {
      const newbooks = allBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.tags.filter((tag) =>
            tag.name.toLowerCase().includes(searchTerm.toLowerCase())
          )[0] ||
          book.authors.filter((author) =>
            author.name.toLowerCase().includes(searchTerm.toLowerCase())
          )[0]
      );
      setbooks(newbooks);
    } else {
      setbooks(allBooks);
    }
  };

  const getTotal = () => {
    let currenttotal = 0;
    cart.forEach((item) => {
      currenttotal += item.price * item.quantity;
    });
    setTotal(currenttotal.toFixed(2));
  };

  const getData = () => {
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setbooks(json.data);
        setAllbooks(json.data);
        setFeaturedbooks(json.data.filter((book) => book.featured === true));
      });
  };

  const addItem = (item) => {
    const itemExist = cart.filter((book) => book.id === item.id);
    if (itemExist[0])
      return modifyQuantity(itemExist[0].index, itemExist[0].quantity + 1);
    if (item.available_copies) {
      item.quantity = 1;
      item.index = cart.length;
      setCart([...cart, item]);
      setOpen(true)
    } else {
      alert(`${item.title} is out of stock`);
    }
  };

  const modifyQuantity = (index, value) => {
    if (value === 0) return remove(index);
    const cartCopy = [...cart];
    const book = cartCopy[index];
    if (value <= book.available_copies) {
      book.quantity = value;
      setCart(cartCopy);
      setOpen(true)
    } else {
      alert(
        `${book.title} has only ${
          book.available_copies - book.quantity
        } copies left`
      );
    }
  };

  const remove = (index) => {
    const cartCopy = [...cart];
    const newBookList = cartCopy.filter((book) => book.index !== index);
    setCart(newBookList);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        setCart,
        addItem,
        modifyQuantity,
        remove,
        getData,
        books,
        searchTerm,
        setSearchTerm,
        open,
        setOpen,
        total,
        allBooks,
        featuredBooks,
        searchForBook,
        isSearchPage,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContextProvider = () => {
  const context = useContext(StoreContext);
  return context;
};

export default StoreContextProvider;
