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
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import AddFieldForm from "./AddFieldForm";

export default function CreateForm() {
  const form = useForm({
    defaultValues: {
      formName: "",
      fields: [],
    },
  });

  const onSubmit = (values: {
    formName: string;
    fields: { name: string; type: string; options: string }[];
  }) => {
    console.log(values);
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
                          className="w-1/3"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button type="submit">Save</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
