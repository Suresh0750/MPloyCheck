
import { useDispatch } from "react-redux"
import { setSearch } from "@/redux/slices/serachSlice"
import debounce from "lodash/debounce";
import { useCallback } from "react";
import { resetRecords } from "@/redux/slices/recordSlice";
import { resetUsers } from "@/redux/slices/useSlice";

export default function SearchBar(){
    const dispatch = useDispatch()

    // * debouncing used for delay search function

    const debouncedSearch = useCallback(
        debounce((query) => {
        dispatch(resetRecords())  // * update empth while search the slice
        dispatch(resetUsers()) 
        dispatch(setSearch(query));
        }, 300), 
        []
      );
      const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(e.target.value);
      };
    return(
        <>
        <input
         type="search"  
         className="p-2 mt-1 border-2  rounded border-solid border-1 border-gray-800 focus:border-indigo-500 focus:ring-indigo-300 focus:ring-opacity-50"
         placeholder="Search"
         onChange={handleSearch}    
         />
        </>
    )
}