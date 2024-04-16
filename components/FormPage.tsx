"use client";
//Library import
import React, { useEffect, useState } from "react";

// UI import
import CreateForm from "./CreateForm";

// Constant type import
import { LocalFormData, Root2 } from "@/constant";
import useGetFormById from "@/hook/useGetFormById";

//FormPage type
interface formPageProps {
  formId?: string;
}

export default function FormPage({ formId }: formPageProps) {
  const { formData } = useGetFormById(
    typeof formId === "string" ? formId : "Register Form"
  );

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
