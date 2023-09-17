import React, { useState, useEffect } from 'react';
import {
    MDBInput,
    MDBBtn,
} from 'mdb-react-ui-kit';
import "../../style/admin/AdminLogin.css";
import { getAdmin } from '../../services/adminService';

function AdminLogin() {
    let [admin, setAdmin] = useState({});
    let [registeredAdmin, setRegisteredAdmin] = useState([]);

    useEffect(() => {
        getAdmin().then((admin) => {
            console.log(admin);
            setRegisteredAdmin(admin);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    let submit = (e) => {
        e.preventDefault();
        
        let res = registeredAdmin.filter((registeredadmin) => {
            return (admin.userName === registeredadmin.userName && admin.password===registeredadmin.password);
        })
        if (res.length > 0) {
            console.log("login");
            localStorage.setItem("admin",admin.userName);
        } else {
            console.log("not exist");
        }

    }
    return (
        <>
            <div id="main">
                <h1>Admin Login</h1>
                <div id="login_Admin_form">
                    <form onSubmit={submit}>
                        <MDBInput className='mb-4' type='text' id='username' label='Username' name="username" onChange={(e) => setAdmin({ ...admin, userName: e.target.value })} required />
                        <MDBInput className='mb-4' type='password' id='password' label='Password' name="password" onChange={(e) => setAdmin({ ...admin, password: e.target.value })} required />
                        <MDBBtn type='submit' block>
                           Login
                        </MDBBtn>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AdminLogin