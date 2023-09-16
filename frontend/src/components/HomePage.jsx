import React, { useEffect, useState } from 'react'
import '../style/HomePage.css'
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReviewsIcon from '@mui/icons-material/Reviews';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Navbar from './Navbar';
import { getRegisteredUsersCount, getProductsCount, getReviewsCount } from '../services/statsService';

function HomePage() {
    let [categories, setCategories] = useState([]);
    let [registeredUsersCount, setRegisteredUsersCount] = useState(0);
    let [productsCount, setProductsCount] = useState(0);
    let [reviewsCount, setReviewsCount] = useState(0);
    useEffect(() => {
        axios.get('http://localhost:8085/categories').then((response) => {
            return response.data;
        }).then((data) => {
            console.log(data);
            setCategories(data);
        }).catch((error) => {
            console.log(error);
        })

        getRegisteredUsersCount().then((registeredUsers) => {
            setRegisteredUsersCount(registeredUsers);
        }).catch((error) => {
            console.log(error);
        })

        getProductsCount().then((productCount) => {
            setProductsCount(productCount);
        }).catch((error) => {
            console.log(error);
        })

        getReviewsCount().then((reviewCount) => {
            setReviewsCount(reviewCount);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    return (
        <>
            <Navbar />
            <br />
            <div id="main">
                <div id="all_stats">
                    <div className="stats" id="total_users">
                        <div className="icon"><PersonIcon fontSize="large" /></div>
                        <div className="stat">
                            {registeredUsersCount}
                            <br />
                            Users
                        </div>
                    </div>
                    <div className="stats" id="total_products">
                        <div className="icon"><InventoryIcon fontSize="large" /></div>
                        <div className="stat">
                            {productsCount}
                            <br />
                            Products
                        </div>
                    </div>
                    <div className="stats" id="total_reviews">
                        <div className="icon"><ReviewsIcon fontSize="large" /></div>
                        <div className="stat">
                            {reviewsCount}
                            <br />
                            Reviews
                        </div>
                    </div>
                </div>

                <div id="categories">
                    <br />
                    <h1>Categories</h1>
                    <div id="display_categories">
                        {
                            categories.map((category) => {
                                return (
                                    <>
                                        <div className="category">

                                            {category.categoryImage !== "test" ? (<img className="category_img" src={`images/${category.categoryImage}`} alt="img" />) : (<img className="category_img" src={`images/products/default_product_image.jpg`} alt="img" />)}

                                            {/* <div id="category_name" style={{ margin: "auto", marginTop: "5%" }}>
                                                {category.categoryName}
                                            </div> */}
                                            <Link to={`/products/category/${category.categoryId}`}>
                                                <Button id="category_name" style={{ marginLeft: "100%", marginTop: "20%" }} size="small" color="primary">
                                                    {category.categoryName}
                                                </Button>
                                            </Link>
                                        </div>
                                    </>
                                )
                            })
                        }

                    </div>

                </div>
            </div>

        </>
    )
}

export default HomePage