import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRecord } from "@/types/record";

const initialState: { datas: IRecord[][]; totalCount: number } = {
  datas: [],
  totalCount: 0,
};

const recordSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addRecord: (state, action: PayloadAction<IRecord[]>) => {
      state.datas.push(action.payload);
    },
    
    addCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    deleteRecord: (state, action: PayloadAction<{ id: string; page: number }>) => {
      const { id, page } = action.payload;
      if (state.datas[page - 1]) {
        state.datas[page - 1] = state.datas[page - 1].filter((record) => record._id !== id);
      }
    },
    resetRecords: (state) => {
      state.datas = [];
    },
  },
});

export const { addRecord, addCount, deleteRecord,resetRecords } = recordSlice.actions;
export default recordSlice.reducer;
