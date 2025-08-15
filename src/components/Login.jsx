import React from 'react'
import { useState } from 'react'
import axiosRequest from '../config/axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';
import { Link } from 'react-router-dom';
import Signup from '../pages/signup';



function Login({isLogin=true}) {
    const [inputData,setInputData]=useState({firstName:"",lastName:"",emailId:"",password:""});
    const [showToast,setShowToast]=useState({message:"",error:false,open:false})
    const [loader,setLoader]=useState(false)
    const dispatch = useDispatch();
    const navigation=useNavigate();
  

    const changeHandler=(e)=>{
      const {name,value}=e.target;
       setInputData((prevState)=>({
        ...prevState,   
        [name]: value
      }))

    }

    const loginHandler=async()=>{
      setLoader(true)
   const response = await  axiosRequest("/login","post",inputData)
  if(response?.data?.status === 200){
  
   dispatch(addUser(response?.data?.data));
    setShowToast({
      message: response?.data?.message || "Login Successful",
      error: false,
      open: true
    })
    navigation("/feed");


    }else{
       setShowToast({
      message: response?.data?.message|| response?.message || "Login Failed",
      error: true,
      open: true
    })
    }
    setLoader(false)
  }

  const signupHandler=async()=>{
    setLoader(true)
    try{
     const res = await axiosRequest("/signup","post",inputData)
      if(res?.data?.status == 200){
         setShowToast({
      message: res?.data?.message || "Account Added",
      error: false,
      open: true
    })
    navigation("/login");

      }else{
      
          setShowToast({
      message: res?.data?.message|| res?.message || "Something went wrong",
      error: true,
      open: true
    })

      }
    }catch(err){
      console.log("error====>",err)
    }
    setLoader(false)
  }
  return (
    <>
 <div className="flex justify-center  min-h-screen p-4">
  <div className={isLogin?"card h-80 mt-5 bg-gray-900 w-full max-w-md shadow-sm":"card h-114 mt-5 bg-gray-900 w-full max-w-md shadow-sm"}>
    <div className="card-body">
      <h2 className="card-title text-amber-100 justify-center underline">
        {isLogin ? "Login" : "SignUp"}
      </h2>


      {!isLogin && (
        <>
          <input
            type="text"
            name="firstName"
            value={inputData?.firstName}
            placeholder="Enter First Name"
            className="input text-amber-100 bg-gray-900 input-success my-3 w-full"
            onChange={changeHandler}
          />
          <input
            type="text"
            name="lastName"
            value={inputData?.lastName}
            placeholder="Enter Last Name"
            className="input text-amber-100 bg-gray-900 input-success my-3 w-full"
            onChange={changeHandler}
          />
        </>
      )}

      <input
        type="text"
        name="emailId"
        value={inputData?.emailId}
        placeholder="Enter e-mail Id"
        className="input text-amber-100 bg-gray-900 input-success my-3 w-full"
        onChange={changeHandler}
      />

      <input
        type="password"
        name="password"
        value={inputData?.password}
        placeholder="Enter password"
        className="input text-amber-100 bg-gray-900 input-success my-3 w-full"
        onChange={changeHandler}
      />

      <div className="card-actions flex flex-col items-center gap-3">
        <button
          onClick={isLogin ? loginHandler : signupHandler}
          className="btn w-full btn-warning"
        >
         
          {loader ?  <span className="loading loading-spinner text-warning"></span>:isLogin ? "Login" : "SignUp"}
        </button>
        <Link
          to={isLogin ? "/signup" : "/login"}
          className="text-amber-700  mt-2 text-center border-2 p-2 rounded-2xl"
        >
          {isLogin
            ? "If you don't have account SignUp here"
            : "Login here"}
      
        </Link>
      </div>
    </div>
  </div>
</div>

    {
      showToast.open && <Toast open={showToast?.open} message={showToast.message} error={showToast.error} setShowToast={setShowToast}  /> 
    }
    </>
  )
}

export default Login
