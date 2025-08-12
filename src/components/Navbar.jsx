import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import axiosRequest from '../config/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {removeUser} from '../utils/userSlice';
import { useState } from 'react';
import Toast from './Toast';


function Navbar() {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
   const [showToast,setShowToast]=useState({message:"",error:false,open:false})
  const logoutHandler =async () => {
    const res = await axiosRequest("/logout", "post");
    if (res?.data?.status === 200) {
      dispatch(removeUser());
         setShowToast({
      message: res?.data?.message || "Login Successful",
      error: false,
      open: true
    })
      navigate("/login");
     
    }


 

  };
  return (
    <>
 <div className="navbar shadow-sm bg-gray-900 text-orange-400">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl font-extrabold">Dev Tinder</a>
  </div>
  <div className="flex gap-2">
    <div className="dropdown dropdown-end mx-5">
     
        {
          user &&
          <div className='flex items-center gap-2'>
            <div>
             <p className='text-white'>Welcome,{user?.firstName}</p>
             </div>
             <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
           <div className="w-10 rounded-full">
             
          <img
            alt="logged-in-user-photo"
            src={user.photoUrl} />
        </div>
        </div>
          </div>
        } 
      
    
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-gray-900 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile"  className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li onClick={logoutHandler}><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
  {
      showToast.open && <Toast open={showToast?.open} message={showToast.message} error={showToast.error} setShowToast={setShowToast}  /> 
    }
    </>
  )
}

export default Navbar
