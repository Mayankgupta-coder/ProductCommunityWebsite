import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { getProductById } from '../services/productService';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardContent, Typography, Box, Rating } from '@mui/material';
import {
    MDBTextArea,
    MDBBtn,
    MDBListGroup,
    MDBListGroupItem,
    MDBBadge
} from 'mdb-react-ui-kit';
import "../style/ProductDetails.css";
import { getUsers } from '../services/UserService';
import { postReview, getReviews } from '../services/reviewService';
import Navbar from './Navbar';
import { getAvgProductRating } from '../services/statsService';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function ProductDetails() {
    let { productId } = useParams();
    let [product, setProduct] = useState({});
    let [avgProductRating, setAvgProductRating] = useState(0);
    let [productRating, setProductRating] = useState();
    let [review, setReview] = useState({});
    let [user, setUser] = useState();
    let [productReviews, setProductReviews] = useState([]);
    let [loggedInUserReview, setLoggedInUserReview] = useState([]);
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        getProductById(productId).then((product) => {
            setProduct(product);
            setShowLoader(false);
        }).catch((error) => {
            window.location.href = "/products";
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
        }

        if (username != null) {
            getReviews().then((reviews) => {
                setLoggedInUserReview(reviews.filter((review) => {
                    return review.user.userName === username && review.product.productId === parseInt(productId);
                }));
                setProductReviews(reviews.filter((review) => {
                    return review.product.productId === parseInt(productId) && review.user.userName !== username;
                }));

            }).catch((error) => {
                console.log(error);
            })
        } else {
            getReviews().then((reviews) => {
                setProductReviews(reviews.filter((review) => {
                    return review.product.productId === parseInt(productId);
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

    let submit = (e) => {
        e.preventDefault();
        console.log(review);
        if (review.rating > 0) {
            postReview(review).then((review) => {
                console.log(review);
            }).catch((error) => {
                console.log(error);
            })
        } else {
            console.log("Please rate");
        }
    }

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
                {
                    loggedInUserReview.length === 0 ? (<div className="container mt-4">
                        <h3>Please give us your valuable feedback</h3>
                        <form onSubmit={submit}>
                            <MDBTextArea
                                className='mb-4'
                                label='Product Description'
                                id='product_desc'
                                name="product_desc"
                                onChange={(e) => setReview({ ...review, review: e.target.value, isApproved: true, product: { productId: productId }, user: { userId: user[0].userId } })}
                                required
                            />
                            <Rating
                                name="simple-controlled"
                                value={productRating}
                                onChange={(e) => {
                                    setProductRating(e.target.value);
                                    setReview({ ...review, rating: e.target.value });
                                }}
                                required
                            />
                            {
                                localStorage.getItem("username") ? <MDBBtn type='submit' block>
                                    Submit
                                </MDBBtn> : <Link to="/login/user"><MDBBtn block>
                                    Please login to continue
                                </MDBBtn></Link>
                            }
                        </form>
                    </div>) : (null)
                }

                <div className="container" id="reviews">
                    <h2 style={{ marginLeft: "40%", marginTop: "3%" }}>Reviews</h2>
                    {
                        (loggedInUserReview.length > 0 || productReviews.length > 0) ? <div style={{ maxWidth: '22rem' }}>
                            <MDBListGroup style={{ minWidth: '60rem' }} light className='mb-3'>
                                {
                                    loggedInUserReview.map((review) => {
                                        return (
                                            <MDBListGroupItem>
                                                <h5 className='fw-bold'>{review.user.userName}</h5>
                                                <MDBBadge className='mb-2' pill light color='success'>
                                                    Your Review
                                                </MDBBadge>
                                                <p className='text-muted mb-2 fw-bold'>
                                                    <Rating
                                                        name="simple-controlled"
                                                        value={review.rating}
                                                        readOnly
                                                    /></p>
                                                <p className='text-muted mb-0'>
                                                    {review.review}
                                                </p>
                                            </MDBListGroupItem>
                                        )
                                    })
                                }
                                {
                                    productReviews.map((review) => {
                                        return (
                                            <MDBListGroupItem>
                                                <h5 className='fw-bold'>{review.user.userName}</h5>
                                                <p className='text-muted mb-2 fw-bold'><Rating
                                                    name="simple-controlled"
                                                    value={review.rating}
                                                    readOnly
                                                /></p>
                                                <p className='text-muted mb-0'>
                                                    {review.review}
                                                </p>
                                            </MDBListGroupItem>
                                        )
                                    })
                                }
                            </MDBListGroup>

                        </div> : (<h2 style={{ color: "red", marginLeft: "30%" }}>*No Reviews for this product</h2>)
                    }

                </div>
            </div>
        </>
    )
}

export default ProductDetails