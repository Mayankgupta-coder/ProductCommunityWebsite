import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/products/category/0" className="nav-link">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Dashboard</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex align-items-center">
                        <Link to="/login/user" className="nav-link">
                            <button type="button" className="btn btn-primary me-3">
                                Login
                            </button>
                        </Link>

                        <Link to="/register/user" className="nav-link">
                            <button type="button" className="btn btn-primary me-3">
                                Register
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar