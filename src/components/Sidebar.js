import React from 'react'
import { useStoreContextProvider } from '../contexts/StoreContext';
import SvgComponent from './SvgComponent';

const Sidebar = () => {
  const { cart, modifyQuantity, remove,  open, setOpen, } = useStoreContextProvider()

  return (
    <div className={`sidebar ${open ? "show" : "hide"}`}>
      <div className="backdrop" onClick={() => setOpen(false)} />
      {open && <div className="drawer">
        <button className="flex items-center cursor-pointer" onClick={() => setOpen(false)}>
          <SvgComponent classes="mr-2" name="back" width="18" height="18" /> Back
        </button>
        <h6>YOUR CART</h6>
        {cart[0] ? <div className="cart-items">
          {cart.map((book, index) => (
            <div key={book.id} className="flex justify-between my-2">
              <div className="flex">
                <img width="40" src={book.image_url} alt="product" />
                <div className="flex flex-col">
                  <span className="">{book.title}</span>
                  <button onClick={() => remove(index)}>
                    Remove
                  </button>
                </div>
              </div>
              <div className="flex flex-col">
                <span>${book.price}</span>
                <div className="">
                  <button onClick={() => modifyQuantity(index, book.quantity - 1)}>-</button>
                  <input onChange={(e) => modifyQuantity(index, e.target.value)} value={book.quantity} />
                  <button onClick={() => modifyQuantity(index, book.quantity + 1)}>+</button>
                </div>
                <span>${book.price * book.quantity}</span>
              </div>
            </div>
          ))}
        </div> : <div className="empty-cart">You have no item in your cart</div>}

        <div className="total">

        </div>
      </div>
      }
    </div>

  )
}

export default Sidebar;