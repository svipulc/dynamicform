"use client";

// Library import
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

// UI import
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddFieldForm from "./AddFieldForm";

//Constant import
import { LocalFormData, Root2 } from "@/constant";
import useGetLocalData from "@/hook/useGetLocalData";

// Create Form Props Type
interface CreateFormProps {
  inputs?: Root2;
}

export default function CreateForm({ inputs }: CreateFormProps) {
  const router = useRouter();
  const { localData } = useGetLocalData("form");
  const form = useForm<Root2>({
    defaultValues: {
      formName: "",
      inputFields: [
        {
          inputName: "",
          inputLabel: "",
          placeholder: "",
          type: "",
          required: false,
          options: [],
          subFields: [
            {
              inputName: "",
              inputLabel: "",
              placeholder: "",
              type: "",
              required: false,
              options: [],
            },
          ],
        },
      ],
    },
  });
  const { register, control, setValue } = form;
  const { fields, append, remove } = useFieldArray({
    name: "inputFields",
    control,
  });
  useEffect(() => {
    if (inputs != undefined) {
      setValue("id", inputs.id);
      setValue("formName", inputs.formName);
      setValue("inputFields", inputs.inputFields);
    }
  }, [inputs]);

  // Handling Submit method;
  const onSubmit = (values: Root2) => {
    const formData = { ...values };

    // Adding ID in Form and InputFields

    if (!formData.id) {
      formData.id = Math.floor(Math.random() * 9999 + 1000).toString();
    }
    formData.inputFields.map((field) => {
      if (!field.id) {
        field.id = Math.floor(Math.random() * 999 + 100).toString();
      }
      if (field.options && typeof field?.options == "string") {
        const a = field?.options.split(",");
        field.options = a;
      }

      if (field.subFields) {
        field.subFields.map((field, index) => {
          if (!field.id) {
            field.id = Math.floor(Math.random() * 999 + 100).toString();
          }
          if (field.options && typeof field?.options == "string") {
            const a = field?.options.split(",");
            field.options = a;
          }
        });
      }
    });

    // Checking add already in local storage then add data otherwise add new data in local storage.
    // const existingData = localStorage.getItem("form");
    if (formData) {
      // const data: LocalFormData = JSON.parse(existingData);
      const updatedData = localData.filter((f, index) => {
        if (f.id != formData.id) {
          return f;
        }
      });
      const newData = [...updatedData, formData];
      localStorage.setItem("form", JSON.stringify(newData));
      // console.log("data", newData);
    } else {
      localStorage.setItem("form", JSON.stringify([formData]));
    }
    // console.log(newData); // remove this console log
    router.push("/admin");
  };
  return (
    <Card className="w-full">
      <CardContent className="pt-4">
        <Form {...form}>
          <form {...form} onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="formName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Form Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your form name"
                          {...field}
                          {...register("formName", { required: true })}
                          className="w-1/3 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <AddFieldForm
                form={form}
                inputFields={fields}
                append={append}
                remove={remove}
              />
            </div>
            <CardFooter className="flex justify-between mt-3 p-0">
              <Button variant="outline" type="button">
                <Link href={"/admin"}>Cancel</Link>
              </Button>
              <Button type="submit">Submit</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
