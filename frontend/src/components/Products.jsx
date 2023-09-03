import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { MDBCheckbox } from 'mdb-react-ui-kit';
import axios from "axios";
import '../style/Products.css'

function Products() {
    useEffect(() => {
        axios.get('http://localhost:8085/products').then((response) => {
            return response.data;
        }).then((data) => {
            console.log(data);
            setProducts(data);
            setProductsForBrand(data);
        }).catch((error) => {
            console.log(error);
        })
    }, [])
    let [products, setProducts] = useState([]);
    let [productsForBrand, setProductsForBrand] = useState([]);
    let [brands,setBrands]=useState([]);

    function filterProductsByBrand(e){
        // console.log(e.target.checked,e.target.value);
        let selected=e.target.checked;
        let value=e.target.value;
        if(selected) {
            setBrands([...brands,value]);
            console.log(brands);
        }
        else {
            let brand=brands.filter((brand)=>{
                return brand!==e.target.value;
            });
            console.log("brand",brand);
            setBrands(brand);
        }
        // console.log(brands);
        // axios.post('http://localhost:8085//search/products',{brands:brands}).then((response) => {
        //     return response.data;
        // }).then((data) => {
        //     console.log(data);
        //     setProducts(data);
        // }).catch((error) => {
        //     console.log(error);
        // })
    }
    return (
        <>
            <h1>Products</h1>
            <div id="product_page">
                <div id="filter_product">
                    <h2>Brands</h2>
                    <br/>
                    {
                        productsForBrand.map((product)=>{
                            return (
                                <>
                                    <MDBCheckbox onChange={filterProductsByBrand} name='flexCheck' value={product.productBrand} id='flexCheckDefault' label={product.productBrand} />
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
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product.productBrand}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.productDescription}
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