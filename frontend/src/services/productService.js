import axios from "axios"

let getProducts=async ()=>{
    let response=await axios.get('http://localhost:8085/products');
    return response.data;
}

export {getProducts};