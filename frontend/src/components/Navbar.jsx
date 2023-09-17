import React from 'react'
import { Link } from 'react-router-dom';
import { isAdminLoggedIn,logoutAdmin } from '../services/adminService';
import { isUserLoggedIn, logoutUser } from '../services/UserService';

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
                            {
                                isAdminLoggedIn() ? <>
                                    <li className="nav-item">
                                        <Link to="/admin/add/product" className="nav-link">Add Product</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/manage/product" className="nav-link">Manage Product</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/add/category" className="nav-link">Add Category</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/manage/category" className="nav-link">Manage Category</Link>
                                    </li>
                                </> : null
                            }

                        </ul>
                    </div>
                    <div className="d-flex align-items-center">
                        {
                            isUserLoggedIn() ? <>
                                <button onClick={logoutUser} type="button" className="btn btn-primary me-3">
                                    Logout(User)
                                </button>
                            </> : <Link to="/login/user" className="nav-link">
                                <button type="button" className="btn btn-primary me-3">
                                    Login As User
                                </button>
                            </Link>
                        }
                        {
                            isAdminLoggedIn() ? <>
                                    <button onClick={logoutAdmin} type="button" className="btn btn-primary me-3">
                                        Logout(Admin)
                                    </button>
                            </> : <Link to="/login/admin" className="nav-link">
                                <button type="button" className="btn btn-primary me-3">
                                    Login As Admin
                                </button>
                            </Link>
                        }
                        <Link to="/register/user" className="nav-link">
                            <button type="button" className="btn btn-primary me-3">
                                Register As User
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar