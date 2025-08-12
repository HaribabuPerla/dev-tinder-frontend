import React from 'react'
import { useState } from 'react'
import axiosRequest from '../config/axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';



function Login() {
    const [inputData,setInputData]=useState({emailId:"",password:""});
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
  return (
    <>
    <div className='flex justify-center items-center m-10 bg-red-500S'>
        <div className="card bg-gray-900 w-96 shadow-sm">
     <div className="card-body">
    <h2 className="card-title text-amber-100 justify-center underline">Login</h2>
    <input type="text" name="emailId" value={inputData?.emailId} placeholder="Enter e-mail Id" className="input text-amber-100 bg-gray-900 input-success my-5" onChange={changeHandler} />
    <input type="text"  name="password"value={inputData?.password} placeholder="Enter password" className="input text-amber-100 bg-gray-900 input-success my-5"  onChange={changeHandler}/>
    <div className="card-actions justify-center">
      <button onClick={loginHandler} className="btn w-80 btn-warning">Login</button>
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
