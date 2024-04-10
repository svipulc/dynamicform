"use client";
import { LocalFormData } from "@/constant";
import React, { useEffect, useState } from "react";

export default function DisplayForm() {
  const [formList, setFormList] = useState<LocalFormData>([]);
  useEffect(() => {
    if (typeof window !== undefined) {
      console.log("in");
      const localData = window.localStorage.getItem("form");
      if (localData) {
        const tempData: LocalFormData = JSON.parse(localData);
        setFormList(tempData);
      }
    }
  }, []);
  return (
    <div className="w-2/3 flex gap-8">
      {formList.map((f, index) => {
        return (
          <div className="w-[200px] h-[200px] shadow-md p-2 mt-4 border rounded-md flex justify-center items-center">
            <h3 className="text-xl font-normal">{f.formName}</h3>
          </div>
        );
      })}
    </div>
  );
}
