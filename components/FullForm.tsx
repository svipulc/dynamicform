"use client";

import React, { Fragment, useEffect } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { InputField } from "@/constant";
import DynamicFormField from "./DynamicFormField";
import { Button } from "./ui/button";

export default function FullForm({ fields }: { fields: InputField[] }) {
  const form = useForm();

  const onSubmit = (values) => {
    // type change required
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
                type={field.type}
                label={field.inputLabel}
                name={field.inputName}
                placeholder={field.placeholder}
                control={form.control}
                Options={field.options && field.options}
              />
            ))}
        </div>
      </form>
    </Form>
  );
}
