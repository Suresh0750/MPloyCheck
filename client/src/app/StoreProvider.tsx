"use client";

import { Provider } from "react-redux";
import appStore from '@/redux/store'
import { Toaster } from "react-hot-toast";

export const StoreProvider = ({children}:{children:React.ReactNode})=>{
    return(
        <Provider store={appStore}>
             {children}
        </Provider>
    )

}