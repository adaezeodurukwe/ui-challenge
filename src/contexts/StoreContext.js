import React, { createContext, useContext, useEffect, useState } from "react";
export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [books, setbooks] = useState([])
  const [allBooks, setAllbooks] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (searchTerm) {
      const newbooks = allBooks.filter(book => book.title.toLowerCase().includes(searchTerm))
      setbooks(newbooks)
    } else {
      setbooks(allBooks)
    }
  }, [searchTerm])

  const getData = () => {
    fetch('data.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then((response) => response.json())
      .then((json) => {
        setbooks(json.data)
        setAllbooks(json.data)
      });
  }

  // add to cart
  const addItem = (item) => {
    const itemExist = cart.filter(book => book.id === item.id)
    console.log({ itemExist }, item.available_copies);
    if (itemExist[0]) return modifyQuantity(itemExist[0].index, itemExist[0].quantity + 1)
    if (item.available_copies) {
      item.quantity = 1
      item.index = cart.length
      setCart([...cart, item])
    } else {
      alert(`${item.title} is sold out`)
    }
  }

  const modifyQuantity = (index, value) => {
    if (value === 0) return remove(index)
    const cartCopy = [...cart];
    const book = cartCopy[index];
    if (value <= book.available_copies) {
      book.quantity = value;
      setCart(cartCopy);
    } else {
      alert(`${book.title} is sold out`)
    }
  }

  // remove from cart
  const remove = (index) => {
    const cartCopy = [...cart];
    const newBookList = cartCopy.filter((book) => book.index !== index)
    setCart(newBookList);
  }

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
        setOpen
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export const useStoreContextProvider = () => {
  const context = useContext(StoreContext);

  return context;
}

export default StoreContextProvider;