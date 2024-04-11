"use client";
import FormPage from "@/components/FormPage";
import React from "react";

export default function EditPage({ params }: { params: { formId: string } }) {
  console.log(typeof params.formId);
  return <FormPage formId={params.formId} />;
}
