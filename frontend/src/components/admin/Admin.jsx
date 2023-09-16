import React from 'react'
import { Outlet } from 'react-router-dom';
import { isLoggedIn } from '../../services/UserService';
function Admin() {
    
  return (
    <>
    
        {/* <h1>{isLoggedIn()}</h1> */}
        {
            isLoggedIn()?<Outlet/>:window.location.href="/"
        }
    </>
  )
}

export default Admin