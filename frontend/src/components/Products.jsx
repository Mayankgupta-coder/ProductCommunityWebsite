import React, { useEffect, useState } from 'react'
import { MDBCheckbox } from 'mdb-react-ui-kit';
import axios from "axios";
import { useParams } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import '../style/Products.css';
import Navbar from './Navbar';
import { getProducts, filterProductsByBrand, getProductByCategoryId } from '../services/productService';
import Product from './Product';

function Products() {
    let [products, setProducts] = useState();
    let [brands, setBrands] = useState([]);
    let [uniqueBrand, setUniqueBrand] = useState([]);
    const [showLoader, setShowLoader] = useState(true);

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
                    setShowLoader(false);
                }).catch((error) => {
                    setProducts([]);
                    setShowLoader(false);
                    console.log("error");
                })
            } else {
                getProducts().then((product) => {
                    console.log(product);
                    setProducts(product);
                    setShowLoader(false);
                }).catch((error) => {
                    setShowLoader(false);
                    setProducts([]);
                    console.log("error");
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
            <Backdrop
                sx={{ color: 'red', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showLoader}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Navbar />

            <br />
            <h1>Products</h1>
            <br />
            <div id="product_page">
                {
                    products && products.length > 0 ? (<>
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
                                    <Product product={product} />
                                </>)
                            })}
                        </div>
                    </>) : (<>{products && products.length === Number(0) ? (<><h3 style={{ margin: "auto", marginTop: "10%", color: "red" }}>No Products available in this category....</h3></>) : (<></>)}</>)
                }
            </div>
        </>
    )
}

export default Products