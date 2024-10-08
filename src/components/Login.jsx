import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Adjust the import path if needed
import { useNavigate } from "react-router-dom";
import {
    Container,
    Form,
    Button,
    Alert,
    Row,
    Col,
    Card,
} from "react-bootstrap"; // Importing Bootstrap components

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(
                "http://localhost:5201/api/users/authenticate",
                {
                    email,
                    passwordHash: password, // Ensure password is hashed if needed
                }
            );
            const { data } = response;
            // Store token and update authentication state
            login(data.Token);
            navigate("/dashboard"); // Redirect to another route after login
        } catch (err) {
            setError("Invalid email or password.");
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
            <Container>
                <Row className="w-100">
                    <Col xs={12} md={6} lg={4} className="mx-auto">
                        <Card
                            className="p-4 shadow-lg"
                            style={{ borderRadius: "20px", border: "none" }}
                        >
                            <Card.Body>
                                <h3 className="text-center mb-4 text-primary">
                                    Login
                                </h3>
                                {error && (
                                    <Alert variant="danger">{error}</Alert>
                                )}
                                <Form onSubmit={handleLogin}>
                                    <Form.Group
                                        controlId="email"
                                        className="mb-3"
                                    >
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            placeholder="Enter your email"
                                            required
                                            style={{
                                                borderRadius: "50px",
                                                padding: "12px",
                                                fontSize: "16px",
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group
                                        controlId="password"
                                        className="mb-3"
                                    >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            placeholder="Enter your password"
                                            required
                                            style={{
                                                borderRadius: "50px",
                                                padding: "12px",
                                                fontSize: "16px",
                                            }}
                                        />
                                    </Form.Group>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="w-100"
                                        style={{
                                            fontWeight: "bold",
                                            borderRadius: "50px",
                                            padding: "10px 0",
                                            fontSize: "18px",
                                        }}
                                    >
                                        Login
                                    </Button>
                                </Form>
                                <div className="text-center mt-3">
                                    <p>
                                        Don't have an account?{" "}
                                        <Link
                                            to="/Signup"
                                            className="text-decoration-none"
                                        >
                                            Signup
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

export default Login;
