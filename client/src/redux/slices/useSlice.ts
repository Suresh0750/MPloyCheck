import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/types/user";

const initialState: { datas: IUser[][]; totalCount: number,currentUser:{[key:string]:string} } = {
  datas: [],
  totalCount: 0,
  currentUser : {}
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    currentUser : (state,action)=>{
      state.currentUser = action.payload
    },
    addUser: (state, action: PayloadAction<IUser[]>) => {
      state.datas.push(action.payload);
    },
    
    addCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    deleteUser: (state, action: PayloadAction<{ id: string; page: number }>) => {
      const { id, page } = action.payload;
      if (state.datas[page - 1]) {
        state.datas[page - 1] = state.datas[page - 1].filter((user) => user._id !== id);
      }
    },
    resetUsers: (state) => {
      state.datas = [];
    },
  },
});
  
export const { addUser, addCount, deleteUser,resetUsers ,currentUser} = userSlice.actions;
export default userSlice.reducer;
