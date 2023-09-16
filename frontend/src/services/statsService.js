import axios from "axios";

let getRegisteredUsersCount=async()=>{
    let response=await axios.get('http://localhost:8085/stats/users');
    return response.data;
}

let getProductsCount=async()=>{
    let response=await axios.get('http://localhost:8085/stats/products');
    return response.data;
}

let getReviewsCount=async()=>{
    let response=await axios.get('http://localhost:8085/stats/reviews');
    return response.data;
}

let getAvgProductRating=async(productId)=>{
    let response=await axios.get(`http://localhost:8085/stats/product/${productId}/rating`);
    return response.data;
}
export {getRegisteredUsersCount,getProductsCount,getReviewsCount,getAvgProductRating}