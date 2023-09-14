import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { MDBCheckbox } from 'mdb-react-ui-kit';
import axios from "axios";
import '../style/Products.css';
import { getProducts,filterProductsByBrand } from '../services/productService';

function Products() {
    let [products, setProducts] = useState([]);
    let [brands, setBrands] = useState([]);
    let [uniqueBrand,setUniqueBrand]=useState([]);

    useEffect(() => {
        console.log(process.env.PUBLIC_URL);
        getProducts().then((product)=>{
            setProducts(product);
        }).catch((error)=>{
            console.log(error);
        })

        axios.get('http://localhost:8085/brands').then((response) => {
            return response.data;
        }).then((data) => {
            console.log(data);
            setUniqueBrand(data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    useEffect(() => {
        if (brands.length > 0) {
            filterProductsByBrand(brands).then((product) => {
                setProducts(product);
            }).catch((error) => {
                console.log(error);
            })
        }
        else {
            getProducts().then((product)=>{
                setProducts(product);
            }).catch((error)=>{
                console.log(error);
            })
        }
    }, [brands]);

    let selectBrand=(e)=> {
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
            <h1>Products</h1>
            <div id="product_page">
                <div id="filter_product">
                    <h2>Brands</h2>
                    <br />
                    {
                        uniqueBrand.map((brand,index) => {
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
                                                    image={`images/products/${product.productImage}`}
                                                    alt="green iguana"
                                                />
                                            </>) :
                                            (<>
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={`images/products/default_product_image.jpg`}
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
                                    <Button size="small" color="primary">
                                        Share
                                    </Button>
                                </CardActions>
                            </Card>
                        </>)
                    })}
                </div>

            </div>



        </>
    )
}

export default Products