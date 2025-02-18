"use client";

import { RootState } from "@/redux/store";
import { createRecord, fetchRecord } from "@/services/api";
import { useDispatch, useSelector } from "react-redux";
import {useForm} from 'react-hook-form'
import { RecordSchemaType,recordShema } from "@/lib/validators/recordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {toast,Toaster} from "react-hot-toast";
import { useState } from "react";
import { addRecord, currentRecordUserId, resetRecords } from "@/redux/slices/recordSlice";


export const useRecord = () => {

    const [isLoading,setIsLoading] = useState(false)
    const {register,handleSubmit,formState:{errors}} = useForm<RecordSchemaType>({
          resolver:zodResolver(recordShema)
      })
    const dispatch = useDispatch()
    const userID = useSelector((store: RootState) => store?.record?.currentRecordUserId); // * user for identify and fetch perticular user record


  console.log('userId',userID)

  async function getRecord(page: number = 1, limit: number = 10, search: string = "") {
    try {
      if (!userID) {
        console.warn("User ID is not available yet");
        return;
      }
      const result = await fetchRecord(page, limit, search, userID);
      dispatch(addRecord(result?.result?.[0]?.records))
      dispatch(addRecord(result?.result?.[0]?.totalCount[0]?.count || 0))

      return result
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  }

  function onDelete() {
    console.log("Delete function called");
  }

  function onUpdate() {
    console.log("Update function called");
  }


  // * creat record api

  // (onSuccess?: () => void) =>
  const onSubmit = (onClose: () => void) => async (data:RecordSchemaType)=>{
    try {
      if(isLoading) return
      setIsLoading(true)    // * prevent multiple click

      const result = await createRecord(data)
       toast.success(result?.message,{
        duration : 500
       })
       
       
       setTimeout(()=>{
         onClose()
         dispatch(resetRecords())  
         dispatch(currentRecordUserId(null))  // * used for again fetch the record
        // * used for again refetch the data
       },500)
    } catch (error:unknown) {
      if(error instanceof Error){
        return toast.error(error?.message)
      }
      return toast.error('Unexpected error is occured')
    }finally{
      setIsLoading(false)
    }
   
  }

 

  return { getRecord, onDelete, onUpdate ,onSubmit,register,handleSubmit,errors,Toaster};
};
