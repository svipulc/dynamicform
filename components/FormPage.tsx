"use client";
import React, { useEffect, useState } from "react";
import CreateForm from "./CreateForm";
import { LocalFormData, Root2 } from "@/constant";

interface formPageProps {
  formId?: string;
}

export default function FormPage({ formId }: formPageProps) {
  const [currentForm, setCurrentForm] = useState(formId);
  const [formData, setFormData] = useState<Root2>({
    id: "",
    formName: "",
    inputFields: [],
  });
  useEffect(() => {
    if (typeof window !== undefined) {
      const localData = window.localStorage.getItem("form");
      if (localData) {
        const sendData: LocalFormData = JSON.parse(localData);
        sendData.map((f, index) => {
          console.log(f);
          if (f.id === currentForm) {
            setFormData(f);
          }
        });
      }
    }
  }, [currentForm]);

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-4xl font-normal">
        {formData.formName ? formData.formName : "Create Form"}
      </h1>
      {!formId && (
        <p className="text-sm text-slate-600 my-2">
          create you custom form here with all the requirement you want to add.
        </p>
      )}
      <div className="w-full mt-4 p-4">
        <CreateForm inputs={formData} />
      </div>
    </div>
  );
}
