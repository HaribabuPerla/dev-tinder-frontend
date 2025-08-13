import React from 'react'
import { useState } from 'react'
import axiosRequest from '../config/axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import Toast from './Toast';



function ProfileEdit({user}) {
    const [inputData,setInputData]=useState({firstName:user?.firstName,lastName:user?.lastName,gender:user?.gender || "male",about:user?.about,photoUrl:user?.photoUrl});
    const [showToast,setShowToast]=useState({message:"",error:false,open:false})
    const dispatch = useDispatch();
  

    const changeHandler=(e)=>{
      const {name,value}=e.target;
       setInputData((prevState)=>({
        ...prevState,   
        [name]: value
      }))

    }
    const dropdownHandler=(e)=>{
       setInputData((prev)=>({
        ...prev,
        gender:e.target.dataset.value
       }))

    }
    

    const ProfileEditHandler=async()=>{
   const response = await  axiosRequest("/Profile/edit","patch",inputData)
  if(response?.data?.status === 200){
  
   dispatch(addUser(response?.data?.data));
    setShowToast({
      message: response?.data?.message || "Profile Edit Successful",
      error: false,
      open: true
    })



    }else{
       setShowToast({
      message: response?.message || "Profile Edit Failed",
      error: true,
      open: true
    })
    }
  }
  return (
    <>
    <div className='flex justify-center items-center m-10 bg-red-500S mb-10'>
        <div className="card bg-gray-900 w-96 shadow-sm">
     <div className="card-body">
    <h2 className="card-title text-amber-100 justify-center underline">Profile Edit</h2>
    <input type="text" name="firstName" value={inputData?.firstName} placeholder="First Name" className="input text-amber-100 bg-gray-900 input-success my-3" onChange={changeHandler} />
    <input type="text"  name="lastName"value={inputData?.lastName} placeholder="LastName" className="input text-amber-100 bg-gray-900 input-success my-3"  onChange={changeHandler}/>
    <div className="dropdown my-3">
  <div tabIndex={0} role="button" className="btn m-1 w-80 bg-gray-900 input-success text-amber-100 border-1 border-green-300 justify-start">{inputData?.gender}</div>
  <ul onClick={dropdownHandler} tabIndex={0} className="dropdown-content menu  bg-gray-900 border-1 text-white rounded-box z-1 w-52 p-2">
    <li data-value="male">Male</li>
    <li data-value="female">Female</li>
    <li data-value="others">Others</li>
  </ul>
</div>

    <input type="text"  name="about"value={inputData?.about} placeholder="About" className="input text-amber-100 bg-gray-900 input-success my-3"  onChange={changeHandler}/>
    <input type="text"  name="photoUrl"value={inputData?.photoUrl} placeholder="Photo Url" className="input text-amber-100 bg-gray-900 input-success my-3"  onChange={changeHandler}/>
    <div className="card-actions justify-center">
      <button onClick={ProfileEditHandler} className="btn w-80 btn-warning">Save</button>
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

export default ProfileEdit
