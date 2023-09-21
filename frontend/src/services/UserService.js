import axios from "axios";

let registerUser=async (user)=>{
    let response=await axios.post(`http://localhost:8085/users`,user);
    return response.data;
}

let getUsers=async()=>{
    let response=await axios.get(`http://localhost:8085/users`);
    return response.data;
}

let isUserLoggedIn=()=>{
    return localStorage.getItem("username")!==null;
}

let logoutUser=()=>{
    localStorage.removeItem("username");
    window.location.href="/";
}

export {registerUser,getUsers,isUserLoggedIn,logoutUser};