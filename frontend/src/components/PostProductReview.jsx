import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
    MDBTextArea,
    MDBBtn
} from 'mdb-react-ui-kit';
import { Rating,Box } from '@mui/material';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { postReview } from '../services/reviewService';

function PostProductReview({ loggedInUserReview, user, productId }) {
    let [review, setReview] = useState({});
    let [productRating, setProductRating] = useState();
    const [successAlertOpen, setSuccessAlertOpen] = useState(false);
    const [errorAlertOpen, setErrorAlertOpen] = useState(false);
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
                        {
                            review.rating>0?"Some Error Occured! Please Try Again!":"Please Rate Product"
                        }
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
        </>
    )
}

export default PostProductReview