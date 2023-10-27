import React, { useEffect, useState } from 'react'
import '../style/HomePage.css'
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReviewsIcon from '@mui/icons-material/Reviews';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { getRegisteredUsersCount, getProductsCount, getReviewsCount } from '../services/statsService';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function HomePage() {
    let [categories, setCategories] = useState([]);
    let [registeredUsersCount, setRegisteredUsersCount] = useState(0);
    let [productsCount, setProductsCount] = useState(0);
    let [reviewsCount, setReviewsCount] = useState(0);
    const [showLoader, setShowLoader] = useState(true);
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };


    useEffect(() => {
        axios.get('http://localhost:8085/categories').then((response) => {
            return response.data;
        }).then((categories) => {
            console.log(categories);
            setCategories(categories);
            setShowLoader(false);
        }).catch((error) => {
            setShowLoader(false);
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
            <Backdrop
                sx={{ color: 'red', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showLoader}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Navbar />

            <br />
            <div id="main_div">
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
                        <Carousel responsive={responsive} customTransition="all .5"
                            transitionDuration={500} showDots={true} dotListClass="custom-dot-list-style"
                            itemClass="carousel-item-padding-40-px" containerClass="carousel-container">
                            {
                                categories.map((category) => {
                                    return (
                                        <>
                                            <div className="category">

                                                {category.categoryImage !== "test" ?
                                                    (<img className="category_img" src={`images/${category.categoryImage}`} alt="img" />)
                                                    : (<img className="category_img" src={`images/products/default_product_image.jpg`} alt="img" />)}
                                                <div id="btn_div" style={{ height:"100%",width:"100%"}}>
                                                    <Link to={`/products/category/${category.categoryId}`}>
                                                        <Button id="category_btn" style={{ marginLeft: "20%",marginTop:"15%",width:"60%" }} variant="contained" size="small" color="primary">
                                                            {category.categoryName}
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </Carousel>

                    </div>

                </div>
                <br/>
            </div>
            <br />
            <Footer />
        </>
    )
}

export default HomePage