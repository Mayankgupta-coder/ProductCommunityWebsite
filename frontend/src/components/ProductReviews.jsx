import React, { useEffect,useState } from 'react'
import { Rating } from '@mui/material';
import {
    MDBListGroup,
    MDBListGroupItem,
    MDBBadge
} from 'mdb-react-ui-kit';
import { getReviews } from '../services/reviewService';

function ProductReviews({ productId}) {
    let [productReviews, setProductReviews] = useState([]);
    let [loggedInUserReview, setLoggedInUserReview] = useState([]);

    useEffect(() => {
        let username = localStorage.getItem("username");
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
    },[productId])

    return (
        <>
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
        </>
    )
}

export default ProductReviews