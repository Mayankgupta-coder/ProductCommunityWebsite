import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import '../../style/admin/AddCategories.css';
import axios from "axios";
import {
    MDBInput,
    MDBBtn,
    MDBFile,
} from 'mdb-react-ui-kit';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Navbar from '../Navbar';

function AddCategories() {

    let [category, setCategory] = useState({});
    let [categoryImage, setCategoryImage] = useState();
    const [successAlertOpen, setSuccessAlertOpen] = useState(false);
    const [errorAlertOpen, setErrorAlertOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8085/categories').then((response) => {
            return response.data;
        }).then((data) => {
            console.log(data);
        }).catch((error) => {
            console.log(error);
        })
    }, [])


    let submit = (e) => {
        e.preventDefault();
        console.log("submit");
        console.log(category);
        console.log(categoryImage);
        const formData = new FormData();
        formData.append('categoryImage', categoryImage.categoryImage);
        axios.post('http://localhost:8085/categories', category).then((response) => {
            return response.data;
        }).then((data) => {
            console.log(data);
            axios.post(`http://localhost:8085/category/image/uplaod/${data.categoryId}`, formData).then((response) => {
                return response.data;
            }).then((data) => {
                console.log(data);
                setSuccessAlertOpen(true);
                setTimeout(() => {
                    navigate("/admin/manage/category");
                }, 2000);
            }).catch((error) => {
                console.log(error);
                setErrorAlertOpen(true);
            })
        }).catch((error) => {
            console.log(error);
            setErrorAlertOpen(true);
        })
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
                        Category Added Successfully!
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
                <h1>Add Category</h1>
                <div id="add_category_form">
                    <form onSubmit={submit}>
                        <MDBInput className='mb-4' type='text' id='category_name' label='Category Name' name="category_name" onChange={(e) => { setCategory({ ...category, categoryName: e.target.value, categoryImage: "test" }) }} required />
                        <MDBFile label='Category Image' id='category_image' name="category_image" onChange={(e) => { setCategoryImage({ categoryImage: e.target.files[0] }) }} required />
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

export default AddCategories