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
import AddFieldForm from "./AddFieldForm";
import Link from "next/link";
import { InputField, LocalFormData, Root2 } from "@/constant";
import { redirect, useRouter } from "next/navigation";
import { url } from "inspector";

interface formType {
  id: string;
  formName: string;
  inputFields: {
    id: string;
    inputName: string;
    inputLabel: string;
    placeholder: string;
    type: string;
    options?: string[] | string;
  }[];
}

interface CreateFormProps {
  inputs?: Root2;
}

export default function CreateForm({ inputs }: CreateFormProps) {
  const router = useRouter();
  const form = useForm<formType>({
    defaultValues: {
      formName: "",
      inputFields: [
        {
          inputName: "",
          inputLabel: "",
          placeholder: "",
          type: "",
          options: [],
        },
      ],
    },
  });
  const { register, control } = form;
  const { fields, append, remove } = useFieldArray({
    name: "inputFields",
    control,
  });

  const onSubmit = (values: formType) => {
    const localData = [{ ...values }];
    localData.map((f, i) => {
      f.id = Math.floor(Math.random() * 9999 + 1000).toString();
      f.inputFields.map((field) => {
        field.id = Math.floor(Math.random() * 999 + 100).toString();
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
              <Button type="submit">Submit</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
