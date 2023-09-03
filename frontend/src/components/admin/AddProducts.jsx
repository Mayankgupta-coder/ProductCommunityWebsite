import React, { useState, useEffect } from 'react'
import '../../style/admin/AddProducts.css';
import axios from "axios";
import {
    MDBInput,
    MDBBtn,
    MDBFile,
    MDBTextArea,
} from 'mdb-react-ui-kit';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

function AddProducts() {

    useEffect(() => {
        axios.get('http://localhost:8085/products').then((response) => {
            return response.data;
        }).then((data) => {
            console.log(data);
        }).catch((error) => {
            console.log(error);
        })

        axios.get('http://localhost:8085/categories').then((response) => {
            return response.data;
        }).then((data) => {
            console.log(data);
            setCategories(data);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    let [product, setProduct] = useState({});
    let [productImage, setProductImage] = useState();
    let [categories, setCategories] = useState([]);

    let submit = (e) => {
        e.preventDefault();
        console.log("submit");
        console.log(product);
        console.log(productImage);
        const formData = new FormData();
        formData.append('productImage', productImage.productImage);
        axios.post('http://localhost:8085/products', product).then((response) => {
            return response.data;
        }).then((data) => {
            console.log(data);
            axios.post(`http://localhost:8085//product/image/uplaod/${product.productId}`, formData).then((response) => {
                return response.data;
            }).then((data) => {
                console.log(data);
            }).catch((error) => {
                console.log(error);
            })
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
                        <MDBInput className='mb-4' type='text' id='product_id' label='Product ID' name="product_id" onChange={(e) => { setProduct({ ...product, productId: e.target.value }) }} required />
                        <MDBInput className='mb-4' type='text' id='product_name' label='Product Name' name="product_name" onChange={(e) => { setProduct({ ...product, productName: e.target.value, productImage: "test" }) }} required />
                        <MDBTextArea
                            className='mb-4'
                            label='Product Description'
                            id='product_desc'
                            name="product_desc"
                            onChange={(e) => { setProduct({ ...product, productDescription: e.target.value }) }}
                            required
                        />
                        <MDBInput className='mb-4' type='text' id='product_brand' label='Product Brand' name="product_brand" onChange={(e) => { setProduct({ ...product, productBrand: e.target.value }) }} required />
                        <MDBInput className='mb-4' type='text' id='product_price' label='Product Price' name="product_price" onChange={(e) => { setProduct({ ...product, productPrice: e.target.value }) }} required />
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
                            defaultValue="1"
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
                    
                        <MDBFile label='Product Image' id='product_image' name="product_image" onChange={(e) => { setProductImage({ productImage: e.target.files[0] }) }} required />
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

export default AddProducts