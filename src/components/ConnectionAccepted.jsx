import React, { useEffect, useState } from 'react';
import axiosRequest from '../config/axios';





function ConnectionAccepted() {

    const [accptedConnectionList,setAccptedConnecionList]=useState([]);

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
 if(accptedConnectionList?.length == 0){
    return(
        <div className='flex justify-center'>
            <h3>Accpted Connections Not Found</h3>
        </div>
    )
 }
  
  return (
    <>
    <div>
      {
        accptedConnectionList?.map((el)=>{
            const data=el.fromUserId
            return(
                <div className='flex justify-between gap-30 items-center bg-gray-900 m-10 rounded p-5'>
                    <div>
                      <img
                      src={data?.photoUrl} 
                      className="h-20 w-20 rounded-2xl"
                      alt="connect-image"
                      
                      />
                    </div>
                    <div>
                        <h1 className='text-white text-center'>{data?.firstName} {data?.lastName}</h1>
                        <p className='text-white text-center max-w-50'>{data?.about}</p>
                        {
                            data?.skills?.length > 0  && 
                             <p className='text-orange-400'>Skills : {data?.skills?.join(",")}</p>
                        }

                    </div>
                    <div>
                       <h2 className='text-white border-2 border-amber-700 p-3 rounded-3xl'> Status : {el?.status} </h2>
                    </div>
                </div>
            )
        })
      }
    </div>
    </>
  )
}

export default ConnectionAccepted;
