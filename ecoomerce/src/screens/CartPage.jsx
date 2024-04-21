
import React, { useState,useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from "axios";

const CartPage = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState(state.cart); // Initialize quantity for each item
  console.log(cart);
  const updateQuantity = (id, quantity) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: parseInt(quantity) };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  useEffect(()=>{
    axios.post("http://localhost:5000/saveCart",{cart:cart}).then((result)=>{
      console.log("message",result.data.message);
    })
  },[cart])

  const handleCheckOut=()=>{
    console.log("checkout")
    alert(`Your Order has been placed with the total amount of ${calculateTotalPrice()}`);
    navigate("/");
  }

  return (
    <div className="cart-page">
      <header className="header">
        <h1>My Store</h1>
      </header>
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? <h1>You have no Items in the cart</h1> : null}
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="cart-card">
              <img className="cart-img" src={item.imageUrl} alt={item.title} />
              <div className="cart-content">
                <span className="title">{item.title}</span>
                <span className="paragraph">
                  Quantity:
                  <select value={item.quantity} onChange={(e) => updateQuantity(item.id, e.target.value)}>
                    {[1, 2, 3, 4, 5].map((val) => (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                </span>
                <span className="paragraph">Price: Rs {item.price}</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="cart-total">Total: Rs {calculateTotalPrice()}</p>
        <button className="checkout-btn" onClick={handleCheckOut}>Check Out</button>
      </div>

      
    </div>
  );
};

export default CartPage;
