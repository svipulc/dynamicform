"use client";
import { LocalFormData } from "@/constant";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import useGetLocalData from "@/hook/useGetLocalData";

function deleteForm(
  id: string,
  data: LocalFormData,
  setData: React.Dispatch<React.SetStateAction<LocalFormData>>
) {
  // if (typeof window !== undefined) {
  //   const localData = window.localStorage.getItem("form");
  //   if (localData) {
  //     const tempData: LocalFormData = JSON.parse(localData);
  const updatedData = data.filter((f, index) => {
    if (f.id != id) {
      return f;
    }
  });
  window.localStorage.setItem("form", JSON.stringify(updatedData));
  setData(updatedData);
}
//   // }
// }

export default function DisplayForm() {
  const { localData, setLocalData } = useGetLocalData("form");

  return (
    <div className="w-2/3 flex gap-8">
      {localData.map((f, index) => {
        return (
          <div
            className="w-[200px] h-[200px] shadow-md p-2 mt-4 border rounded-md flex flex-col justify-center items-center"
            key={index}
          >
            <h3 className="text-xl font-normal">{f.formName}</h3>
            <div>
              <Button variant={"default"} className="m-2">
                <Link href={`/admin/form/${f.id}`}>Edit</Link>
              </Button>
              <Button
                variant={"outline"}
                className="m-2"
                onClick={() => deleteForm(f.id, localData, setLocalData)}
              >
                Delete
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
