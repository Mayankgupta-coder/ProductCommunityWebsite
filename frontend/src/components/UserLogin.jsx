import React, { useState, useEffect } from 'react';
import {
    MDBInput,
    MDBBtn,
} from 'mdb-react-ui-kit';
import "../style/UserRegistration.css";
import {getUsers } from '../services/UserService';

function UserLogin() {
    useEffect(() => {
        getUsers().then((users) => {
            console.log(users);
            setRegisteredUsers(users);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    let [user, setUser] = useState({});
    let [registeredUsers, setRegisteredUsers] = useState({});

    let submit = (e) => {
        e.preventDefault();
        
        let res = registeredUsers.filter((registereduser) => {
            return (user.userName === registereduser.userName && user.password===registereduser.password);
        })
        console.log(user.userName,user.password,res);
        if (res.length > 0) {
            console.log("login");
            localStorage.setItem("username",user.userName);
        } else {
            console.log("not exist");
        }

    }
    return (
        <>
            <div id="main">
                <h1>User Login</h1>
                <div id="register_user_form">
                    <form onSubmit={submit}>
                        <MDBInput className='mb-4' type='text' id='username' label='Username' name="username" onChange={(e) => setUser({ ...user, userName: e.target.value })} required />
                        <MDBInput className='mb-4' type='password' id='password' label='Password' name="password" onChange={(e) => setUser({ ...user, password: e.target.value })} required />
                        <MDBBtn type='submit' block>
                           Login
                        </MDBBtn>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UserLogin