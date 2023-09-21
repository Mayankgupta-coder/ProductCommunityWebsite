import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
    MDBInput,
    MDBBtn,
} from 'mdb-react-ui-kit';
import "../../style/admin/AdminLogin.css";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Navbar from '../Navbar';
import { getAdmin } from '../../services/adminService';

function AdminLogin() {
    let [admin, setAdmin] = useState({});
    let [registeredAdmin, setRegisteredAdmin] = useState([]);
    const [successAlertOpen, setSuccessAlertOpen] = useState(false);
    const [errorAlertOpen, setErrorAlertOpen] = useState(false);

    useEffect(() => {
        getAdmin().then((admin) => {
            console.log(admin);
            setRegisteredAdmin(admin);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    const navigate = useNavigate();

    let submit = (e) => {
        e.preventDefault();

        let res = registeredAdmin.filter((registeredadmin) => {
            return (admin.userName === registeredadmin.userName && admin.password === registeredadmin.password);
        })
        if (res.length > 0) {
            console.log("login");
            localStorage.setItem("admin", admin.userName);
            setSuccessAlertOpen(true);
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } else {
            console.log("not exist");
            setErrorAlertOpen(true);
        }

    }
    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Collapse in={successAlertOpen}>
                    <Alert severity="success"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setSuccessAlertOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        Admin Login Successfully!
                    </Alert>
                </Collapse>
            </Box>
            <Box sx={{ width: '100%' }}>
                <Collapse in={errorAlertOpen}>
                    <Alert severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setErrorAlertOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        Wrong Username or Password! Please Try Again!
                    </Alert>
                </Collapse>
            </Box>
            <Navbar/>
            <br/>
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