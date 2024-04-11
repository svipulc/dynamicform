"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import useForm from "react-hook-form";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { formData, OptionType } from "@/constant";
import { render } from "react-dom";
import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface DynamicFormFieldProps {
  control: any; // change required useForm.Control;
  label: string;
  name: string;
  placeholder: string;
  type: string;
  Options?: string[] | string;
  // fields?: formData;
}

export default function DynamicFormField({
  control,
  label,
  placeholder,
  name,
  type,
  Options,
}: // fields,
DynamicFormFieldProps) {
  // required switch method to display different input method and option

  switch (type) {
    case "text":
      return (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={placeholder}
                  type={type}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "email":
      return (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={placeholder}
                  type={type}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "password":
      return (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={placeholder}
                  type={type}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "button":
      return <Button type="submit">{label}</Button>;

    case "switch":
      return (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">{label}</FormLabel>
                <FormDescription></FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      );
    case "select":
      return (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {!(typeof Options == "string") &&
                    Options?.map((option) => {
                      return <SelectItem value={option}>{option}</SelectItem>;
                    })}
                </SelectContent>
              </Select>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "checkbox":
      return (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{label}</FormLabel>
                <FormDescription></FormDescription>
              </div>
            </FormItem>
          )}
        />
      );
    case "textArea":
      return (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={placeholder}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "radio":
      return (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {!(typeof Options == "string") &&
                    Options?.map((option) => {
                      return (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={option} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option}
                          </FormLabel>
                        </FormItem>
                      );
                    })}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    // case "fields":
    //   return (
    //     <>
    //       {fields?.label && <FormLabel>{fields?.label}</FormLabel>}
    //       <div className="ps-6  pt-4">
    //         {fields?.fields?.map((subField) => {
    //           return (
    //             <FormField
    //               control={control}
    //               name={subField.text!}
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel>{subField.label}</FormLabel>
    //                   <FormControl>
    //                     <Input
    //                       {...field}
    //                       placeholder={placeholder}
    //                       type={subField.type}
    //                       className="w-full"
    //                     />
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />
    //           );
    //         })}
    //       </div>
    //     </>
    //   );
  }
}
