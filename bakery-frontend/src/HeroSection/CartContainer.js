import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import { FaShoppingCart, FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa"; // More icons
import CartItems from "../CartSection/CartSection";


const CartContainer = ({
    bakeryItems
}) => {
    return (
        <Container>
            <div className="content-container">
                <h1>Delicious Bakery Products</h1>
                <h2 className="subheading">Freshly Baked Goods Made with Love</h2>
                {
                    !bakeryItems || bakeryItems.length === 0 && (
                        <p className="text-muted">
                            Your Cart is Empty
                        </p>
                    )
                }

                <div className="card-grid">
                    <CartItems items={bakeryItems} />

                </div>
            </div>
        </Container>
    )
}

export default CartContainer;