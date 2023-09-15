import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import '../../style/admin/AddProducts.css';
import {
    MDBInput,
    MDBBtn,
    MDBTextArea,
} from 'mdb-react-ui-kit';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { updateProductDetails,getProductById } from '../../services/productService';

function UpdateProductDetails() {
    let { id } = useParams();
    let [productId, setProductId] = useState(id);

    let [product, setProduct] = useState({});
    let [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8085/categories').then((response) => {
            return response.data;
        }).then((data) => {
            console.log(data);
            setCategories(data);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    useEffect(() => {
        getProductById(productId).then((product) => {
            console.log(product);
            setProduct(product);
        }).catch((error) => {
            window.location.href="/products";
        })
    }, [productId]);

    let submit = (e) => {
        e.preventDefault();
        console.log("submit");
        console.log(product);

        updateProductDetails(product).then((product) => {
            console.log(product);
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <>
            <div id="main">
                <h1>Add Product</h1>
                <div id="add_product_form">
                    <form onSubmit={submit}>
                        <MDBInput className='mb-4' type='text' value={product.productId} id='product_id' label='Product ID' name="product_id" onChange={(e) => { setProduct({ ...product, productId: e.target.value }) }} readonly required />
                        <MDBInput className='mb-4' type='text' value={product.productName} id='product_name' label='Product Name' name="product_name" onChange={(e) => { setProduct({ ...product, productName: e.target.value}) }} readonly required />
                        <MDBTextArea
                            className='mb-4'
                            label='Product Description'
                            id='product_desc'
                            name="product_desc"
                            value={product.productDescription}
                            onChange={(e) => { setProduct({ ...product, productDescription: e.target.value }) }}
                            required
                        />
                        <MDBInput className='mb-4' type='text' value={product.productBrand} id='product_brand' label='Product Brand' name="product_brand" onChange={(e) => { setProduct({ ...product, productBrand: e.target.value }) }} required />
                        <MDBInput className='mb-4' type='text' value={product.productPrice} id='product_price' label='Product Price' name="product_price" onChange={(e) => { setProduct({ ...product, productPrice: e.target.value }) }} required />
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 0, width: '100%' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                        <TextField
                            className='mb-4'
                            id="product_category"
                            select
                            label="Category"
                            defaultValue='1'
                            helperText="Please select category"
                            onChange={(e)=>{
                                setProduct({...product,category:{categoryId:e.target.value}});
                            }}
                        >
                            {categories.map((category) => (
                                <MenuItem value={category.categoryId}>
                                    {category.categoryName}
                                </MenuItem>
                            ))}
                        </TextField>
                        </Box>
                        <br />
                        <MDBBtn type='submit' block>
                            Submit
                        </MDBBtn>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateProductDetails