import React, { useEffect } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { FaBox, FaStore, FaUsers, FaClipboardList } from "react-icons/fa";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    PieController,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

// Initialize Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PieController,
    ArcElement,
    Tooltip,
    Legend
);

function Home() {
    useEffect(() => {
        document.title = "Dashboard Home";
    }, []);

    // Data for Bar Chart
    const barChartData = {
        labels: ["Smartwatch", "Bluetooth Speaker", "Wireless Headphones", "Smartphone"],
        datasets: [
            {
                label: "Inventory Stock",
                data: [25, 35, 45, 20],
                backgroundColor: [
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                    "rgba(255, 159, 64, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                ],
                borderColor: [
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(54, 162, 235, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    // Data for Pie Chart
    const pieChartData = {
        labels: ["Doe Electronics", "Smith Supplies", "Brown Solutions"],
        datasets: [
            {
                data: [15, 25, 35, 25],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(75, 192, 192, 0.6)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="d-flex">
            {/* Main Content */}
            <div
                className="main-content"
                style={{ marginLeft: "250px", padding: "20px", width: "100%" }}
            >
                <Container fluid>
                    <Row className="mt-4">
                        {/* Additional Information Section */}
                        {/* Vendors Info Block */}
                        <Col md="3">
                            <Card
                                className="shadow-sm mb-4"
                                style={styles.infoCard}
                            >
                                <CardBody>
                                    <CardTitle className="d-flex align-items-center">
                                        <FaStore className="me-2" />
                                        Total Vendors
                                    </CardTitle>
                                    <h2 style={styles.infoNumber}>10</h2>
                                </CardBody>
                            </Card>
                        </Col>

                        {/* Products Info Block */}
                        <Col md="3">
                            <Card
                                className="shadow-sm mb-4"
                                style={styles.infoCard}
                            >
                                <CardBody>
                                    <CardTitle className="d-flex align-items-center">
                                        <FaBox className="me-2" />
                                        Total Products
                                    </CardTitle>
                                    <h2 style={styles.infoNumber}>150</h2>
                                </CardBody>
                            </Card>
                        </Col>

                        {/* Users Info Block */}
                        <Col md="3">
                            <Card
                                className="shadow-sm mb-4"
                                style={styles.infoCard}
                            >
                                <CardBody>
                                    <CardTitle className="d-flex align-items-center">
                                        <FaUsers className="me-2" />
                                        Total Users
                                    </CardTitle>
                                    <h2 style={styles.infoNumber}>200</h2>
                                </CardBody>
                            </Card>
                        </Col>

                        {/* Orders Info Block */}
                        <Col md="3">
                            <Card
                                className="shadow-sm mb-4"
                                style={styles.infoCard}
                            >
                                <CardBody>
                                    <CardTitle className="d-flex align-items-center">
                                        <FaClipboardList className="me-2" />
                                        Total Orders
                                    </CardTitle>
                                    <h2 style={styles.infoNumber}>80</h2>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        {/* Inventory Section */}
                        <Col md="6" lg="6">
                            <Card className="shadow-sm mb-4">
                                <CardBody>
                                    <CardTitle className="d-flex align-items-center">
                                        <FaBox className="me-2" />
                                        Inventory Status
                                    </CardTitle>
                                    <div>
                                        <Bar
                                            data={barChartData}
                                            options={{ responsive: true }}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        {/* Vendor Section */}
                        <Col md="6" lg="6">
                            <Card className="shadow-sm mb-4">
                                <CardBody>
                                    <CardTitle className="d-flex align-items-center">
                                        <FaStore className="me-2" />
                                        Vendor Distribution
                                    </CardTitle>
                                    <div>
                                        <Pie
                                            data={pieChartData}
                                            options={{ responsive: true }}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

// Inline styles for the component
const styles = {
    infoCard: {
        backgroundColor: "#f8f9fa",
        borderRadius: "10px",
        textAlign: "center",
        padding: "20px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    },
    infoNumber: {
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#343a40",
    },
};

export default Home;
