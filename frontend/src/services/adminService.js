import axios from "axios";

let getAdmin=async()=>{
    let response=await axios.get(`http://localhost:8085/admin`);
    return response.data;
}

let isAdminLoggedIn=()=>{
    return localStorage.getItem("admin")!==null;
}

let logoutAdmin=()=>{
    localStorage.removeItem("admin");
}

export {getAdmin,isAdminLoggedIn,logoutAdmin}