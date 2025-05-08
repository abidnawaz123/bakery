import React from 'react'
import { Row, Col, Image, Badge } from 'react-bootstrap'

const CartItems = ({ items }) => {
    return (
        <div className="d-flex flex-column gap-3">
            {items.map((item) => (
                <Row key={item.id} className="align-items-center p-3 border rounded shadow-sm bg-white">
                    <Col xs={3} md={2}>
                        <Image
                            src={item.item_image}
                            alt={item.item_name}
                            fluid
                            rounded
                            style={{ maxHeight: '80px', objectFit: 'cover' }}
                        />
                    </Col>
                    <Col xs={9} md={4}>
                        <h5 className="mb-1">{item.item_name}</h5>
                        <small className="text-muted">{item.item_desciption}</small>
                    </Col>
                    <Col xs={6} md={3}>
                        <span className="fw-bold text-success">${item.item_price}</span>
                    </Col>
                    <Col xs={6} md={3} className="text-md-end">
                        <Badge bg="warning" text="dark">
                            Exp: {new Date(item.expiry_date).toLocaleDateString()}
                        </Badge>
                    </Col>
                </Row>
            ))}
        </div>
    )
}

export default CartItems
