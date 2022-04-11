import React from "react";
import { useStoreContextProvider } from "../contexts/StoreContext";
import SvgComponent from "./SvgComponent";

const Sidebar = () => {
  const { cart, modifyQuantity, remove, open, setOpen, total } =
    useStoreContextProvider();

  return (
    <div className={`sidebar ${open ? "show" : "hide"}`}>
      <div className="backdrop" onClick={() => setOpen(false)} />
      {open && (
        <div className="drawer">
          <div className="flex justify-between items-center cart-header p-8">
            <button
              className="flex items-center cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <SvgComponent classes="mr-2" name="back" width="18" height="18" />{" "}
              Back
            </button>
            <h5 className="flex items-center">
              <SvgComponent classes="mr-2" name="cart" width="18" height="18" />
              Your Cart
            </h5>
          </div>
          {cart[0] ? (
            <div className="p-8">
              <div className="items">
                {cart.map((book, index) => (
                  <div className="cart-item">
                    <div
                      key={book.id}
                      className="flex md-flex-col justify-between my-2"
                    >
                      <div className="flex">
                        <img width="70" src={book.image_url} alt="product" />
                        <div className="flex flex-col ml-4 justify-between items-start">
                          <span className="flex flex-col">
                            <b>{book.title}</b>
                            {book.authors[0].name}
                          </span>
                          <button onClick={() => remove(index)}>Remove</button>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end md-flex-row md-items-center">
                        <span>${book.price}</span>
                        <div className="controls my-2">
                          <button
                            onClick={() =>
                              modifyQuantity(index, book.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <input
                            onChange={(e) =>
                              modifyQuantity(index, e.target.value)
                            }
                            value={book.quantity}
                          />
                          <button
                            onClick={() =>
                              modifyQuantity(index, book.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                        <b className="mt-2">
                          ${(book.price * book.quantity).toFixed(2)}
                        </b>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="py-4 flex justify-between items-center">
                Subtotal
                <span className="text-xl">${total}</span>
              </div>
              <button className="w-full proceed relative">
                <SvgComponent
                  classes="mr-2 absolute cart"
                  name="cart-white"
                  width="24"
                  height="24"
                />
                Proceed to checkout
              </button>
            </div>
          ) : (
            <div className="p-8">You have no item in your cart</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
