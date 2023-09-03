import React, { useEffect, useState } from 'react'
import '../style/HomePage.css'
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReviewsIcon from '@mui/icons-material/Reviews';
import CategoryIcon from '@mui/icons-material/Category';
import axios from "axios";

function HomePage() {
    let [categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8085/categories').then((response) => {
            return response.data;
        }).then((data) => {
            console.log(data);
            setCategories(data);
        }).catch((error) => {
            console.log(error);
        })
    }, [])
    return (
        <>
            <div id="main">
                <div id="all_stats">
                    <div className="stats" id="total_users">
                        <div className="icon"><PersonIcon fontSize="large" /></div>
                        <div className="stat">
                            0
                            <br />
                            Users
                        </div>
                    </div>
                    <div className="stats" id="total_products">
                        <div className="icon"><InventoryIcon fontSize="large" /></div>
                        <div className="stat">
                            0
                            <br />
                            Products
                        </div>
                    </div>
                    <div className="stats" id="total_categories">
                        <div className="icon">< CategoryIcon fontSize="large" /></div>
                        <div className="stat">
                            0
                            <br />
                            Categories
                        </div>
                    </div>
                    <div className="stats" id="total_reviews">
                        <div className="icon"><ReviewsIcon fontSize="large" /></div>
                        <div className="stat">
                            0
                            <br />
                            Reviews
                        </div>
                    </div>
                </div>

                <div id="categories">
                    <h1>Categories</h1>
                    <div id="display_categories">
                        {
                            categories.map((category) => {
                                return (
                                    <>
                                        <div className="category">

                                            <img className="category_img" src={`images/${category.categoryImage}`} alt="img" />

                                            <div id="category_name" style={{ border: "2px solid red" }}>
                                                {category.categoryName}
                                            </div>

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