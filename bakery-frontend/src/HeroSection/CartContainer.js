import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import { FaShoppingCart, FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa"; // More icons


const CartContainer = ({
    bakeryItems
}) => {
    return (
        <Container>
            <div className="content-container">
                <h1>Delicious Bakery Products</h1>
                <h2 className="subheading">Freshly Baked Goods Made with Love</h2>
                <p className="introduction">
                    Here are the cart items
                </p>
                <div className="card-grid">
                    
                </div>
            </div>
        </Container>
    )
}

export default CartContainer;