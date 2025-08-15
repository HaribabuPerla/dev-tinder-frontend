import React, { useEffect, useState } from 'react';
import axiosRequest from '../config/axios';
import Loader from './Loader';





function ConnectionAccepted() {

    const [accptedConnectionList,setAccptedConnecionList]=useState(null);

    useEffect(()=>{
        fetchConnections()

    },[])
    const fetchConnections=async ()=>{
        try{
          const res = await axiosRequest(`user/request/accepted/connections`,"get")
          console.log(res)
         if(res?.data?.status == 200){
           setAccptedConnecionList(res?.data?.data)

         }
        }catch(err){
            console.log("err",err)
        }
    }
//  if(accptedConnectionList?.length == 0){
//     return(
//         <div className='flex justify-center h-screen'>
//             <h3>Accpted Connections Not Found</h3>
//         </div>
//     )
//  }
  
  return (
    <>
    <div>
      { accptedConnectionList ?.length > 0?
        accptedConnectionList?.map((el)=>{
            const data=el.fromUserId
            return(
             <div className="flex flex-col md:flex-row justify-between items-center bg-gray-900 m-4 md:m-10 rounded p-5 gap-6">
  
  {/* Image */}
  <div className="flex-shrink-0">
    <img
      src={data?.photoUrl}
      className="h-20 w-20 rounded-2xl object-cover"
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

  {/* Status */}
  <div className="mt-2 md:mt-0">
    <h2 className="text-white border-2 border-amber-700 p-3 rounded-3xl text-center">
      Status: {el?.status}
    </h2>
  </div>
</div>

            )
        })
        : accptedConnectionList?.length == 0 ? 
          <div className='flex justify-center h-screen'>
            <h3>Accpted Connections Not Found</h3>
        </div>
        :
        <Loader/>
      }
    </div>
    </>
  )
}

export default ConnectionAccepted;
