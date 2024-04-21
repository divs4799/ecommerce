
import React, { useState,useEffect } from 'react';
import '../App.css'; // Import the CSS file
import CartPage from './CartPage'; // Import the CartPage component
import { useNavigate } from "react-router-dom";
import  axios  from 'axios';


var products=[];

const ProductCard = ({ product, onAddToCart, onToggleFavorite }) => {
    const { id, title, description, price, imageUrl } = product;
    const [quantity, setQuantity] = useState(1); // Initialize quantity state
  
    const handleQuantityChange = (e) => {
      setQuantity(parseInt(e.target.value)); // Update quantity state
    };
  
    const handleAddToCart = () => {
      // Call onAddToCart function with the selected quantity
      onAddToCart({ ...product, quantity });
    };
  
    return (
      <div className="product-card">
        <img src={imageUrl} alt={title} />
        <div className="product-details">
          <h3>{title}</h3>
          <p>{description}</p>
          <p>Rs {price}</p>
          <div className="quantity-selector">
            <label htmlFor={`quantity-${id}`}>Quantity:</label>
            <select id={`quantity-${id}`} value={quantity} onChange={handleQuantityChange}>
              {[0, 1, 2, 3, 4, 5].map((val) => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
          </div>
          <button onClick={() => onToggleFavorite(product)}>Favorite</button>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    );
  };

const Main = () => {
  const [cart, setCart] = useState([]);
  const[products,setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const navigate = useNavigate()
  
  const addToCart = (product) => {
      setCart([...cart, product]);
      console.log(cart);
  };

  const toggleFavorite = (product) => {
    if (favorites.some(fav => fav.id === product.id)) {
      setFavorites(favorites.filter((p) => p.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const purchaseProduct = (product) => {
    const newPurchase = {
      productName: product.title,
      quantity: 1,
      price: product.price
    };
    setPurchases([...purchases, newPurchase]);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const switchToCart=()=>{
    navigate("/cart",{state:{cart:cart}});
  }

useEffect(()=>{
    axios.get("http://localhost:5000/getProducts").then(result=>{
        console.log(result.data.data);
        setProducts(result.data.data.products)
    })
    axios.get("http://localhost:5000/getCart").then(result=>{
        console.log(result.data.data);
        setCart(result.data.data)
    })
},[])


  return (
    
    <div className="app">
        {console.log("Prods : ",products)}
      <header className="header">
        <h1>My Store</h1>
        <div className="left-div">
        <button onClick={() => setShowFavorites(!showFavorites)}>Favorites ({favorites.length})</button>
        <button onClick={switchToCart}>Cart ({cart.length})</button>

        </div>
      </header>
        <div className={`main-container ${showFavorites?'active':''}`}>

        
      <div className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
            onToggleFavorite={toggleFavorite}
            onPurchase={purchaseProduct}
          />
        ))}
      </div>
      <div className={`favorites-panel ${showFavorites ? 'active' : ''}`}>
      <button className="close-button" onClick={() => setShowFavorites(false)}>Close</button>
          <h2>Favorites</h2>
          <ul>
            {favorites.map((favorite) => (
              <li key={favorite.id}>
                <span>{favorite.title}</span>
                <button onClick={() => toggleFavorite(favorite)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
        </div>
    </div>
  );
};

export default Main;
