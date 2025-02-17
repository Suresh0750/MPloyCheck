
import { configureStore } from "@reduxjs/toolkit";
import userReducer from '@/redux/slices/useSlice'
import searchReducer from '@/redux/slices/serachSlice'
import recordReducer from '@/redux/slices/recordSlice'


export const store = configureStore({
    reducer:{
        user : userReducer,
        search: searchReducer,
        record : recordReducer,
    },
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;