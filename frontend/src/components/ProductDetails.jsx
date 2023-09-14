import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getProductById } from '../services/productService';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardContent, Typography, Box, Rating } from '@mui/material';
import {
    MDBTextArea,
    MDBBtn
} from 'mdb-react-ui-kit';
import "../style/ProductDetails.css";

function ProductDetails() {
    let { id } = useParams();
    let [productId, setProductId] = useState(id);
    let [product, setProduct] = useState({});
    const [value, setValue] = useState(2);

    useEffect(() => {
        getProductById(productId).then((product) => {
            setProduct(product);
            console.log(product.productImage);
        }).catch((error) => {
            window.location.href="/products";
        })
    }, [productId]);

    return (
        <>
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
                                    {product.productImage}
                                </Typography>

                                <br />
                                <h6>Description</h6>
                                <Typography variant="body2" color="text.secondary">
                                    {product.productDescription}
                                </Typography>

                                <br />
                                <h6>Price</h6>
                                <Typography variant="body2" color="text.secondary">
                                    {product.productPrice}
                                </Typography>
                                <br />

                                <h6>Rating</h6>
                                <Box
                                    sx={{
                                        '& > legend': { mt: 2 },
                                    }}
                                >
                                    <Rating name="read-only" value={value} readOnly />
                                </Box>
                            </CardContent>
                        </Card>
                    </div>

                </div>
                <div className="container mt-4">
                    <h3>Please give us your valuable feedback</h3>
                    <form >
                        <MDBTextArea
                            className='mb-4'
                            label='Product Description'
                            id='product_desc'
                            name="product_desc"
                            required
                        />
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                        <MDBBtn type='submit' block>
                            Submit
                        </MDBBtn>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ProductDetails