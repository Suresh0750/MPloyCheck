"use client";
import { RootState } from "@/redux/store";
import { fetchRecord } from "@/services/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useRecord = () => {
  
  const userID = useSelector((store: RootState) => store?.record?.currentRecordUserId);

  async function getRecord(page: number = 1, limit: number = 10, search: string = "") {
    try {
      if (!userID) {
        console.warn("User ID is not available yet");
        return;
      }
      const result = await fetchRecord(page, limit, search, userID);
      console.log("Fetched records:", result);
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

  return { getRecord, onDelete, onUpdate };
};
