import React from 'react'
import ProfileEdit from '../../components/ProfileEdit'
import { useSelector } from 'react-redux'
import UserCard from '../../components/UserCard'

 function Profile() {
    const user= useSelector((store)=>  store.user)
   
  return (
    <>
    {
      user ?  <div className='flex flex-col  md:flex-row justify-center'>
        <ProfileEdit user={user}/>
        <div className='my-10'>
        <UserCard data={user}/>
        </div>
    </div>
    :
    <h1>Loading...</h1>
    }
    </>
  )
}

export default Profile
