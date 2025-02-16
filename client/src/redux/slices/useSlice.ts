import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/types/user";


const initialState: {user:IUser[],totalCount:number} = {
  user : [],
  totalCount : 0
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state.user.push(action.payload);
    },
    addCount : (state,action)=>{
      state.totalCount = action.payload
    }
  },
});

export const { addUser,addCount } = userSlice.actions;
export default userSlice.reducer;
