import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Alert,
    Card,
} from "react-bootstrap"; // Added Card for layout

const CreateInventory = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [stockLevel, setStockLevel] = useState(0);
    const [lowStockThreshold, setLowStockThreshold] = useState(5); // Default value
    const [adjustmentType, setAdjustmentType] = useState("increase"); // New field to select increase/decrease
    const [adjustmentAmount, setAdjustmentAmount] = useState(0); // Amount to adjust stock
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5201/api/products"
                );
                setProducts(response.data);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Error fetching products");
            }
        };

        fetchProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (
            !selectedProduct ||
            adjustmentAmount <= 0 ||
            lowStockThreshold <= 0
        ) {
            setError(
                "Please select a product and enter valid stock level and low stock threshold."
            );
            return;
        }

        try {
            const productResponse = await axios.get(
                `http://localhost:5201/api/products/${selectedProduct}`
            );
            const product = productResponse.data;

            let existingInventory = null;

            try {
                const existingInventoryResponse = await axios.get(
                    `http://localhost:5201/api/inventory/${selectedProduct}`
                );
                existingInventory = existingInventoryResponse.data;
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    console.log(
                        "No existing inventory found. Creating new inventory."
                    );
                } else {
                    console.error("Error fetching inventory:", err);
                    setError("Error fetching inventory");
                    return;
                }
            }

            if (existingInventory) {
                let updatedStockLevel = existingInventory.stockLevel;

                if (adjustmentType === "increase") {
                    updatedStockLevel += adjustmentAmount;
                } else if (adjustmentType === "decrease") {
                    if (adjustmentAmount > existingInventory.stockLevel) {
                        setError("Cannot decrease stock below zero.");
                        return;
                    }
                    updatedStockLevel -= adjustmentAmount;
                }

                const updatedInventory = {
                    ...existingInventory,
                    productId: selectedProduct,
                    stockLevel: updatedStockLevel,
                    lowStockThreshold: lowStockThreshold,
                    isLowStock: updatedStockLevel <= lowStockThreshold,
                    reservedStock: 0,
                };

                await axios.put(
                    `http://localhost:5201/api/inventory/${existingInventory.productId}`,
                    updatedInventory
                );
                alert("Inventory updated successfully");
            } else {
                const newInventory = {
                    productId: selectedProduct,
                    stockLevel: stockLevel,
                    lowStockThreshold: lowStockThreshold,
                    isLowStock: stockLevel <= lowStockThreshold,
                    reservedStock: 0,
                };

                await axios.post(
                    "http://localhost:5201/api/inventory",
                    newInventory
                );
                alert("Inventory created successfully");
            }

            setSelectedProduct("");
            setStockLevel(0);
            setAdjustmentAmount(0);
            setLowStockThreshold(5);
        } catch (err) {
            console.error("Error creating or updating inventory:", err);
            setError("Error creating or updating inventory");
        }
    };

    return (
        <div className="d-flex">
            <Container
                fluid
                className="main-content"
                style={{ marginLeft: "250px", padding: "20px" }}
            >
                <h2 className="mb-4 text-center">Inventory Management</h2>
                <Row className="justify-content-center">
                    <Col lg={6} md={8}>
                        <Card className="shadow-lg p-4">
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Select Product:</Form.Label>
                                        <Form.Select
                                            value={selectedProduct}
                                            onChange={(e) =>
                                                setSelectedProduct(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        >
                                            <option value="">
                                                Select a product
                                            </option>
                                            {products.map((product) => (
                                                <option
                                                    key={product.productId}
                                                    value={product.productId}
                                                >
                                                    {product.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Adjustment Type:
                                        </Form.Label>
                                        <Form.Select
                                            value={adjustmentType}
                                            onChange={(e) =>
                                                setAdjustmentType(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        >
                                            <option value="increase">
                                                Increase Stock
                                            </option>
                                            <option value="decrease">
                                                Decrease Stock
                                            </option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Stock Adjustment Amount:
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={adjustmentAmount}
                                            onChange={(e) =>
                                                setAdjustmentAmount(
                                                    parseInt(e.target.value)
                                                )
                                            }
                                            min="1"
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Low Stock Threshold:
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={lowStockThreshold}
                                            onChange={(e) =>
                                                setLowStockThreshold(
                                                    parseInt(e.target.value)
                                                )
                                            }
                                            min="1"
                                            required
                                        />
                                    </Form.Group>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="w-100"
                                    >
                                        Update Inventory
                                    </Button>
                                </Form>
                                {error && (
                                    <Alert variant="danger" className="mt-3">
                                        {error}
                                    </Alert>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CreateInventory;
