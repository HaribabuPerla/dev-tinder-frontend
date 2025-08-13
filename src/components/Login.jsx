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
      message: response?.data?.message || "Login Failed",
      error: true,
      open: true
    })
    }
  }

  const signupHandler=async()=>{
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
  }
  return (
    <>
    <div className='flex justify-center items-center mt-5 bg-red-500S'>
        <div className="card bg-gray-900 w-96 shadow-sm">
     <div className="card-body">
    <h2 className="card-title text-amber-100 justify-center underline">{isLogin ? "Login" : "SignUp"}</h2>
    {
      !isLogin &&
      <>
          <input type="text" name="firstName" value={inputData?.firstName} placeholder="Enter First Name" className="input text-amber-100 bg-gray-900 input-success my-3" onChange={changeHandler} />
    <input type="text"  name="lastName" value={inputData?.lastName} placeholder="Enter Last Name" className="input text-amber-100 bg-gray-900 input-success my-3"  onChange={changeHandler}/>
    </>
    }
    <input type="text" name="emailId" value={inputData?.emailId} placeholder="Enter e-mail Id" className="input text-amber-100 bg-gray-900 input-success my-3" onChange={changeHandler} />
    <input type="text"  name="password"value={inputData?.password} placeholder="Enter password" className="input text-amber-100 bg-gray-900 input-success my-3"  onChange={changeHandler}/>
    <div className="card-actions justify-center">
      <button onClick={isLogin ? loginHandler: signupHandler} className="btn w-80 btn-warning">{isLogin ? "Login" : "SignUp"}</button>
      <div>
        <Link to={isLogin? "/signup" : '/login'} className='text-white underline mt-3'>{isLogin? "If you don't have account SignUp here" : "Login here"}</Link>
      </div>
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
