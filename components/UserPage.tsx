"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FullForm from "./FullForm";
import { LocalFormData, Root2 } from "@/constant";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function UserPage() {
  const [currentForm, setCurrentForm] = useState("Register Form");
  const [formData, setFormData] = useState<Root2>({
    formName: "",
    inputFields: [],
  });
  const [options, setOptions] = useState<string[]>([]);
  const form = useForm({
    defaultValues: {
      currentForm: "",
    },
  });

  useEffect(() => {
    if (typeof window !== undefined) {
      const localData = window.localStorage.getItem("form");
      if (localData) {
        const sendData: LocalFormData = JSON.parse(localData);
        sendData.map((f, index) => {
          if (!options.includes(f.formName)) {
            options.push(f.formName);
          }
          if (f.formName == currentForm) {
            console.log(f.inputFields);
            setFormData(f);
          }
        });
      }
    }
  }, [currentForm]);

  const onSubmit = () => {
    console.log("submit");
  };

  return (
    <div>
      {/* <h1 className="text-4xl font-normal">UserPage</h1> */}
      <div className="pt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="currentForm"
              render={({ field }) => (
                <FormItem className="w-1/3">
                  <FormLabel>Select form</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      setCurrentForm(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your Form" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {options?.map((option) => {
                        return <SelectItem value={option}>{option}</SelectItem>;
                      })}
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <h3 className="text-4xl font-normal">{formData.formName}</h3>
        <div className="mt-4 flex justify-center items-center flex-col p-4">
          <FullForm fields={formData.inputFields} />
        </div>
      </div>
    </div>
  );
}
