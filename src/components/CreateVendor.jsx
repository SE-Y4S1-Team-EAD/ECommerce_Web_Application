import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Adjust import path if needed
import {
    Container,
    Form,
    Button,
    Alert,
    Row,
    Col,
    Card,
} from "react-bootstrap";

const CreateVendor = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        id: "",
        username: "",
        email: "",
        nic: "",
        passwordHash: "",
        role: 1, // Assuming 1 corresponds to Vendor
        isActive: true,
    });
    const [vendorDetails, setVendorDetails] = useState({
        userId: "sss", // User ID should be assigned after creating the user
        name: "",
    });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(
                "http://localhost:5201/api/Vendors/create",
                {
                    User: userDetails,
                    Vendor: vendorDetails,
                }
            );

            // Redirect to vendor details page or show success message
            navigate("/getvendor");
        } catch (err) {
            setError("Failed to create vendor.");
        }
    };

    const handleClear = () => {
        // Reset userDetails and vendorDetails to their initial state
        setUserDetails({
            id: "",
            username: "",
            email: "",
            nic: "",
            passwordHash: "",
            role: 1,
            isActive: true,
        });
        setVendorDetails({
            userId: "sss",
            name: "",
        });
        setError(""); // Clear any error message as well
    };

    if (!isAuthenticated) return <p>Please log in to create a vendor.</p>;

    return (
        <div className="d-flex">
            <div
                className="main-content"
                style={{ marginLeft: "250px", padding: "20px", width: "100%" }}
            >
                <Container className="my-4">
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <Card className="shadow-lg p-4">
                                <Card.Body>
                                    <h2 className="text-center mb-4">
                                        Create Vendor
                                    </h2>
                                    {error && (
                                        <Alert variant="danger">{error}</Alert>
                                    )}
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group
                                            as={Row}
                                            controlId="username"
                                        >
                                            <Form.Label column sm={3}>
                                                User Name:
                                            </Form.Label>
                                            <Col sm={9}>
                                                <Form.Control
                                                    type="text"
                                                    value={userDetails.username}
                                                    onChange={(e) =>
                                                        setUserDetails({
                                                            ...userDetails,
                                                            username:
                                                                e.target.value,
                                                        })
                                                    }
                                                    placeholder="Enter Username"
                                                    required
                                                />
                                            </Col>
                                        </Form.Group>
                                        <br></br>
                                        <Form.Group as={Row} controlId="email">
                                            <Form.Label column sm={3}>
                                                Email:
                                            </Form.Label>
                                            <Col sm={9}>
                                                <Form.Control
                                                    type="email"
                                                    value={userDetails.email}
                                                    onChange={(e) =>
                                                        setUserDetails({
                                                            ...userDetails,
                                                            email: e.target
                                                                .value,
                                                        })
                                                    }
                                                    placeholder="Enter Email"
                                                    required
                                                />
                                            </Col>
                                        </Form.Group>
                                        <br></br>
                                        <Form.Group as={Row} controlId="nic">
                                            <Form.Label column sm={3}>
                                                NIC:
                                            </Form.Label>
                                            <Col sm={9}>
                                                <Form.Control
                                                    type="text"
                                                    value={userDetails.nic}
                                                    onChange={(e) =>
                                                        setUserDetails({
                                                            ...userDetails,
                                                            nic: e.target.value,
                                                        })
                                                    }
                                                    placeholder="Enter NIC"
                                                    required
                                                />
                                            </Col>
                                        </Form.Group>
                                        <br></br>
                                        <Form.Group
                                            as={Row}
                                            controlId="password"
                                        >
                                            <Form.Label column sm={3}>
                                                Password:
                                            </Form.Label>
                                            <Col sm={9}>
                                                <Form.Control
                                                    type="password"
                                                    value={
                                                        userDetails.passwordHash
                                                    }
                                                    onChange={(e) =>
                                                        setUserDetails({
                                                            ...userDetails,
                                                            passwordHash:
                                                                e.target.value,
                                                        })
                                                    }
                                                    placeholder="Enter Password"
                                                    required
                                                />
                                            </Col>
                                        </Form.Group>
                                        <br></br>
                                        <Form.Group
                                            as={Row}
                                            controlId="vendorName"
                                        >
                                            <Form.Label column sm={3}>
                                                Vendor Name:
                                            </Form.Label>
                                            <Col sm={9}>
                                                <Form.Control
                                                    type="text"
                                                    value={vendorDetails.name}
                                                    onChange={(e) =>
                                                        setVendorDetails({
                                                            ...vendorDetails,
                                                            name: e.target
                                                                .value,
                                                        })
                                                    }
                                                    placeholder="Enter Vendor Name"
                                                    required
                                                />
                                            </Col>
                                        </Form.Group>
                                        <br></br>
                                        <Form.Group as={Row}>
                                            <Col sm={{ span: 9, offset: 3 }}>
                                                <Button
                                                    type="submit"
                                                    variant="primary"
                                                    className="w-100"
                                                >
                                                    Create Vendor
                                                </Button>
                                            </Col>
                                        </Form.Group>
                                        <br></br>
                                        <Form.Group as={Row}>
                                            <Col sm={{ span: 9, offset: 3 }}>
                                                <Button
                                                    variant="secondary"
                                                    className="w-100"
                                                    onClick={handleClear}
                                                >
                                                    Clear Details
                                                </Button>
                                            </Col>
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default CreateVendor;
