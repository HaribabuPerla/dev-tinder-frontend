import React from 'react'
import ProfileEdit from '../../components/ProfileEdit'
import { useSelector } from 'react-redux'
import UserCard from '../../components/UserCard'

 function Profile() {
    const user= useSelector((store)=>  store.user)
    console.log("user123===>",user)
   
  return (
    <>
    {
      user ?  <div className='flex justify-center'>
        <ProfileEdit user={user}/>
        <UserCard data={user}/>
    </div>
    :
    <h1>Loading...</h1>
    }
    </>
  )
}

export default Profile
