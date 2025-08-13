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
    return <div className='justify-center items-center'>
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
                <div className='flex justify-between items-center bg-gray-900 m-10 rounded p-5'>
                    <div>
                      <img
                      src={data?.photoUrl} 
                      className="h-20 w-20"
                      alt="connect-image"
                      
                      />
                    </div>
                    <div className='max-w-90'>
                        <h1 className='text-white text-center'>{data?.firstName} {data?.lastName}</h1>
                        <p className='text-white text-center max-w-50'>{data?.about}</p>
                        {
                            data?.skills?.length > 0  && 
                             <p className='text-orange-400'>Skills : {data?.skills?.join(",")}</p>
                        }

                    </div>
                    <div className='flex flex-col'>
                      <div onClick={()=>decisionhandler("accepted",el._id)} className='btn btn-success my-2 mx-2'>Accept</div>   
                      <div onClick={()=>decisionhandler("rejected",el._id)} className='btn btn-error my-2 mx-2'>Reject</div> 
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
