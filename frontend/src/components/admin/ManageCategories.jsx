import React, { useState, useEffect } from 'react'
import axios from "axios";
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

function ManageCategories() {
    let [categories, setCategories] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8085/categories').then((response) => {
            return response.data;
        }).then((data) => {
            console.log(data);
            setCategories(data)
        }).catch((error) => {
            console.log(error);
        })
    }, [])

   
    return (
        <>
            <h1>Manage Category Details</h1>
            <MDBTable align='middle' className="container">
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Id</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Update</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {
                        categories.map((category) => {
                            return (
                                <>
                                    <tr>
                                        <td>
                                            <div className='d-flex align-items-center'>
                                                <img
                                                    src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                                    alt=''
                                                    style={{ width: '45px', height: '45px' }}
                                                    className='rounded-circle'
                                                />
                                                <div className='ms-3'>
                                                    <p className='fw-normal mb-1'>{category.categoryId}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <p className='fw-bold mb-1'>{category.categoryName}</p>
                                        </td>
                                        
                                        <td>
                                            <MDBBtn color='primary' rounded size='sm'>
                                                Edit
                                            </MDBBtn>
                                        </td>
                                        <td>
                                            <MDBBtn color='danger' rounded size='sm'>
                                                Delete
                                            </MDBBtn>
                                        </td>
                                    </tr>
                                </>
                            )
                        })
                    }

                </MDBTableBody>
            </MDBTable>
        </>
    )
}

export default ManageCategories