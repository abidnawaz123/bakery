import React, { useEffect, useState } from "react";
import "./App.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";

function App() {
  // State to hold the data from the API
  const [bakeryItems, setBakeryItems] = useState([]);
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for error handling
  const [error, setError] = useState(null);

  // Fetch bakery items from the API
  const fetchBakeryItems = () => {
    axios
      .get("http://127.0.0.1:8000/bakery/")
      .then((response) => {
        setBakeryItems(response.data); // Set the data to state
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        setError("An error occurred while fetching the data"); // Set error if request fails
        setLoading(false); // Set loading to false if there is an error
      });
  };

  // Poll the API every minute to check for updated data
  useEffect(() => {
    fetchBakeryItems(); // Initial fetch
    const intervalId = setInterval(() => {
      fetchBakeryItems(); // Fetch bakery items every minute
    }, 5000); // 60 seconds

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const convertintoHumanReadableTime = (dateStr) => {

    const date = new Date(dateStr);

    // Options to format the date in a human-readable way
    const options = {
      weekday: "long", // e.g. "Monday"
      year: "numeric", // e.g. "2024"
      month: "long", // e.g. "December"
      day: "numeric", // e.g. "21"
      hour: "2-digit", // e.g. "04"
      minute: "2-digit", // e.g. "15"
      // second: "2-digit",
    };

    // Format the date
    const humanReadableDate = date.toLocaleString("en-US", options);

    return humanReadableDate;
  };

  return (
    <div>
      <Container>
        <h1 className="text-center my-4">Bakery Products</h1>
        <Row>
          {bakeryItems.map((product) => (
            <Col
              key={product.id}
              md={3}
              className="d-flex justify-content-center mb-4"
            >
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={`${product.item_image}`}
                  alt={product.item_name}
                  height={200}
                />
                <Card.Body>
                  <Card.Title>{product.item_name}</Card.Title>
                  <Card.Text>{product.item_description}</Card.Text>
                  <Card.Text>
                    <strong>{`$${product.item_price.toFixed(2)}`}</strong>
                  </Card.Text>
                  <Card.Text>
                    <strong>Expires on: </strong>
                    <p>{convertintoHumanReadableTime(product.expiry_date)}</p>
                  </Card.Text>

                  <Button variant="primary">Add to Cart</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
