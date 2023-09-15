import React,{useState,useEffect} from 'react';
import {
    MDBInput,
    MDBBtn,
} from 'mdb-react-ui-kit';
import "../style/UserRegistration.css";
import { registerUser,getUsers } from '../services/UserService';

function UserRegistration() {
    useEffect(()=>{
        getUsers().then((users)=>{
            console.log(users);
            setRegisteredUsers(users);
        }).catch((error)=>{
            console.log(error);
        })
    },[])

    let [user,setUser]=useState({});
    let [registeredUsers,setRegisteredUsers]=useState({});
    let [repeatedPassword,setRepeatedPassword]=useState("");

    let submit=(e)=>{
        e.preventDefault();
        if(user.password===repeatedPassword) {
            let res=registeredUsers.filter((registereduser)=>{
                return user.userName===registereduser.userName;
            })
            if(res.length>0) {
                console.log("exist");
            } else {
                registerUser(user).then((user)=>{
                console.log(user);
                }).catch((error)=>{
                    console.log("error");
                })
            }
        } else {
            console.log("error");
        }
    }
  return (
    <>
            <div id="main">
                <h1>User Registration</h1>
                <div id="register_user_form">
                    <form onSubmit={submit}>
                        <MDBInput className='mb-4' type='text' id='username' label='Username' name="username" onChange={(e)=>setUser({...user,userName:e.target.value})} required />
                        <MDBInput className='mb-4' type='password' id='password' label='Password' name="password" onChange={(e)=>setUser({...user,password:e.target.value})} required />
                        <MDBInput className='mb-4' type='password' id='repeat_password' label='Repeat Password' name="repeat_password" onChange={(e)=>setRepeatedPassword(e.target.value)}required />
                        <MDBBtn type='submit' block>
                            Register
                        </MDBBtn>
                    </form>
                </div>
            </div>
        </>
  )
}

export default UserRegistration