import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import axiosRequest from '../config/axios'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'



function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const loggedInUserApiCall = async () => {
    if (user) {
      return; // If user is already logged in, no need to fetch again
    }
    try {
      const response = await axiosRequest("/profile/view", "get");
      dispatch(addUser(response?.data?.data));
      console.log("Logged-in user data:", response?.data);
      if (response.status === 401 || response.status === 403) {
        // Redirect to login if unauthorized or forbidden
        navigate("/login");
      }

    } catch (error) {


      console.error("Error fetching logged-in user data:", error);
    }




  }

  useEffect(() => {
    loggedInUserApiCall();
  }, [])
  return (
   <>
      <Navbar />

      <Outlet />


      <Footer />
      </>

  
  )
}

export default Body
