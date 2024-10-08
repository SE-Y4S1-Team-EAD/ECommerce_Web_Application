import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Adjust import path if needed
import { Container, Form, Button, Alert, Card, Modal } from "react-bootstrap";

const CreateProduct = () => {
    const { isAuthenticated } = useAuth();
    const [vendors, setVendors] = useState([]);
    const [product, setProduct] = useState({
        productId: "",
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        vendorId: "",
        isActive: true,
        imageUrls: [],
    });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [showModal, setShowModal] = useState(false); // State for modal
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5201/api/vendors"
                );
                setVendors(response.data);
            } catch (err) {
                setError("Failed to fetch vendors.");
            }
        };

        fetchVendors();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "lunarx13"); // Replace with your Cloudinary upload preset

        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dpnixluze/image/upload",
                formData
            );
            return response.data.secure_url;
        } catch (err) {
            setError("Failed to upload image");
            throw err;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let imageUrl = "";
            if (selectedImage) {
                // Upload the image to Cloudinary and get the URL
                imageUrl = await uploadImageToCloudinary(selectedImage);
                setProduct((prevProduct) => ({
                    ...prevProduct,
                    imageUrls: [imageUrl],
                }));
            }

            // Show preview of the product before final submission
            setShowModal(true); // Open modal to show the preview
        } catch (err) {
            setError("Failed to create product.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleConfirmCreate = async () => {
        try {
            await axios.post("http://localhost:5201/api/products", {
                ...product,
                imageUrls: [product.imageUrls[0]], // Use the uploaded image URL
            });
            navigate("/products");
        } catch (err) {
            setError("Failed to create product.");
        } finally {
            setShowModal(false); // Close modal after confirmation
        }
    };

    const handleClear = () => {
        setProduct({
            productId: "",
            name: "",
            description: "",
            price: "",
            stock: "",
            category: "",
            vendorId: "",
            isActive: true,
            imageUrls: [],
        });
        setSelectedImage(null);
        setShowModal(false);
        setError("");
    };

    const handleCloseModal = () => setShowModal(false); // Close modal handler

    if (!isAuthenticated)
        return (
            <Alert variant="warning">Please log in to create a product.</Alert>
        );

    return (
        <Container
            style={{
                marginLeft: "250px",
                marginRight: "50px",
                width: "100%",
                maxWidth: "1250px",
            }}
        >
            <h2 className="my-4">Create Product</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Card className="p-4 shadow">
                <Form
                    onSubmit={handleSubmit}
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <div style={{ flex: 1, marginRight: "10px" }}>
                        <Form.Group controlId="name">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="price">
                            <Form.Label>Price:</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="category">
                            <Form.Label>Category:</Form.Label>
                            <Form.Control
                                type="text"
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="vendorId">
                            <Form.Label>Vendor:</Form.Label>
                            <Form.Control
                                as="select"
                                name="vendorId"
                                value={product.vendorId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Vendor</option>
                                {vendors.map((vendor) => (
                                    <option
                                        key={vendor.userId}
                                        value={vendor.userId}
                                    >
                                        {vendor.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </div>

                    <div style={{ flex: 1, marginLeft: "10px" }}>
                        <Form.Group controlId="stock">
                            <Form.Label>Stock:</Form.Label>
                            <Form.Control
                                type="number"
                                name="stock"
                                value={product.stock}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="image">
                            <Form.Label>Product Image:</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={product.description}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </div>
                </Form>

                <div
                    style={{ marginTop: "20px", display: "flex", gap: "10px" }}
                >
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        style={{ transition: "0.3s" }}
                    >
                        {isSubmitting ? "Creating..." : "Create Product"}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={handleClear}
                        style={{ transition: "0.3s" }}
                    >
                        Clear Product
                    </Button>
                </div>
            </Card>

            {/* Modal for Product Preview */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Product Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card.Text>
                        <strong>Name:</strong> {product.name}
                        <br />
                        <strong>Description:</strong> {product.description}
                        <br />
                        <strong>Price:</strong> {product.price}
                        <br />
                        <strong>Stock:</strong> {product.stock}
                        <br />
                        <strong>Category:</strong> {product.category}
                        <br />
                        <strong>Vendor:</strong>{" "}
                        {
                            vendors.find((v) => v.userId === product.vendorId)
                                ?.name
                        }
                        <br />
                        <strong>Image:</strong>
                        <br />
                        {product.imageUrls.length > 0 && (
                            <img
                                src={product.imageUrls[0]}
                                alt="Product"
                                style={{ width: "100px", height: "auto" }}
                            />
                        )}
                    </Card.Text>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleConfirmCreate}>
                        Confirm Create
                    </Button>
                    <Button variant="danger" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default CreateProduct;
