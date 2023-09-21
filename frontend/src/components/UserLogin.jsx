import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
    MDBInput,
    MDBBtn,
} from 'mdb-react-ui-kit';
import "../style/UserRegistration.css";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Navbar from './Navbar';
import { getUsers } from '../services/UserService';

function UserLogin() {
    let [user, setUser] = useState({});
    let [registeredUsers, setRegisteredUsers] = useState([]);
    const [successAlertOpen, setSuccessAlertOpen] = useState(false);
    const [errorAlertOpen, setErrorAlertOpen] = useState(false);
    useEffect(() => {
        getUsers().then((users) => {
            console.log(users);
            setRegisteredUsers(users);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    const navigate = useNavigate();

    let submit = (e) => {
        e.preventDefault();

        let res = registeredUsers.filter((registereduser) => {
            return (user.userName === registereduser.userName && user.password === registereduser.password);
        })
        console.log(user.userName, user.password, res);
        if (res.length > 0) {
            console.log("login");
            localStorage.setItem("username", user.userName);
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
                        User Login Successfully!
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
            <Navbar />
            <br />
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