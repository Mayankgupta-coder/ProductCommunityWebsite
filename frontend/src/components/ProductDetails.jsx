import React, { useState, useEffect } from 'react';
import { useParams} from "react-router-dom";
import { getProductById } from '../services/productService';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardContent, Typography, Box, Rating } from '@mui/material';
import "../style/ProductDetails.css";
import { getUsers } from '../services/UserService';
import { getReviews } from '../services/reviewService';
import Navbar from './Navbar';
import { getAvgProductRating } from '../services/statsService';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ProductReviews from './ProductReviews';
import PostProductReview from './PostProductReview';

function ProductDetails() {
    let { productId } = useParams();
    let [product, setProduct] = useState({});
    let [avgProductRating, setAvgProductRating] = useState(0);
    let [user, setUser] = useState();
    let [loggedInUserReview,setLoggedInUserReview]=useState([]);
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        getProductById(productId).then((product) => {
            setProduct(product);
            setShowLoader(false);
        }).catch((error) => {
            window.location.href = "/products/category/0";
        })

        let username = localStorage.getItem("username");
        if (username != null) {
            getUsers().then((registeredUsers) => {
                let user = registeredUsers.filter((user) => {
                    return user.userName === username;
                })
                console.log(user);
                setUser(user);
            }).catch((error) => {
                console.log("error");
            })
            getReviews().then((reviews) => {
                setLoggedInUserReview(reviews.filter((review) => {
                    return review.user.userName === username && review.product.productId === parseInt(productId);
                }));

            }).catch((error) => {
                console.log(error);
            })
        }

        getAvgProductRating(productId).then((rating) => {
            setAvgProductRating(rating);
        }).catch((error) => {
            console.log(error);
        })

    }, [productId]);

    
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
            <div id="main">
                <h1>{product.productName}</h1>
                <div id="product">
                    <div id="product_image">
                        <Card sx={{ width: 300, marginRight: '2%', marginBottom: '2%', marginLeft: '6%' }}>
                            <CardActionArea>
                                {
                                    product.productImage !== "test" ?
                                        (<>
                                            <CardMedia
                                                component="img"
                                                height="auto"
                                                width="auto"
                                                image={`/images/products/${product.productImage}`}
                                                alt="green iguana"
                                            />
                                        </>) :
                                        (<>
                                            <CardMedia
                                                component="img"
                                                height="auto"
                                                width="auto"
                                                image={`/images/products/default_product_image.jpg`}
                                                alt="green iguana"
                                            />
                                        </>)
                                }
                            </CardActionArea>
                        </Card>
                    </div>
                    <div id="product_details">
                        <Card sx={{ width: 800, height: "auto" }}>
                            <CardContent>
                                <br />
                                <h6>Brand</h6>
                                <Typography variant="body2" color="text.secondary">
                                    {product.productBrand}
                                </Typography>

                                <br />
                                <h6>Description</h6>
                                <Typography variant="body2" color="text.secondary">
                                    {product.productDescription}
                                </Typography>

                                <br />
                                <h6>Price</h6>
                                <Typography variant="body2" color="text.secondary">
                                    ₹ {product.productPrice}
                                </Typography>
                                <br />

                                <h6>Rating</h6>
                                <Box
                                    sx={{
                                        '& > legend': { mt: 2 },
                                    }}
                                >
                                    <Rating name="read-only" value={avgProductRating} readOnly />
                                </Box>
                            </CardContent>
                        </Card>
                    </div>

                </div>
                <br />
                
                <PostProductReview loggedInUserReview={loggedInUserReview} user={user} productId={productId}/>

                <ProductReviews productId={productId} />
                
            </div>
        </>
    )
}

export default ProductDetails