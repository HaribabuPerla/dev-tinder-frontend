import React from 'react'
import { useSelector } from 'react-redux'

function UserCard({data}) {
    const user=useSelector((store)=>store.user)
    
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
   
    { user?.firstName != data?.firstName &&
    <div className="card-actions justify-center my-2">
      <button className="btn btn-success text-white">Interested</button>
     <button className="btn btn-error text-white">Igonred</button>
    </div>
 }
  </div>
</div>
    </div>
  )
}

export default UserCard
