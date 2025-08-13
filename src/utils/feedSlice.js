import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
    name:"feed",
    initialState:null,
    reducers:{
           addFeed:(state,action)=>{
        return action.payload;
    },
    removeFeed:()=>{
        return null;
    },
      removeUserFromFeed:(state,action)=>{
            const removedUserArray=state.filter((req)=>req._id != action.payload)
            return removedUserArray

        }

    }
 
})

export const {addFeed,removeFeed,removeUserFromFeed}=feedSlice.actions;
export default feedSlice.reducer;