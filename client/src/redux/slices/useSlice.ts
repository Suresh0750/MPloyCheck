import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/types/user";

const initialState: { datas: IUser[][]; totalCount: number } = {
  datas: [],
  totalCount: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
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

export const { addUser, addCount, deleteUser,resetUsers } = userSlice.actions;
export default userSlice.reducer;
