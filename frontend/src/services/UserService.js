import axios from "axios";

let registerUser=async (user)=>{
    let response=await axios.post(`http://localhost:8085/users`,user);
    return response.data;
}

let getUsers=async()=>{
    let response=await axios.get(`http://localhost:8085/users`);
    return response.data;
}

let isLoggedIn=()=>{
    return localStorage.getItem("username")!==null;
}

export {registerUser,getUsers,isLoggedIn};