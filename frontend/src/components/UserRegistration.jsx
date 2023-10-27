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
import { registerUser, getUsers } from '../services/UserService';

function UserRegistration() {
    let [user, setUser] = useState({});
    let [registeredUsers, setRegisteredUsers] = useState([]);
    let [repeatedPassword, setRepeatedPassword] = useState("");
    const [successAlertOpen, setSuccessAlertOpen] = useState(false);
    const [errorAlertOpen, setErrorAlertOpen] = useState(false);
    const [errorMsg,setErrorMsg]=useState("");
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
        if (user.password === repeatedPassword) {
            let res = registeredUsers.filter((registereduser) => {
                return user.userName === registereduser.userName;
            })
            if (res.length > 0) {
                console.log("exist");
                setErrorAlertOpen(true);
                setErrorMsg("Username Alreay Exist! Please try different Username");
            } else {
                registerUser(user).then((user) => {
                    console.log(user);
                    setSuccessAlertOpen(true);
                    setTimeout(() => {
                        navigate("/");
                    }, 2000);
                }).catch((error) => {
                    console.log("error");
                    setErrorAlertOpen(true);
                    setErrorMsg("Some Error Occured! Please Try Again");
                })
            }
        } else {
            console.log("error");
            setErrorAlertOpen(true);
            setErrorMsg("Password and Repeated Password don't match!");
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
                        User Registered Successfully!
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
                        {errorMsg}
                    </Alert>
                </Collapse>
            </Box>

            <Navbar />
            <br />
            <div id="main">
                <h1>User Registration</h1>
                <div id="register_user_form">
                    <form onSubmit={submit}>
                        <MDBInput className='mb-4' type='text' id='username' label='Username' name="username" onChange={(e) => setUser({ ...user, userName: e.target.value })} required />
                        <MDBInput className='mb-4' type='password' id='password' label='Password' name="password" onChange={(e) => setUser({ ...user, password: e.target.value })} required />
                        <MDBInput className='mb-4' type='password' id='repeat_password' label='Repeat Password' name="repeat_password" onChange={(e) => setRepeatedPassword(e.target.value)} required />
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