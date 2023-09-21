import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
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
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { addProduct, uploadProductImage,getProducts } from '../../services/productService';
import Navbar from '../Navbar';

function AddProducts() {

    let [product, setProduct] = useState({});
    let [allProducts, setAllProducts] = useState([]);
    let [productImage, setProductImage] = useState();
    let [categories, setCategories] = useState([]);
    const [successAlertOpen, setSuccessAlertOpen] = useState(false);
    const [errorAlertOpen, setErrorAlertOpen] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8085/categories').then((response) => {
            return response.data;
        }).then((data) => {
            console.log(data);
            setCategories(data);
        }).catch((error) => {
            console.log(error);
        })

        getProducts().then((products)=>{
            console.log(products);
            setAllProducts(products);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    const navigate = useNavigate();

    let submit = (e) => {
        e.preventDefault();
        console.log("submit");
        console.log(product);
        console.log(productImage);
        const formData = new FormData();
        formData.append('productImage', productImage.productImage);

        let isProductAlreadyExist=allProducts.filter((myProduct)=>{
            return myProduct.productId===Number(product.productId);
        })
        
        if(isProductAlreadyExist.length>0)
        {
            setErrorAlertOpen(true);
        } else {
            addProduct(product).then((product) => {
                console.log(product);
                uploadProductImage(product.productId, formData).then((productImage) => {
                    console.log(productImage);
                    setSuccessAlertOpen(true);
                    setTimeout(() => {
                        navigate("/admin/manage/product");
                    }, 2000)
                }).catch((error) => {
                    console.log(error);
                    setErrorAlertOpen(true);
                })
            }).catch((error) => {
                console.log(error);
                setErrorAlertOpen(true);
            })
        }
        
    }
    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Collapse in={successAlertOpen}>
                    <Alert severity="success"
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
                        Product Added Successfully!
                    </Alert>
                </Collapse>
            </Box>
            <Box sx={{ width: '100%' }}>
                <Collapse in={errorAlertOpen}>
                    <Alert severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setErrorAlertOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        Some Error Occured! Please Try Again!
                    </Alert>
                </Collapse>
            </Box>
            <Navbar />
            <br />
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
                                onChange={(e) => {
                                    setProduct({ ...product, category: { categoryId: e.target.value } });
                                }}
                            >
                                {categories.map((category) => (
                                    <MenuItem value={category.categoryId}>
                                        {category.categoryName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>

                        <MDBFile label='Product Image' id='upload_product_image' name="product_image" onChange={(e) => { setProductImage({ productImage: e.target.files[0] }) }} required />
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