"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
export default function Layout({
  children,
  user,
  record,
}: {
  children: React.ReactNode;
  user: React.ReactNode;
  record: React.ReactNode;
}) {
  const [isActive, setIsActive] = useState<"user" | "record">("user");
  const [search,setSearch] = useState<string>('')

  return (
    <>
      {children}
      <div className="p-6">
        <div className="flex justify-between">
          <div className="flex text-xl font-semibold">
            <div
              className={`border-2 border-solid p-2 cursor-pointer ${
                isActive === "user" ? "bg-gray-300" : ""
              }`}
              onClick={() => setIsActive("user")}
            >
              User
            </div>
            <div
              className={`border-2 border-solid p-2 cursor-pointer ml-4 ${
                isActive === "record" ? "bg-gray-300" : ""
              }`}
              onClick={() => setIsActive("record")}
            >
              Records
            </div>
          </div>
            <div>
              <SearchBar />
            </div>
        </div>

        <div className="mt-4">{isActive === "user" ? user : record}</div>
      </div>
    </>
  );
}
