import React, { useEffect } from 'react';
import axiosRequest from '../config/axios';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests,removeRequest } from '../utils/request';



function ConnectionRequets() {
    const dispatch=useDispatch()
    
   

    useEffect(()=>{
        fetchConnections()

    },[])
    const fetchConnections=async ()=>{
        try{
          const res = await axiosRequest(`/user/request/interested/recived`,"get")
          console.log(res)
         if(res?.data?.status == 200){
            dispatch(addRequests(res?.data?.data))

         }
        }catch(err){
            console.log("err",err)
        }
    }
    const reqConnectionsList =  useSelector((store)=>store.request)
   const decisionhandler=async(type,id)=>{
    console.log(type,id)
    try{
        const res = await axiosRequest(`/request/review/${type}/${id}`)
        if(res?.data?.status == 200){
            dispatch(removeRequest(id))
        }
    }catch(err){
        console.log(err)
    }
   }
   if(reqConnectionsList?.length == 0){
    return <div className='justify-center items-center h-screen'>
        <h1>Connection Requests Not Found</h1>

    </div>
   }
  return (
    <>
    <div>
      {
        reqConnectionsList?.map((el)=>{
            const data=el.fromUserId
            return(
             <div className="flex flex-col md:flex-row justify-between items-center bg-gray-900 m-4 md:m-10 rounded p-5 gap-4">
  
  {/* Image */}
  <div className="flex-shrink-0">
    <img
      src={data?.photoUrl}
      className="h-20 w-20 rounded-full object-cover"
      alt="connect-image"
    />
  </div>

  {/* User Info */}
  <div className="flex-1 text-center md:text-left max-w-full md:max-w-[60%]">
    <h1 className="text-white font-semibold">
      {data?.firstName} {data?.lastName}
    </h1>
    <p className="text-white break-words">
      {data?.about}
    </p>
    {data?.skills?.length > 0 && (
      <p className="text-orange-400 mt-2">
        Skills: {data?.skills?.join(", ")}
      </p>
    )}
  </div>

  {/* Action Buttons */}
  <div className="flex flex-row md:flex-col gap-2">
    <button
      onClick={() => decisionhandler("accepted", el._id)}
      className="btn btn-success"
    >
      Accept
    </button>
    <button
      onClick={() => decisionhandler("rejected", el._id)}
      className="btn btn-error"
    >
      Reject
    </button>
  </div>
</div>

            )
        })
      }
    </div>
    </>
  )
}

export default ConnectionRequets
