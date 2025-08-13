import { createSlice } from "@reduxjs/toolkit";

const requestSlice= createSlice({
    name:"request",
    initialState:null,
    reducers:{
        addRequests:(state,action)=>{
          return action.payload
        },
        removeRequest:(state,action)=>{
            const idToRemove = action.payload;
          const removedArray = state.filter(req => req._id != idToRemove);
          return removedArray;

            

        }
    }
})
export const {addRequests,removeRequest}=requestSlice.actions
export default requestSlice.reducer
