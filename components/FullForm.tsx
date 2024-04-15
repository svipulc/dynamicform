"use client";
// Library import
import React, { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";

// UI import
import { Form } from "@/components/ui/form";
import DynamicFormField from "./DynamicFormField";

// Constant type import
import { fillData, InputField } from "@/constant";

interface FillDataType {
  name: string;
  email: string;
  password: string;
  role: string;
  gender: string;
  twoFactor: boolean;
  sd: string;
}

export default function FullForm({
  fields,
  formName,
}: {
  fields: InputField[];
  formName: string;
}) {
  const getListOfFiedls = fields.map((f, index) => {
    return f.inputName;
  });

  const form = useForm();
  const { setValue } = form;
  const onSubmit = (values) => {
    // type change required
    // store user data in db
    values.formName = formName;
    console.log(values);
    form.reset();
  };

  useEffect(() => {
    if (fillData.formName == formName) {
      getListOfFiedls.map((f, index) => {
        setValue(f, fillData[f]);
      });
    }
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 lg:w-1/2 md:w-full"
      >
        <div className="space-y-4 flex w-full flex-col">
          {fields &&
            fields.map((field, index) => (
              <DynamicFormField
                key={field.id}
                form={form}
                inField={field}
                control={form.control}
              />
            ))}
        </div>
      </form>
    </Form>
  );
}
