import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; // Adjust import path if needed
import { Table, Container, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AllUserDetails = () => {
    const { isAuthenticated } = useAuth(); // Check if user is authenticated
    const [users, setUsers] = useState([]); // State to store user details
    const [error, setError] = useState(""); // State to store error message
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!isAuthenticated) return; // Only fetch details if user is authenticated

            try {
                // Fetch all users from the backend
                const response = await axios.get(
                    "http://localhost:5201/api/users"
                );
                const userData = response.data;

                // Update the state with the fetched user data
                setUsers(userData);
            } catch (err) {
                // Set error message if fetching fails
                setError("Failed to fetch user details.");
            }
        };

        fetchUserDetails();
    }, [isAuthenticated]); // Dependency array to refetch when authentication status changes

    // Function to map role numbers to human-readable roles
    const getRoleLabel = (role) => {
        switch (role) {
            case 0:
                return "Admin";
            case 1:
                return "Vendor";
            case 2:
                return "CSR";
            case 3:
                return "Customer";
            default:
                return "Unknown";
        }
    };

    // Function to toggle the isActive status
    const toggleActiveStatus = async (id, currentStatus) => {
        try {
            // Update active status in the backend
            await axios.put(`http://localhost:5201/api/Users/${id}`, {
                isActive: !currentStatus, // Toggle the status
            });

            // Update the state to reflect the new status
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === id
                        ? { ...user, isActive: !currentStatus }
                        : user
                )
            );
        } catch (err) {
            // Handle error if the update fails
            setError("Failed to update the user's status.");
        }
    };

    if (!isAuthenticated)
        return (
            <Alert variant="warning">Please log in to view user details.</Alert>
        );

    return (
        <Container fluid className="main-content"
        style={{ marginLeft: "250px", padding: "20px", width: "1250px"}}>
            <h2 className="my-4">User Details</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>NIC</th>
                        <th>Is Active</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.nic}</td>
                                <td>{user.isActive ? "Yes" : "No"}</td>
                                <td>{getRoleLabel(user.role)}</td>
                                <td>
                                    <Button
                                        variant={
                                            user.isActive ? "danger" : "success"
                                        }
                                        onClick={() =>
                                            toggleActiveStatus(
                                                user.id,
                                                user.isActive
                                            )
                                        }
                                    >
                                        {user.isActive
                                            ? "Deactivate"
                                            : "Activate"}
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No users found</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
};

export default AllUserDetails;
