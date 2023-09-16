import axios from "axios";

let postReview=async(review)=>{
    let response=await axios.post('http://localhost:8085/reviews',review);
    return response.data;
}

let getReviews=async()=>{
    let response=await axios.get('http://localhost:8085/reviews');
    return response.data;
}
export {postReview,getReviews};