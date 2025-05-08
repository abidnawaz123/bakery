import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import { FaShoppingCart, FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa"; // More icons


const MainContainer = ({
    bakeryItems,
    handleAddToCart
}) => {
    return (
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
                                <Button
                                    onClick={() => handleAddToCart(product)}
                                    className="add-to-cart-button">
                                    <FaShoppingCart className="cart-icon"
                                    />
                                    Add to Cart
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
        </Container>
    )
}

export default MainContainer;