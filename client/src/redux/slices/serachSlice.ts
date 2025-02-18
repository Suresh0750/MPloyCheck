import { createSlice } from "@reduxjs/toolkit";


const initialState : string = ''

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch : (state,action)=>{   
       return action.payload
    },
    resetSearch : (state,action)=>{
       return ''
    }
  },
});

export const { setSearch ,resetSearch} = searchSlice.actions;
export default searchSlice.reducer;
