import React from "react";
import CreateForm from "./CreateForm";

export default function FormPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-4xl font-normal">Create Form</h1>
      <p className="text-sm text-slate-600 my-2">
        create you custom form here with all the requirement you want to add.
      </p>
      <div className="w-full mt-4 p-4">
        <CreateForm />
      </div>
    </div>
  );
}
