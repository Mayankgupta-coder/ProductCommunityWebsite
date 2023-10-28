import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

function Product({ product }) {
    return (
        <>
            <Card sx={{ width: 300, marginRight: '2%', marginBottom: '2%' }}>
                <CardActionArea>
                    {
                        product.productImage !== "test" ?
                            (<>
                                <CardMedia
                                    component="img"
                                    height="250"
                                    image={`/images/products/${product.productImage}`}
                                    alt="product"
                                />
                            </>) :
                            (<>
                                <CardMedia
                                    component="img"
                                    height="250"
                                    image={`/images/products/default_product_image.jpg`}
                                    alt="product"
                                />
                            </>)
                    }

                    <CardContent>
                        <span>Product Name</span>
                        <Typography gutterBottom variant="h5" component="div">
                            {product.productName}
                        </Typography>
                        <span>Product Brand</span>
                        <Typography variant="body2" color="text.secondary">
                            {product.productBrand}
                        </Typography>
                        <span>Product Price</span>
                        <Typography variant="body2" color="text.secondary">
                            ₹ {product.productPrice}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Link to={`/product/${product.productId}`}>
                        <Button size="small" color="primary">
                            View Product Details
                        </Button>
                    </Link>
                </CardActions>
            </Card>
        </>
    )
}

export default Product