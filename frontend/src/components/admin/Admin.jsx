import React from 'react'
import { Outlet } from 'react-router-dom';
import { isAdminLoggedIn } from '../../services/adminService';

function Admin() {
    
  return (
    <>
        {
            isAdminLoggedIn()?<Outlet/>:window.location.href="/"
        }
    </>
  )
}

export default Admin