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

let filterProductsByBrand=async (brands)=>{
    let response=await axios.post('http://localhost:8085/search/products', { brands: brands });
    return response.data;
}
export {addProduct,uploadProductImage,getProducts,getProductById,filterProductsByBrand};