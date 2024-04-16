"use client";
// Library import
import React, { Fragment, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";

// UI import
import { Form } from "@/components/ui/form";
import DynamicFormField from "./DynamicFormField";

// Constant type import
import {
  fillData,
  fillDatakeys,
  InputField,
  objectType,
  Root2,
} from "@/constant";

export default function FullForm({
  fields,
  formName,
}: {
  fields: InputField[];
  formName: string;
}) {
  let listOfFields: string[] | keyof typeof fillData = [];
  fields.map((f, index) => {
    if (!listOfFields.includes(f.inputName)) {
      if (f.type != "fieldGroup" && f.type != "button") {
        listOfFields.push(f.inputName);
      }
      if (f.subFields) {
        f.subFields.map((sf, index) => {
          if (!listOfFields.includes(sf.inputName)) {
            listOfFields.push(sf.inputName);
          }
        });
      }
    }
  });
  let obj: objectType = {};
  for (let i = 0; i < listOfFields.length; i++) {
    obj[listOfFields[i]] = "";
  }
  const form = useForm({
    defaultValues: obj,
  });
  const { setValue } = form;
  const onSubmit = (values: FieldValues) => {
    // type change required
    // store user data in db
    // handle submit method for subfield

    values.formName = formName;
    console.log(values);
    form.reset();
  };

  useEffect(() => {
    if (fillData.formName == formName) {
      listOfFields.map((f, index) => {
        setValue(f, fillData[f as fillDatakeys]);
      });
    }
  }, []);

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
