import React, { useEffect, useState } from "react";
import "./App.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import { FaShoppingCart, FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa"; // More icons
import MainContainer from "./HeroSection/MainContainer";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CartItems from "./CartSection/CartSection";
import CartContainer from "./HeroSection/CartContainer";


function App() {
  const [bakeryItems, setBakeryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCartSection, setShowCartSection] = useState(false);


  const fetchBakeryItems = () => {
    axios
      .get("http://127.0.0.1:8001/bakery/")
      .then((response) => {
        setBakeryItems(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("An error occurred while fetching the data");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBakeryItems();
    const intervalId = setInterval(() => {
      fetchBakeryItems();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <div className="skeleton-loader large"></div>;
  if (error) return <div>{error}</div>;


  const handleAddToCart = (product) => {
    if (product) {
      if (cartItems.findIndex(item => item.id == product.id) == -1) {
        setCartItems(prevItems => [...prevItems, product])
      } else {
        toast.error(<div>Item <b>{product?.item_name}</b> has already been added to the cart</div>)
      }
    }
  }

  console.log('cart items =>', cartItems);


  return (
    <div className="website-container">
      <header className="custom-header">
        <div className="header-content">
          <div className="logo">Our Sweet Bakery</div>
          <nav className="main-nav">
            <a href="#products">Products</a>
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>
            {/* Add more navigation links */}
          </nav>
          <div className="header-actions">
            {/* <button className="search-button">Search</button> */}
            <button className="cart-icon-button"
              onClick={() => setShowCartSection(prevState => !prevState)}>
              <FaShoppingCart className="cart-icon" /> {!showCartSection ? `Cart (${cartItems.length})` : `Go to bakery`}
            </button>
          </div>
        </div>
      </header>

      <div className="background-container">
        {
          showCartSection ? (
            <CartContainer bakeryItems={cartItems} />
          ) :
            (
              <MainContainer bakeryItems={bakeryItems} handleAddToCart={handleAddToCart} />
            )
        }
      </div>

      <footer className="custom-footer">
        <div className="footer-content">
          <div className="footer-section about">
            <h3>About Our Bakery</h3>
            <p>We are passionate about baking delicious, high-quality goods using traditional methods and the finest ingredients. Our goal is to bring joy to your day with every bite.</p>
          </div>
          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <p><FaEnvelope /> info@ourbakery.com</p>
            <p>123 Sweet Street, Bakery Town</p>
          </div>
          <div className="footer-section social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#facebook" className="social-icon"><FaFacebook /></a>
              <a href="#instagram" className="social-icon"><FaInstagram /></a>
              {/* Add more social media icons */}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Our Sweet Bakery. All rights reserved.</p>
        </div>
        <div style={{ padding: 20 }}>
          <ToastContainer draggable limit={3} autoClose={1000} />
        </div>
      </footer>
    </div>
  );
}

export default App;
