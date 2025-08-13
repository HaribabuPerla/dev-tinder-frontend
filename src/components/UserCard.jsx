import React from 'react'
import { useSelector } from 'react-redux'
import axiosRequest from '../config/axios'
import { useDispatch } from 'react-redux'
import { removeUserFromFeed } from '../utils/feedSlice'


function UserCard({data}) {
    const dispatch=useDispatch()
    const user=useSelector((store)=>store.user)
    const decisionHandler=async(status,id)=>{
      try{
        const res =  await axiosRequest(`/request/${status}/${id}`)
        console.log("res======>14",res)
        if(res?.data?.status == 200){
          dispatch(removeUserFromFeed(id))
        }

      }catch(err){
        console.log("err--->",err)
      }

    }
    
  return (
    <div className="flex justify-center my-10 h-120">
      <div className="card bg-gray-900 w-96 shadow-sm">
  <figure>
    <img
      src={data?.photoUrl}
      alt="feed-image" />
      
  </figure>
  <div className="card-body text-white">
    <h2 className="card-title">{`${data?.firstName}    ${data?.lastName}`}</h2>
    <p>{data?.about}</p>
     {
        data?.skills?.length > 0 &&
           <p className='text-orange-400'>Skills: {data?.skills?.join(", ")}</p>
     }
   
    { user?._id != data?._id &&
    <div className="card-actions justify-center my-2">
      <button onClick={()=>decisionHandler("interested",data?._id)} className="btn btn-success text-white">Interested</button>
     <button onClick={()=>decisionHandler("ignored",data?._id)} className="btn btn-error text-white">Igonored</button>
    </div>
 }
  </div>
</div>
    </div>
  )
}

export default UserCard
