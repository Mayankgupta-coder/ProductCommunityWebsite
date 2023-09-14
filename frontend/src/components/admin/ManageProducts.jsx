import React, { useState, useEffect } from 'react'
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { getProducts } from '../../services/productService';

function ManageProducts() {
    useEffect(() => {
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
                                                
                                                {
                                                    product.productImage!=="test"?<img
                                                    src={`/images/products/${product.productImage}`}
                                                    alt='product'
                                                    style={{ width: '45px', height: '45px' }}
                                                    className='rounded-circle'
                                                />:<img
                                                src={`/images/products/default_product_image.jpg`}
                                                alt='product'
                                                style={{ width: '45px', height: '45px' }}
                                                className='rounded-circle'
                                            />
                                                }
                                                
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