"use client";

import React from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { formData, OptionType } from "@/constant";
import DynamicFormField from "./DynamicFormField";
import { Button } from "./ui/button";

export default function FullForm({ fields }: { fields: formData[] }) {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      twoFactor: false,
      stack: "",
      address: "",
      line1: "",
      line2: "",
    },
  });
  const onSubmit = (values: {
    email: string;
    password: string;
    address: string;
    line1: string;
    line2: string;
  }) => {
    //handle form

    if (values.line1 && values.line2) {
      values.address = `${values.line1} ${values.line2}`;
    }
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 lg:w-1/2 md:w-full"
      >
        <div className="space-y-4 flex w-full flex-col">
          {fields &&
            fields.map((field) => (
              <DynamicFormField
                key={field.label}
                type={field.type}
                label={field.label}
                control={form.control}
                tag={field.tag}
                Options={field.options!}
                fields={field}
              />
            ))}
        </div>
      </form>
    </Form>
  );
}
