import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Adjust the import path if necessary
import {
    FaHome,
    FaBox,
    FaChartLine,
    FaUserCircle,
    FaStore,
    FaUser,
    FaShoppingCart, // Add new icon for Orders
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function Sidebar() {
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            logout();
        }
    };

    return (
        <>
            <style>
                {`
                    body {
                        min-height: 100vh;
                        min-height: -webkit-fill-available;
                        display: flex;
                        flex-direction: column;
                    }

                    .sidebar {
                        height: 100vh;
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 250px;
                        background-color: #007bff; /* Blue color */
                        color: white;
                        transition: all 0.3s;
                        padding-top: 20px;
                        padding-left: 10px;
                        z-index: 1000;
                    }

                    .sidebar .nav-link {
                        color: #adb5bd; /* Light color */
                        font-size: 1rem;
                        padding: 10px;
                        transition: background-color 0.2s ease, width 0.2s ease;
                        width: 80%; /* Initial width of the button */
                    }

                    .sidebar .nav-link:hover {
                        background-color: #66b3ff; /* Light blue color */
                        color: black;
                        font-weight: bold;
                        width: 100%; /* Expand to full width on hover */
                    }

                    .sidebar .active {
                        background-color: #0056b3; /* Active item color */
                    }

                    .sidebar .nav-item {
                        margin-bottom: 10px;
                    }

                    .sidebar .btn {
                        background: none; /* Remove background */
                        color: black;
                        font-weight: bold;
                        width: 80%; /* Initial width of the button */
                        text-align: left;
                        padding: 10px 15px;
                        margin-bottom: 10px;
                        border: none; /* Remove border */
                        cursor: pointer; /* Change cursor */
                        transition: background-color 0.2s ease, width 0.2s ease;
                    }

                    .sidebar .btn:hover {
                        background-color: #66b3ff; /* Light blue color */
                        color: white;
                        width: 100%; /* Expand to full width on hover */
                    }

                    .sidebar-header {
                        display: flex;
                        align-items: center;
                        padding-bottom: 1rem;
                        margin-bottom: 1rem;
                        border-bottom: 1px solid #495057;
                        font-size: 1.25rem;
                    }

                    .sidebar-header svg {
                        margin-right: 0.5rem;
                    }

                    .sidebar-toggler {
                        display: none;
                    }

                    @media (max-width: 768px) {
                        .sidebar {
                            left: -250px;
                        }

                        .sidebar-toggler {
                            display: block;
                            position: absolute;
                            left: 10px;
                            top: 10px;
                        }
                    }
                `}
            </style>

            <button
                className="btn btn-dark sidebar-toggler"
                onClick={() =>
                    (document.querySelector(".sidebar").style.left = "0")
                }
            >
                ☰
            </button>

            <nav className="sidebar">
                <div className="sidebar-header">
                    <FaUserCircle />
                    Dashboard
                </div>
                <ul className="list-unstyled">
                    {isAuthenticated ? (
                        <>
                            <li className="nav-item">
                                <Link to="/" className="nav-link">
                                    <FaHome className="me-2" /> Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="btn"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#products-collapse"
                                    aria-expanded="false"
                                >
                                    <FaChartLine className="me-2" /> Products
                                </button>
                                <div
                                    className="collapse"
                                    id="products-collapse"
                                >
                                    <ul className="list-unstyled">
                                        <li>
                                            <Link
                                                to="/getproduct"
                                                className="nav-link"
                                            >
                                                Product Details
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/createproduct"
                                                className="nav-link"
                                            >
                                                Create Product
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="btn"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#vendor-collapse"
                                    aria-expanded="false"
                                >
                                    <FaStore className="me-2" /> Vendor
                                </button>
                                <div className="collapse" id="vendor-collapse">
                                    <ul className="list-unstyled">
                                        <li>
                                            <Link
                                                to="/getvendor"
                                                className="nav-link"
                                            >
                                                Vendor Details
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/vendor"
                                                className="nav-link"
                                            >
                                                Create Vendor
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="btn"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#inventory-collapse"
                                    aria-expanded="false"
                                >
                                    <FaBox className="me-2" /> Inventory
                                </button>
                                <div
                                    className="collapse"
                                    id="inventory-collapse"
                                >
                                    <ul className="list-unstyled">
                                        <li>
                                            <Link
                                                to="/create-inventory"
                                                className="nav-link"
                                            >
                                                Adjust Inventory
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/adjust-stock"
                                                className="nav-link"
                                            >
                                                Inventory Details
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            {/* New Orders nav-item */}
                            <li className="nav-item">
                                <button
                                    className="btn"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#orders-collapse"
                                    aria-expanded="false"
                                >
                                    <FaShoppingCart className="me-2" /> Orders
                                </button>
                                <div className="collapse" id="orders-collapse">
                                    <ul className="list-unstyled">
                                        <li>
                                            <Link
                                                to="/orders"
                                                className="nav-link"
                                            >
                                                Order Details
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li className="nav-item">
                                <button
                                    className="btn"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#users-collapse"
                                    aria-expanded="false"
                                >
                                    <FaUser className="me-2" /> Users
                                </button>
                                <div className="collapse" id="users-collapse">
                                    <ul className="list-unstyled">
                                        <li>
                                            <Link
                                                to="/allusers"
                                                className="nav-link"
                                            >
                                                User Details
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="border-top my-3"></li>
                            <li className="nav-item">
                                <button
                                    className="btn"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#account-collapse"
                                    aria-expanded="false"
                                >
                                    <FaUserCircle className="me-2" /> Account
                                </button>
                                <div className="collapse" id="account-collapse">
                                    <ul className="list-unstyled">
                                        <li>
                                            <Link
                                                to="/account/profile"
                                                className="nav-link"
                                            >
                                                Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="btn btn-secondary w-100"
                                            >
                                                Sign out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </>
                    ) : (
                        <div className="text-center">
                            <p>Please log in to access the navigation.</p>
                        </div>
                    )}
                </ul>
            </nav>
        </>
    );
}

export default Sidebar;
