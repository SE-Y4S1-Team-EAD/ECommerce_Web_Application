import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
    Container,
    Form,
    Button,
    Alert,
    Row,
    Col,
    Card,
} from "react-bootstrap";

const UpdateProduct = () => {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        stockQuantity: "",
        vendorId: "",
        imageUrls: [""], // Ensure the array always has at least one element
    });
    const [vendors, setVendors] = useState([]);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { id } = useParams(); // Get the product ID from the URL
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductAndVendors = async () => {
            try {
                // Fetch product details
                const productResponse = await axios.get(
                    `http://localhost:5201/api/products/${id}`
                );
                setProduct(productResponse.data);

                // Fetch vendors
                const vendorsResponse = await axios.get(
                    "http://localhost:5201/api/vendors"
                );
                setVendors(vendorsResponse.data);
            } catch (err) {
                setError("Failed to fetch product or vendors.");
            }
        };

        fetchProductAndVendors();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "lunarx13"); // Replace with your Cloudinary upload preset

        try {
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/dpnixluze/image/upload",
                formData
            );
            const newImageUrl = response.data.secure_url;

            // Replace the first image URL or add it if it's empty
            setProduct((prevProduct) => ({
                ...prevProduct,
                imageUrls:
                    prevProduct.imageUrls.length > 0
                        ? [newImageUrl, ...prevProduct.imageUrls.slice(1)]
                        : [newImageUrl],
            }));
        } catch (err) {
            setError("Failed to upload image");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await axios.put(
                `http://localhost:5201/api/products/${id}`,
                product
            );
            navigate("/products");
        } catch (err) {
            setError("Failed to update product.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container
            className="my-4"
            style={{ marginLeft: "250px", padding: "10px", width: "100%" }}
        >
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow-lg p-4 bg-white rounded">
                        <h2 className="mb-4 text-center">Update Product</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group as={Row} controlId="name">
                                <Form.Label column sm={3}>
                                    Name:
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={product.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Col>
                            </Form.Group>
                            <br />
                            <Form.Group as={Row} controlId="description">
                                <Form.Label column sm={3}>
                                    Description:
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        as="textarea"
                                        name="description"
                                        value={product.description}
                                        onChange={handleChange}
                                        required
                                        rows={3}
                                    />
                                </Col>
                            </Form.Group>
                            <br />
                            <Form.Group as={Row} controlId="price">
                                <Form.Label column sm={3}>
                                    Price:
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        value={product.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </Col>
                            </Form.Group>
                            <br />
                            <Form.Group as={Row} controlId="stockQuantity">
                                <Form.Label column sm={3}>
                                    Stock:
                                </Form.Label>
                                <Col sm={9}>
                                    <Form.Control
                                        type="number"
                                        name="stockQuantity"
                                        value={product.stockQuantity}
                                        onChange={handleChange}
                                        required
                                    />
                                </Col>
                            </Form.Group>
                            <br />
                            <Form.Group as={Row} controlId="vendorId">
                                <Form.Label column sm={3}>
                                    Vendor:
                                </Form.Label>
                                <Col sm={9}>
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
                                </Col>
                            </Form.Group>
                            <br />
                            <Form.Group as={Row} controlId="image">
                                <Form.Label column sm={3}>
                                    Product Image:
                                </Form.Label>
                                <Col sm={9}>
                                    {product.imageUrls &&
                                    product.imageUrls[0] ? (
                                        <img
                                            src={product.imageUrls[0]}
                                            alt="Product"
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                objectFit: "cover",
                                                marginBottom: "10px",
                                            }}
                                        />
                                    ) : (
                                        <p>No Image</p>
                                    )}
                                    <Form.Control
                                        type="file"
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                    />
                                </Col>
                            </Form.Group>
                            <br />
                            <Form.Group as={Row}>
                                <Col sm={{ span: 9, offset: 3 }}>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        disabled={isSubmitting}
                                        className="w-100"
                                    >
                                        {isSubmitting
                                            ? "Updating..."
                                            : "Update Product"}
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UpdateProduct;
