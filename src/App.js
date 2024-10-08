import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Signup from "./components/SignUp";
import Products from "./components/Products";
import Inventory from "./components/Inventory";
import Cart from "./components/Cart";
import Login from "./components/Login";
import { useAuth } from "./components/AuthContext"; // Import useAuth
import "bootstrap/dist/css/bootstrap.min.css";
import CreateVendor from "./components/CreateVendor";
import VendorDetails from "./components/VendorDetails";
import UpdateVendor from "./components/UpdateVendor";
import CreateProduct from "./components/CreateProduct";
import UpdateProduct from "./components/UpdateProduct";
import CreateInventory from "./components/CreateInventory";
import AdjustStock from "./components/AdjustStock";
import AllUserDetails from "./components/AllUsers";
import OrderList from "./components/Orders";

function App() {
    const { isAuthenticated } = useAuth(); // Use isAuthenticated from useAuth

    return (
        <Router>
            <div style={styles.container}>
                {isAuthenticated && <Sidebar />}
                <div style={styles.content}>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                isAuthenticated ? (
                                    <Home />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/products"
                            element={
                                isAuthenticated ? (
                                    <Products />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/orders"
                            element={
                                isAuthenticated ? (
                                    <OrderList />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/allusers"
                            element={
                                isAuthenticated ? (
                                    <AllUserDetails />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/inventory"
                            element={
                                isAuthenticated ? (
                                    <Inventory />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/cart"
                            element={
                                isAuthenticated ? (
                                    <Cart />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/vendor"
                            element={
                                isAuthenticated ? (
                                    <CreateVendor />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/createproduct"
                            element={
                                isAuthenticated ? (
                                    <CreateProduct />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/update-product/:id"
                            element={
                                isAuthenticated ? (
                                    <UpdateProduct />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/getvendor"
                            element={
                                isAuthenticated ? (
                                    <VendorDetails />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/getproduct"
                            element={
                                isAuthenticated ? (
                                    <Products />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/update-vendor/:id"
                            element={
                                isAuthenticated ? (
                                    <UpdateVendor />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/create-inventory"
                            element={
                                isAuthenticated ? (
                                    <CreateInventory />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/adjust-stock"
                            element={
                                isAuthenticated ? (
                                    <AdjustStock />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                isAuthenticated ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Login />
                                )
                            }
                        />
                        {/* Signup */}
                        <Route path="/signup" element={<Signup />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

const styles = {
    container: {
        display: "flex",
    },
    content: {
        flex: 1,
        padding: "20px",
    },
};

export default App;
