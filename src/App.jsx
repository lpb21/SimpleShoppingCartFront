import { useState, useEffect } from "react";
import axios from 'axios';
import config from './config';
import "./App.css";

import ProductList from "./components/ProductList";
import SearchBar from "./components/Searchbar.jsx";
import ShoppingCart from "./components/ShoppingCart";
import BestCombination from "./components/BestCombination";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  

  useEffect(() => {
    // Obtener los productos
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/products`);
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error('Error: La respuesta de la API no es un array');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);


  useEffect(() => {
    // Obtener el contenido del carrito
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/cart`);
        setCart(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching cart:', error);
        setCart([]);
      }
    };

    fetchCart();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      const response = await axios.post(`${config.apiUrl}/cart`, { id: product.id });
      alert(response.data.message);
      const cartResponse = await axios.get(`${config.apiUrl}/cart`);
      setCart(Array.isArray(cartResponse.data) ? cartResponse.data : []);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await axios.delete(`${config.apiUrl}/cart/${productId}`);
      alert(response.data.message);
      const cartResponse = await axios.get(`${config.apiUrl}/cart`);
      setCart(Array.isArray(cartResponse.data) ? cartResponse.data : []);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <>
      <div className="app-container">
        <div className="main-content">
          <h1>Mi Tienda</h1>
          <SearchBar 
          setSearchTerm={setSearchTerm} 
          />
          <ProductList 
           products={filteredProducts}
           addToCart={handleAddToCart}
          />
          <BestCombination />
        </div>
        <div className="shopping-cart-container">
          <ShoppingCart 
            cartItems={cart} 
            removeFromCart={handleRemoveFromCart}
            setCart={setCart} />
        </div>
        
      </div>
    </>
  );
}

export default App;
