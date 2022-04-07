import React from 'react'
import SvgComponent from './SvgComponent';

const Sidebar = ({
  increaseItemQuantity,
  decreaseItemQuantity,
  removeItem,
  cartItems,
  setOpen,
  products
}) => {
  return (
    <div className="sidebar">
    <div className="backdrop" onClick={() => setOpen(false)} />
    <div className="drawer">
      <div>
        <button onClick={() => setOpen(false)}>
          <SvgComponent name="back" /> Back
        </button>
      </div>
      <h6>YOUR CART</h6>
      {cartItems[0] ? <div className="cart-items">
        {cartItems.map(product => (
          <div key={product.id} className="cart-item my-2">
            <div className="cart-item-header">
              <span className="cart-item-title">{product.title}</span>
              <button onClick={() => removeItem(product.id)}>
                Remove Item
              </button></div>
            <div className="cart-item-body">
              <div className="button-container">
                <button onClick={() => decreaseItemQuantity(product.quantity, product.id)}>-</button>
                <span>{product.quantity}</span>
                <button onClick={() => increaseItemQuantity(product.id)}>+</button>
              </div>
              <span>{products && products[0] ? products[product.index].price : ""}</span>
              <img width="40" src={product.image_url} alt="product" />
            </div>
          </div>
        ))}
      </div> : <div className="empty-cart">You have no item in your cart</div>}
      
      <div className="total">
       
      </div>
    </div>
  </div>

  )
}

export default Sidebar;