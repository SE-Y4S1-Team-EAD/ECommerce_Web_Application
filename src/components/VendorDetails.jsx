import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; // Adjust import path if needed
import {
    Table,
    Container,
    Alert,
    Button,
    Row,
    Col,
    Card,
    Form,
    InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar"; // Adjust the path to your Sidebar component

const VendorDetails = () => {
    const { isAuthenticated } = useAuth();
    const [vendors, setVendors] = useState([]);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); // State for the search term
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchVendorDetails = async () => {
            if (!isAuthenticated) return;

            try {
                const vendorsResponse = await axios.get(
                    "http://localhost:5201/api/vendors"
                );
                const vendorData = vendorsResponse.data;

                const userIds = vendorData.map((vendor) => vendor.userId);
                const usersResponse = await axios.get(
                    "http://localhost:5201/api/users",
                    {
                        params: { userIds: userIds.join(",") },
                    }
                );

                const usersMap = usersResponse.data.reduce((map, user) => {
                    map[user.id] = user.email;
                    return map;
                }, {});

                const usersMapNic = usersResponse.data.reduce((map, user) => {
                    map[user.id] = user.nic;
                    return map;
                }, {});

                const usersMapUname = usersResponse.data.reduce((map, user) => {
                    map[user.id] = user.username;
                    return map;
                }, {});

                const usersMapStatus = usersResponse.data.reduce(
                    (map, user) => {
                        map[user.id] = user.isActive;
                        return map;
                    },
                    {}
                );

                const vendorsWithDetails = vendorData.map((vendor) => ({
                    ...vendor,
                    email: usersMap[vendor.userId] || "Email not found",
                    username:
                        usersMapUname[vendor.userId] || "Username not found",
                    nic: usersMapNic[vendor.userId] || "NIC not available",
                    isActive: usersMapStatus[vendor.userId] ? "Yes" : "No",
                }));

                setVendors(vendorsWithDetails);
            } catch (err) {
                setError("Failed to fetch vendor details.");
            }
        };

        fetchVendorDetails();
    }, [isAuthenticated]);

    const handleUpdate = (vendorId) => {
        navigate(`/update-vendor/${vendorId}`);
    };

    const handleCreateVendor = () => {
        navigate("/create-vendor"); // Navigate to the vendor creation page
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredVendors = vendors.filter(
        (vendor) =>
            vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vendor.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!isAuthenticated)
        return (
            <Alert variant="warning">
                Please log in to view vendor details.
            </Alert>
        );

    return (
        <div className="d-flex">
            <Sidebar />

            <div
                className="main-content"
                style={{ marginLeft: "250px", padding: "20px", width: "100%" }}
            >
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col>
                            <Card className="shadow p-4">
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h2>Vendors List</h2>
                                        <Button
                                            variant="primary"
                                            onClick={handleCreateVendor}
                                        >
                                            + Create New Vendor
                                        </Button>
                                    </div>

                                    {error && (
                                        <Alert variant="danger">{error}</Alert>
                                    )}

                                    {/* Search Bar */}
                                    <InputGroup className="mb-4">
                                        <Form.Control
                                            type="text"
                                            placeholder="Search vendors..."
                                            value={searchTerm}
                                            onChange={handleSearch}
                                        />
                                    </InputGroup>

                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>Vendor Name</th>
                                                <th>User Name</th>
                                                <th>Email</th>
                                                <th>NIC</th>
                                                <th>Is Active</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredVendors.length > 0 ? (
                                                filteredVendors.map(
                                                    (vendor) => (
                                                        <tr
                                                            key={
                                                                vendor.vendorId
                                                            }
                                                        >
                                                            <td>
                                                                {vendor.name}
                                                            </td>
                                                            <td>
                                                                {
                                                                    vendor.username
                                                                }
                                                            </td>
                                                            <td>
                                                                {vendor.email}
                                                            </td>
                                                            <td>
                                                                {vendor.nic}
                                                            </td>
                                                            <td>
                                                                {
                                                                    vendor.isActive
                                                                }
                                                            </td>
                                                            <td>
                                                                <Button
                                                                    variant="warning"
                                                                    onClick={() =>
                                                                        handleUpdate(
                                                                            vendor.vendorId
                                                                        )
                                                                    }
                                                                >
                                                                    Update
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                )
                                            ) : (
                                                <tr>
                                                    <td colSpan="6">
                                                        No vendors found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default VendorDetails;
