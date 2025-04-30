import React, { useEffect, useState } from "react";
import "./App.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import { FaShoppingCart, FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa"; // More icons

function App() {
  const [bakeryItems, setBakeryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            <button className="cart-icon-button">
              <FaShoppingCart className="cart-icon" /> Cart (0)
            </button>
          </div>
        </div>
      </header>

      <div className="background-container">
        <Container>
          <div className="content-container">
            <h1>Delicious Bakery Products</h1>
            <h2 className="subheading">Freshly Baked Goods Made with Love</h2>
            <p className="introduction">
              Welcome to our online bakery! We offer a delightful selection of handcrafted breads, pastries, and treats made with the finest ingredients. Browse our fresh items below and satisfy your cravings.
            </p>
            <div className="card-grid">
              {bakeryItems.map((product) => (
                <Card key={product.id} className="product-card">
                  <div className="image-container">
                    <Card.Img
                      variant="top"
                      src={product.item_image}
                      alt={product.item_name}
                      className="product-image"
                    />
                  </div>
                  <Card.Body className="product-info">
                    <Card.Title className="product-name">{product.item_name}</Card.Title>
                    <Card.Text className="product-description">{product.item_description}</Card.Text>
                    <Card.Text className="product-price">
                      ${product.item_price.toFixed(2)}
                    </Card.Text>
                    <Card.Text className="product-expiry">
                      Expires on: {new Date(product.expiry_date).toLocaleDateString()}
                    </Card.Text>
                    <Button className="add-to-cart-button">
                      <FaShoppingCart className="cart-icon" /> Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </Container>
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
      </footer>
    </div>
  );
}

export default App;