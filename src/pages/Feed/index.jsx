import React from 'react'
import UserCard from '../../components/UserCard';
import { useSelector } from 'react-redux';
import axiosRequest from '../../config/axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addFeed } from '../../utils/feedSlice';

function Feed() {
    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed);
    console.log("Feed data:", feed);

    const fetchFeed=async()=>{
        if(feed){
            return;
        }
      const response = await axiosRequest("/feed","get");
      if(response?.data?.status == 200){
        dispatch(addFeed(response?.data?.data));
       

      }
      

    }
    useEffect(()=>{
        fetchFeed();
    },[])
    if(feed?.length == 0){
        return <div className='flex justify-center'>
                <h1>New Feed is not available</h1> 
             </div>
    }
return (
    <>
        {feed?.length > 0 ? (
            <div className='h-screen'>
                <UserCard data={feed[0]} />
            </div>

        ) :
        <div className="flex justify-center items-center h-screen">

        <span className="loading loading-spinner text-warning"></span>
        </div>
        }
    </>
);
}

export default Feed
