import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import '../../style/admin/AddProducts.css';
import {
    MDBInput,
    MDBBtn,
    MDBTextArea,
} from 'mdb-react-ui-kit';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Navbar from '../Navbar';
import { updateProductDetails, getProductById } from '../../services/productService';

function UpdateProductDetails() {
    let { productId } = useParams();

    let [product, setProduct] = useState({});
    const [successAlertOpen, setSuccessAlertOpen] = useState(false);

    useEffect(() => {
        getProductById(productId).then((product) => {
            console.log(product);
            setProduct(product);
        }).catch((error) => {
            window.location.href = "/products";
        })
    }, [productId]);

    let submit = (e) => {
        e.preventDefault();
        console.log("submit");
        console.log(product);

        updateProductDetails(product).then((product) => {
            console.log(product);
            setSuccessAlertOpen(true);
            setTimeout(()=>{
                window.location.href="/admin/manage/product"
            },2000)
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Collapse in={successAlertOpen}>
                    <Alert
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
                        Product Details Updated Successfully!
                    </Alert>
                </Collapse>
            </Box>
            <Navbar/>
            <br/>
            <div id="main">
                <h1>Update Product Details</h1>
                <div id="add_product_form">
                    <form onSubmit={submit}>
                        <MDBInput className='mb-4' type='text' value={product.productId} id='product_id' label='Product ID' name="product_id" onChange={(e) => { setProduct({ ...product, productId: e.target.value }) }} readonly required />
                        <MDBInput className='mb-4' type='text' value={product.productName} id='product_name' label='Product Name' name="product_name" onChange={(e) => { setProduct({ ...product, productName: e.target.value }) }} readonly required />
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