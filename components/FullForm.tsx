"use client";
// Library import
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";

// UI import
import { Form } from "@/components/ui/form";
import DynamicFormField from "./DynamicFormField";

// Constant type import
import { InputField } from "@/constant";

export default function FullForm({ fields }: { fields: InputField[] }) {
  const form = useForm();

  const onSubmit = (values) => {
    // type change required
    // store user data in db
    console.log(values);
    form.reset();
  };

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
