import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { getProductById } from '../services/productService';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardContent, Typography, Box, Rating } from '@mui/material';
import {
    MDBTextArea,
    MDBBtn
} from 'mdb-react-ui-kit';
import "../style/ProductDetails.css";
import { getUsers } from '../services/UserService';
import { postReview,getReviews } from '../services/reviewService';
import Navbar from './Navbar';
import { getAvgProductRating } from '../services/statsService';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import ProductReviews from './ProductReviews';

function ProductDetails() {
    let { productId } = useParams();
    let [product, setProduct] = useState({});
    let [avgProductRating, setAvgProductRating] = useState(0);
    let [productRating, setProductRating] = useState();
    let [review, setReview] = useState({});
    let [user, setUser] = useState();
    let [loggedInUserReview,setLoggedInUserReview]=useState([]);
    const [showLoader, setShowLoader] = useState(true);
    const [successAlertOpen, setSuccessAlertOpen] = useState(false);
    const [errorAlertOpen, setErrorAlertOpen] = useState(false);

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

    let submit = (e) => {
        e.preventDefault();
        console.log(review);
        if (review.rating > 0) {
            postReview(review).then((review) => {
                setSuccessAlertOpen(true);
                setTimeout(() => {
                    window.location.reload();
                }, 2000)
                console.log(review);
            }).catch((error) => {
                setErrorAlertOpen(true);
                console.log(error);
            })
        } else {
            setErrorAlertOpen(true);
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
                <br />
                <Box sx={{ width: '100%' }}>
                    <Collapse in={successAlertOpen}>
                        <Alert severity="success"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setSuccessAlertOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            Review Posted Successfully!
                        </Alert>
                    </Collapse>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <Collapse in={errorAlertOpen}>
                        <Alert severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setErrorAlertOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            Some Error Occured! Please Try Again!
                        </Alert>
                    </Collapse>
                </Box>
                {
                    loggedInUserReview.length === 0 ? (<div className="container mt-5">
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

                <ProductReviews productId={productId} />
            </div>
        </>
    )
}

export default ProductDetails