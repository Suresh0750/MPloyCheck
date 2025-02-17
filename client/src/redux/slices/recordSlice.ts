import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { IRecord } from "@/types/record";

const initialState: { datas: IRecord[][]; totalCount: number ,currentRecordUserId:string | null} = {
  datas: [],
  totalCount: 0,
  currentRecordUserId : null
};

const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    currentRecordUserId: (state,action)=>{        // * used for if the user login show record || if the admin can see user record 
      state.currentRecordUserId = action.payload
    },
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

export const { addRecord, addCount, deleteRecord,resetRecords,currentRecordUserId } = recordSlice.actions;
export default recordSlice.reducer;
