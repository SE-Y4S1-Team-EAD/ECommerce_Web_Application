import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Table,
    Button,
    Alert,
    Card,
    Col,
    Row,
    Modal,
    Form,
    InputGroup,
} from "react-bootstrap";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showProduct, setShowProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5201/api/products"
                );
                setProducts(response.data);
                setFilteredProducts(response.data); // Initialize filtered products
            } catch (err) {
                setError("Failed to fetch products.");
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term) {
            const filtered = products.filter((product) =>
                product.name.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    };

    const handleUpdate = (productId) => {
        navigate(`/update-product/${productId}`);
    };

    const handleCreate = () => {
        navigate("/create-product"); // Navigate to create product page
    };

    const handleClose = () => setShowProduct(null);

    return (
        <div className="d-flex">
            {/* Main content area */}
            <Container
                fluid
                className="main-content"
                style={{ marginLeft: "250px", padding: "20px" }}
            >
                <Row className="align-items-center mb-4">
                    <Col md={8}>
                        <h2 className="text-center">Product List</h2>
                    </Col>
                    <Col md={4} className="text-end">
                        <Button
                            variant="primary"
                            onClick={handleCreate}
                            style={{ fontSize: "20px" }}
                        >
                            + Create Product
                        </Button>
                    </Col>
                </Row>

                {/* Search bar */}
                <InputGroup className="mb-4">
                    <Form.Control
                        type="text"
                        placeholder="Search product by name..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </InputGroup>

                {error && <Alert variant="danger">{error}</Alert>}

                {/* Product Table */}
                <Table
                    striped
                    bordered
                    hover
                    responsive
                    className="product-table"
                >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <tr key={product.productId}>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>${product.price.toFixed(2)}</td>
                                    <td>{product.stockQuantity}</td>
                                    <td>
                                        {product.imageUrls &&
                                        product.imageUrls.length > 0 ? (
                                            <img
                                                src={product.imageUrls[0]}
                                                alt={product.name}
                                                style={{
                                                    width: "100px",
                                                    height: "100px",
                                                    objectFit: "cover",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                    setShowProduct(product)
                                                }
                                            />
                                        ) : (
                                            "No Image"
                                        )}
                                    </td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            onClick={() =>
                                                handleUpdate(product.productId)
                                            }
                                            className="mb-2"
                                        >
                                            Update
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No products found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                {/* Product Modal */}
                {showProduct && (
                    <Modal show={true} onHide={handleClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>{showProduct.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col md={6}>
                                    <Card>
                                        <Card.Img
                                            variant="top"
                                            src={showProduct.imageUrls[0]}
                                            alt={showProduct.name}
                                        />
                                    </Card>
                                </Col>
                                <Col md={6}>
                                    <h4>{showProduct.name}</h4>
                                    <p>{showProduct.description}</p>
                                    <p>
                                        <strong>Price:</strong> $
                                        {showProduct.price.toFixed(2)}
                                    </p>
                                    <p>
                                        <strong>Stock:</strong>{" "}
                                        {showProduct.stockQuantity}
                                    </p>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </Container>
        </div>
    );
};

export default Products;
