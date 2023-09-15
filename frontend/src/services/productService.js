import axios from "axios"

let addProduct=async(product)=>{
    let response=await axios.post('http://localhost:8085/products', product);
    return response.data;
}

let uploadProductImage=async(productId,formData)=>{
    let response=axios.post(`http://localhost:8085//product/image/uplaod/${productId}`, formData);
    return response.data;
}
let getProducts=async ()=>{
    let response=await axios.get('http://localhost:8085/products');
    return response.data;
}

let getProductById=async (productId)=>{
    let response=await axios.get(`http://localhost:8085/products/${productId}`);
    return response.data;
}

let getProductByCategoryId=async(categoryId)=>{
    let response=await axios.get(`http://localhost:8085/products/category/${categoryId}`);
    return response.data;
}

let updateProductDetails=async(product)=>{
    let response=await axios.put(`http://localhost:8085/products/${product.productId}`,product);
    return response.data;
}

let filterProductsByBrand=async (brands,id)=>{
    let response=await axios.post(`http://localhost:8085/search/products/${id}`, { brands: brands });
    return response.data;
}
export {addProduct,uploadProductImage,getProducts,getProductById,getProductByCategoryId,updateProductDetails,filterProductsByBrand};