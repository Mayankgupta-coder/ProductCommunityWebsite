import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { MDBCheckbox } from 'mdb-react-ui-kit';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import '../style/Products.css';
import Navbar from './Navbar';
import { getProducts, filterProductsByBrand, getProductByCategoryId } from '../services/productService';

function Products() {
    let [products, setProducts] = useState([]);
    let [brands, setBrands] = useState([]);
    let [uniqueBrand, setUniqueBrand] = useState([]);
    let { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8085/brands/${id}`).then((response) => {
            return response.data;
        }).then((data) => {
            console.log(data);
            setUniqueBrand(data);
        }).catch((error) => {
            console.log(error);
        })
    }, [id]);

    useEffect(() => {
        if (brands.length > 0) {
            filterProductsByBrand(brands, id).then((product) => {
                setProducts(product);
            }).catch((error) => {
                console.log(error);
            })
        }
        else {
            if (id !== '0') {
                getProductByCategoryId(id).then((product) => {
                    console.log(product);
                    setProducts(product);
                }).catch((error) => {
                    console.log(error);
                })
            } else {
                getProducts().then((product) => {
                    console.log(product);
                    setProducts(product);
                }).catch((error) => {
                    console.log(error);
                })
            }
        }
    }, [brands, id]);

    let selectBrand = (e) => {
        if (e.target.checked) {
            setBrands([...brands, e.target.value]);
        }
        else {
            let brand = brands.filter((brand) => {
                return brand !== e.target.value;
            });

            setBrands(brand);
        }

    }
    return (
        <>
            <Navbar />
            <br />
            <h1>Products</h1>
            <div id="product_page">
                {
                    products.length > 0 ? (<>
                        <div id="filter_product">
                            <h2>Brands</h2>
                            <br />
                            {
                                uniqueBrand.map((brand, index) => {
                                    return (
                                        <>
                                            <MDBCheckbox onChange={selectBrand} key={index} name='flexCheck' value={brand} id='flexCheckDefault' label={brand} />
                                        </>
                                    )
                                })
                            }

                        </div>
                        <div id="products">
                            {products.map((product) => {
                                return (<>
                                    <Card sx={{ width: 300, marginRight: '2%', marginBottom: '2%' }}>
                                        <CardActionArea>
                                            {
                                                product.productImage !== "test" ?
                                                    (<>
                                                        <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image={`/images/products/${product.productImage}`}
                                                            alt="green iguana"
                                                        />
                                                    </>) :
                                                    (<>
                                                        <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image={`/images/products/default_product_image.jpg`}
                                                            alt="green iguana"
                                                        />
                                                    </>)
                                            }

                                            <CardContent>
                                                <span>Product Name:</span>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {product.productName}
                                                </Typography>
                                                <span>Product Brand:</span>
                                                <Typography variant="body2" color="text.secondary">
                                                    {product.productBrand}
                                                </Typography>
                                                <span>Product Price:</span>
                                                <Typography variant="body2" color="text.secondary">
                                                    {product.productPrice}
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
                                </>)
                            })}
                        </div>
                    </>) : (<><h3 style={{ margin: "auto", marginTop: "10%", color: "red" }}>No Products available in this category....</h3></>)
                }


            </div>
        </>
    )
}

export default Products