import React from 'react'
import { useEffect } from 'react';

function Toast({error=false,message,open,setShowToast}) {
    console.log("123==>",message,open)
      useEffect(()=>{
     
         setTimeout(()=>{
        setShowToast({message:"",error:false,open:false})

      },1000)
   
     
    }, []);
  return (
    <>
    { open &&
       <div className="toast toast-top toast-center">
  <div className= {!error ? "alert alert-success":"alert alert-error" }>
    <span>{message}</span>
  </div>
</div>
    }
    </>
  
  )
}

export default Toast
