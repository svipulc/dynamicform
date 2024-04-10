"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm, useFieldArray } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import AddFieldForm from "./AddFieldForm";
import { register } from "module";
import Link from "next/link";
import { LocalFormData } from "@/constant";
import { redirect } from "next/navigation";
import { url } from "inspector";

interface formType {
  formName: string;
  inputFields: {
    inputName: string;
    type: string;
    options?: string[] | string;
    Subfields?: {
      inputName: string;
      type: string;
      options?: string[] | string;
    }[];
  }[];
}

export default function CreateForm() {
  const form = useForm<formType>({
    defaultValues: {
      formName: "",
      inputFields: [
        {
          inputName: "",
          type: "",
          options: [],
          Subfields: [
            {
              inputName: "",
              type: "",
              options: [],
            },
          ],
        },
      ],
    },
  });
  const { register, control } = form;
  const { fields, append, remove } = useFieldArray({
    name: "inputFields",
    control,
  });
  // const {
  //   fields: subFields,
  //   append: subAppend,
  //   remove: subRemove,
  // } = useFieldArray({
  //   name: `inputFields.${number}.Subfields`,
  //   control,
  // });

  const onSubmit = (values: formType) => {
    const localData = [{ ...values }];

    localData.map((f, i) => {
      f.inputFields.map((field) => {
        if (field.options && typeof field?.options == "string") {
          const a = field?.options.split(";");
          field.options = a;
        }
      });
    });

    const existingData = localStorage.getItem("form");
    if (existingData) {
      const data: LocalFormData = JSON.parse(existingData);
      const newData = [...data, ...localData];
      localStorage.setItem("form", JSON.stringify(newData));
    } else {
      localStorage.setItem("form", JSON.stringify(localData));
    }
    console.log(localData);
    redirect("/admin");
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
                          {...register("formName")}
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
              <Button type="submit">Save</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
