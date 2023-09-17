import React, { useState, useEffect } from 'react'
import '../../style/admin/AddCategories.css';
import axios from "axios";
import {
    MDBInput,
    MDBBtn,
    MDBFile,
} from 'mdb-react-ui-kit';

function AddCategories() {

    let [category, setCategory] = useState({});
    let [categoryImage, setCategoryImage] = useState();
    
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
                <h1>Add Category</h1>
                <div id="add_category_form">
                    <form onSubmit={submit}>
                        <MDBInput className='mb-4' type='text' id='category_name' label='Category Name' name="category_name" onChange={(e)=>{setCategory({...category,categoryName:e.target.value,categoryImage:"test"})}} required/>
                        <MDBFile label='Category Image' id='category_image' name="category_image" onChange={(e)=>{setCategoryImage({categoryImage:e.target.files[0]})}} required/>
                        <br/>
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