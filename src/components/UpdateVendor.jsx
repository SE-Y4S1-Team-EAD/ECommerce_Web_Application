import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Form, Alert, Container } from "react-bootstrap";

const UpdateVendor = () => {
    const { id } = useParams(); // Vendor ID from URL
    const navigate = useNavigate();
    const [vendor, setVendor] = useState({
        name: "",
        email: "",
        username: "",
        passwordHash: "",
        nic: "",
        isActive: true,
    });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch Vendor Details
    useEffect(() => {
        const fetchVendorData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5201/api/vendors/${id}`
                );
                setVendor({
                    name: response.data.vendor.name || "", // Ensure the correct path
                    email: response.data.user.email || "",
                    passwordHash: response.data.user.passwordHash || "",
                    nic: response.data.user.nic || "",
                    username: response.data.user.username || "",
                    isActive: response.data.user.isActive,
                });
            } catch (err) {
                setError("Failed to fetch vendor details.");
            }
        };

        fetchVendorData();
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setVendor((prevVendor) => ({
            ...prevVendor,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.put(`http://localhost:5201/api/vendors/${id}`, vendor);
            navigate("/getvendor"); // Redirect to vendors list or details page
        } catch (err) {
            setError("Failed to update vendor.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Container>
                <Card
                    className="shadow p-4"
                    style={{
                        borderRadius: "15px",
                        maxWidth: "1200px",
                        margin: "0 auto",
                        backgroundColor: "white",
                        marginLeft: "250px",
                    }}
                >
                    <Card.Body>
                        <h2 className="text-center mb-4">Update Vendor</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="name" className="mb-3">
                                <Form.Label>Vendor Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={vendor.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="email" className="mb-3">
                                <Form.Label>User Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={vendor.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="username" className="mb-3">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={vendor.username}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="nic" className="mb-3">
                                <Form.Label>NIC</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nic"
                                    value={vendor.nic}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="isActive" className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    label="Is Active"
                                    name="isActive"
                                    checked={vendor.isActive}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Button
                                type="submit"
                                variant="primary"
                                className="w-100"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Updating..." : "Update Vendor"}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default UpdateVendor;
