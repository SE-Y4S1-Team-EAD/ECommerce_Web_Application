import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the import path if necessary
import { Nav, NavItem, NavLink, Button} from 'reactstrap';
import { FaHome, FaBox, FaChartLine, FaUserCircle } from 'react-icons/fa';


function Sidebar() {
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
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
                    }

                    html {
                        height: -webkit-fill-available;
                    }

                    main {
                        display: flex;
                        flex-wrap: nowrap;
                        height: 100vh;
                        height: -webkit-fill-available;
                        max-height: 100vh;
                        overflow-x: auto;
                        overflow-y: hidden;
                    }

                    .b-example-divider {
                        flex-shrink: 0;
                        width: 1.5rem;
                        height: 100vh;
                        background-color: rgba(0, 0, 0, .1);
                        border: solid rgba(0, 0, 0, .15);
                        border-width: 1px 0;
                        box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
                    }

                    .bi {
                        vertical-align: -.125em;
                        pointer-events: none;
                        fill: currentColor;
                    }

                    .dropdown-toggle { outline: 0; }

                    .nav-flush .nav-link {
                        border-radius: 0;
                    }

                    .btn-toggle {
                        display: inline-flex;
                        align-items: center;
                        padding: .25rem .5rem;
                        font-weight: 600;
                        color: rgba(0, 0, 0, .65);
                        background-color: transparent;
                        border: 0;
                    }
                    .btn-toggle:hover,
                    .btn-toggle:focus {
                        color: rgba(0, 0, 0, .85);
                        background-color: #d2f4ea;
                    }

                    .btn-toggle::before {
                        width: 1.25em;
                        line-height: 0;
                        content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
                        transition: transform .35s ease;
                        transform-origin: .5em 50%;
                    }

                    .btn-toggle[aria-expanded="true"] {
                        color: rgba(0, 0, 0, .85);
                    }
                    .btn-toggle[aria-expanded="true"]::before {
                        transform: rotate(90deg);
                    }

                    .btn-toggle-nav a {
                        display: inline-flex;
                        padding: .1875rem .5rem;
                        margin-top: .125rem;
                        margin-left: 1.25rem;
                        text-decoration: none;
                    }
                    .btn-toggle-nav a:hover,
                    .btn-toggle-nav a:focus {
                        background-color: #d2f4ea;
                    }

                    .scrollarea {
                        overflow-y: auto;
                    }

                    .fw-semibold { font-weight: 600; }
                    .lh-tight { line-height: 1.25; }
                `}
            </style>

            <div className="flex-shrink-0 p-3 bg-white" style={{ width: '280px' }}>
            <a href="/" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
                <svg className="bi me-2" width="30" height="24">
                    <use xlinkHref="#bootstrap" />
                </svg>
                <span className="fs-5 fw-semibold">Collapsible</span>
            </a>
            <ul className="list-unstyled ps-0">
                {isAuthenticated ? (
                    <>
                        <li className="mb-1">
                            <Link to="/" className="btn btn-toggle align-items-center rounded">
                                <FaHome className="me-2" /> Home
                            </Link>
                        </li>
                        <li className="mb-1">
                            <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                                <FaChartLine className="me-2" /> Products
                            </button>
                            <div className="collapse" id="dashboard-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><Link to="/getproduct" className="link-dark rounded">Product Details</Link></li>
                                    <li><Link to="/createproduct" className="link-dark rounded">Create Product</Link></li>
                                </ul>
                            </div>
                        </li>
                        <li className="mb-1">
                            <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                                <FaBox className="me-2" /> Vendor
                            </button>
                            <div className="collapse" id="orders-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><Link to="/getvendor" className="link-dark rounded">Vendor Details</Link></li>
                                    <li><Link to="/vendor" className="link-dark rounded">Create Vendor</Link></li>

                                </ul>
                            </div>
                        </li>
                        <li className="border-top my-3"></li>
                        <li className="mb-1">
                            <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
                                <FaUserCircle className="me-2" /> Account
                            </button>
                            <div className="collapse" id="account-collapse">
                                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><Link to="/account/profile" className="link-dark rounded">Profile</Link></li>
                                    <li><Link to="/account/settings" className="link-dark rounded">Settings</Link></li>
                                    <li><button onClick={handleLogout} className="link-dark rounded btn">Sign out</button></li>
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
        </div>
        </>
    );
}

export default Sidebar;
