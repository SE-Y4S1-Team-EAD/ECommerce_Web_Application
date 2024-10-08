import React, { useState, useEffect } from "react";
import {
    Table,
    Container,
    Row,
    Col,
    Card,
    Spinner,
    Alert,
    Button,
} from "react-bootstrap";

// Dummy data to simulate backend response with 6 records
const dummyOrders = [
    {
        orderId: "1",
        customerId: "James",
        status: "Processing",
        createdAt: "2024-10-01T10:00:00Z",
        products: [
            { productName: "Wireless Headphones", quantity: 3 }
        ],
    },
    {
        orderId: "2",
        customerId: "Willey",
        status: "Delivered",
        createdAt: "2024-10-05T15:30:00Z",
        products: [
            { productName: "Smartphone", quantity: 5 }
        ],
    },
    {
        orderId: "3",
        customerId: "Neon",
        status: "Pending",
        createdAt: "2024-10-02T11:20:00Z",
        products: [
            { productName: "Bluetooth Speaker", quantity: 1 }
        ],
    },
    {
        orderId: "4",
        customerId: "John",
        status: "Ready",
        createdAt: "2024-10-06T09:00:00Z",
        products: [
            { productName: "Laptop", quantity: 2 }
        ],
    },
    {
        orderId: "5",
        customerId: "Alex",
        status: "Shipped",
        createdAt: "2024-10-03T14:15:00Z",
        products: [
            { productName: "Smartwatch", quantity: 4 }
        ],
    },
    {
        orderId: "6",
        customerId: "William",
        status: "Canceled",
        createdAt: "2024-10-04T12:45:00Z",
        products: [
            { productName: "Tablet", quantity: 6 }
        ],
    },
];

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Simulate fetching orders from an API with dummy data
    useEffect(() => {
        const fetchOrders = () => {
            setTimeout(() => {
                setOrders(dummyOrders);
                setLoading(false);
            }, 1000); // Simulate network delay
        };

        fetchOrders();
    }, []);

    // Handler to update the status of an order
    const handleStatusChange = (orderId, newStatus) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.orderId === orderId
                    ? { ...order, status: newStatus }
                    : order
            )
        );
        setSuccessMessage(`Order ${orderId} status updated to ${newStatus}`);
    };

    // Handler to cancel an order
    const handleCancelOrder = (orderId) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.orderId === orderId
                    ? { ...order, status: "Canceled" }
                    : order
            )
        );
        setSuccessMessage(`Order ${orderId} has been canceled.`);
    };

    if (loading) {
        return (
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ height: "100vh" }}
            >
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5" style={{ marginLeft: "200px" }}>
            <Row className="justify-content-center">
                <Col md={12}>
                    {" "}
                    {/* Increased width by changing from md={10} to md={12} */}
                    <Card className="p-4 shadow-sm" style={styles.card}>
                        <Card.Body>
                            <h3 className="text-center mb-4">Order Details</h3>
                            {successMessage && (
                                <Alert
                                    variant="success"
                                    className="text-center"
                                >
                                    {successMessage}
                                </Alert>
                            )}
                            {orders.length === 0 ? (
                                <Alert variant="info" className="text-center">
                                    No orders available.
                                </Alert>
                            ) : (
                                <Table
                                    striped
                                    bordered
                                    hover
                                    responsive
                                    className="order-table"
                                >
                                    <thead>
                                        <tr>
                                            
                                            <th>Customer Name</th>
                                            <th>Status</th>
                                            <th>Created At</th>
                                            <th>Products</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => (
                                            <tr key={order.orderId}>
                                                
                                                <td>{order.customerId}</td>
                                                <td>
                                                    <span
                                                        style={{
                                                            ...styles.statusBadge,
                                                            ...styles[
                                                                order.status.toLowerCase()
                                                            ],
                                                        }}
                                                    >
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    {new Date(
                                                        order.createdAt
                                                    ).toLocaleString()}
                                                </td>
                                                <td>
                                                    <ul>
                                                        {order.products.map(
                                                            (product) => (
                                                                <li
                                                                    key={
                                                                        product.productId
                                                                    }
                                                                >
                                                                    Product Name:{" "}
                                                                    {
                                                                        product.productName
                                                                    }
                                                                    <br />
                                                                    Quantity:{" "}
                                                                    {
                                                                        product.quantity
                                                                    }*
                                                                    
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </td>
                                                <td>
                                                    <Button
                                                        variant="outline-success"
                                                        className="me-2"
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                order.orderId,
                                                                "Delivered"
                                                            )
                                                        }
                                                        disabled={
                                                            order.status ===
                                                            "Delivered"
                                                        }
                                                        style={
                                                            styles.actionButton
                                                        }
                                                    >
                                                        Mark as Delivered
                                                    </Button>
                                                    <br /> <br />
                                                    <Button
                                                        variant="outline-danger"
                                                        onClick={() =>
                                                            handleCancelOrder(
                                                                order.orderId
                                                            )
                                                        }
                                                        disabled={
                                                            order.status ===
                                                            "Canceled"
                                                        }
                                                        style={
                                                            styles.actionButton
                                                        }
                                                    >
                                                        Cancel Order
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

// Inline styles for the component
const styles = {
    card: {
        backgroundColor: "#f8f9fa",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    },
    statusBadge: {
        padding: "5px 10px",
        borderRadius: "20px",
        color: "white",
        fontSize: "14px",
    },
    processing: {
        backgroundColor: "#ffc107",
    },
    delivered: {
        backgroundColor: "#28a745",
    },
    pending: {
        backgroundColor: "#17a2b8",
    },
    ready: {
        backgroundColor: "#007bff",
    },
    shipped: {
        backgroundColor: "#6f42c1",
    },
    canceled: {
        backgroundColor: "#dc3545",
    },
    actionButton: {
        borderRadius: "20px",
        padding: "10px 15px",
        fontSize: "14px",
        fontWeight: "bold",
        transition: "background-color 0.2s ease",
    },
};

export default OrderList;
