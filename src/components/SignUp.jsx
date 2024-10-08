import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    Container,
    Form,
    Button,
    Row,
    Col,
    Card,
    Alert,
} from "react-bootstrap";

const Signup = () => {
    const navigate = useNavigate();

    // State for form data
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        nic: "",
        passwordHash: "", // Corrected the key from passwordHash to password for consistency
        role: "",
        isActive: false,
    });

    // State for error and success messages
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Mapping role strings to numeric values
    const roleMapping = {
        Administrator: 0,
        Vendor: 1,
        CSR: 2,
        Customer: 3,
    };

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form clearing
    const handleClear = () => {
        setFormData({
            username: "",
            email: "",
            nic: "",
            password: "",
            role: "",
            isActive: false,
        });
        setError("");
        setSuccess("");
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Ensure a role is selected
        if (!formData.role) {
            setError("Please select a role");
            return;
        }

        // Convert role string to numeric value
        const numericRole =
            roleMapping[formData.role] || parseInt(formData.role);

        // Prepare payload for the backend
        const userPayload = {
            Id: "",
            username: formData.username,
            email: formData.email,
            nic: formData.nic,
            passwordHash: formData.password, // Send plain password
            role: numericRole, // Send the numeric role
            isActive: false,
        };

        try {
            const response = await axios.post(
                "http://localhost:5201/api/Users",
                userPayload
            );
            console.log("User created successfully", response.data);
            // Show success alert
            alert("Registered successfully");
            handleClear();
            // Navigate to the login page
            navigate("/login"); // Adjust the path as needed for your login route
            if (response.status === 200) {
                setSuccess("User registered successfully!");
                handleClear(); // Clear form after success
            }
        } catch (err) {
            // Display a specific error message if provided by backend
            if (err.response && err.response.data && err.response.data.errors) {
                const errorMessages = Object.values(err.response.data.errors)
                    .flat()
                    .join(" ");
                setError(errorMessages);
            } else {
                setError("Error occurred while registering. Please try again.");
            }
        }
    };

    return (
        <div
            style={{
                backgroundColor: "#e3f2fd", // Light blue background
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Container style={{ padding: "20px" }}>
                <Row className="w-100">
                    <Col xs={12} md={6} lg={7} className="mx-auto">
                        <Card
                            className="p-4 shadow-lg"
                            style={{
                                borderRadius: "20px",
                                border: "none",
                                backgroundColor: "#ffffff",
                            }}
                        >
                            <Card.Body>
                                <h3 className="text-center mb-5 text-primary">
                                    Signup
                                </h3>
                                {error && (
                                    <Alert variant="danger">{error}</Alert>
                                )}
                                {success && (
                                    <Alert variant="success">{success}</Alert>
                                )}

                                <Form onSubmit={handleSubmit}>
                                    {/* Username */}
                                    <Form.Group
                                        controlId="username"
                                        className="mb-3"
                                    >
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            placeholder="Enter Your Username"
                                            required
                                            style={{
                                                borderRadius: "50px",
                                                padding: "12px",
                                            }}
                                        />
                                    </Form.Group>

                                    {/* Email */}
                                    <Form.Group
                                        controlId="email"
                                        className="mb-3"
                                    >
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter Your Email"
                                            required
                                            style={{
                                                borderRadius: "50px",
                                                padding: "12px",
                                            }}
                                        />
                                    </Form.Group>

                                    {/* NIC */}
                                    <Form.Group
                                        controlId="nic"
                                        className="mb-3"
                                    >
                                        <Form.Label>NIC</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="nic"
                                            value={formData.nic}
                                            onChange={handleChange}
                                            placeholder="Enter Your NIC"
                                            required
                                            style={{
                                                borderRadius: "50px",
                                                padding: "12px",
                                            }}
                                        />
                                    </Form.Group>

                                    {/* Password */}
                                    <Form.Group
                                        controlId="password"
                                        className="mb-3"
                                    >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Enter Your Password"
                                            required
                                            style={{
                                                borderRadius: "50px",
                                                padding: "12px",
                                            }}
                                        />
                                    </Form.Group>

                                    {/* Role */}
                                    <Form.Group
                                        controlId="role"
                                        className="mb-4"
                                    >
                                        <Form.Label>Role</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            required
                                            style={{
                                                borderRadius: "50px",
                                                padding: "5px",
                                            }}
                                        >
                                            <option value="">
                                                Select Role
                                            </option>
                                            <option value="0">
                                                Administrator
                                            </option>
                                            <option value="1">Vendor</option>
                                            <option value="2">CSR</option>
                                            <option value="3">Customer</option>
                                        </Form.Control>
                                    </Form.Group>

                                    {/* Submit and Clear Buttons */}
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="w-100 mb-3"
                                        style={{
                                            fontWeight: "bold",
                                            borderRadius: "50px",
                                            padding: "10px",
                                        }}
                                    >
                                        Sign Up
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        className="w-100"
                                        onClick={handleClear}
                                        style={{
                                            fontWeight: "bold",
                                            borderRadius: "50px",
                                            padding: "10px",
                                        }}
                                    >
                                        Clear
                                    </Button>
                                </Form>
                                {/* Link to Login Page */}
                                <div className="text-center mt-3">
                                    <p>
                                        Already have an account?{" "}
                                        <Link
                                            to="/login"
                                            className="text-decoration-none"
                                        >
                                            Login here
                                        </Link>
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Signup;
