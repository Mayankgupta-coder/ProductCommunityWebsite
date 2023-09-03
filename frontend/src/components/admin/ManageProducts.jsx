import React, { useState, useEffect } from 'react'
// import axios from "axios";
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { getProducts } from '../../services/productService';

function ManageProducts() {
    useEffect(() => {
        // axios.get('http://localhost:8085/products').then((response) => {
        //     return response.data;
        // }).then((data) => {
        //     console.log(data);
        //     setProducts(data)
        // }).catch((error) => {
        //     console.log(error);
        // })
        let products=getProducts();
        products.then((product)=>{
            console.log(product);
            setProducts(product);
        }).catch((error)=>{
            console.log(error);
        })
    }, [])

    let [products, setProducts] = useState([]);
    return (
        <>
            <h1>Manage Product Details</h1>
            <MDBTable align='middle' className="container">
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Id</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Brand</th>
                        <th scope='col'>Category</th>
                        <th scope='col'>Price</th>
                        <th scope='col'>Update</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {
                        products.map((product) => {
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
                                                    <p className='fw-normal mb-1'>{product.productId}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <p className='fw-bold mb-1'>{product.productName}</p>

                                        </td>

                                        <td>
                                            <p className='fw-normal mb-1'>{product.productBrand}</p>
                                        </td>

                                        <td>{product.category.categoryName}</td>

                                        <td>
                                            <p className='fw-normal mb-1'>{product.productPrice}</p>
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

export default ManageProducts