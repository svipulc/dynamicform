"use client";
import { LocalFormData } from "@/constant";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { revalidatePath } from "next/cache";

function deleteForm(id: string) {
  if (typeof window !== undefined) {
    // console.log("in");
    const localData = window.localStorage.getItem("form");
    if (localData) {
      const tempData: LocalFormData = JSON.parse(localData);
      const updatedData = tempData.filter((f, index) => {
        if (f.id != id) {
          return f;
        }
      });
      window.localStorage.setItem("form", JSON.stringify(updatedData));
    }
  }
}

export default function DisplayForm() {
  const [formList, setFormList] = useState<LocalFormData>([]);
  useEffect(() => {
    if (typeof window !== undefined) {
      // console.log("in");
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
                onClick={() => deleteForm(f.id)}
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
