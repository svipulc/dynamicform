"use client";
// Library import
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// UI import
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import FullForm from "./FullForm";

// Constant type import
import { LocalFormData, Root2 } from "@/constant";

export default function UserPage() {
  const [currentForm, setCurrentForm] = useState("Register Form");
  const [formData, setFormData] = useState<Root2>({
    id: "",
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
            // console.log(f.inputFields);  remove this also
            setFormData(f);
          }
        });
      }
    }
  }, [currentForm]);

  // submit not much required put for under standing purpose
  const onSubmit = () => {
    // console.log("submit");
  };

  return (
    <div>
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
                      {options &&
                        options.map((option) => {
                          return (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          );
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
          <FullForm
            key={formData.id}
            fields={formData.inputFields}
            formName={formData.formName}
          />
        </div>
      </div>
    </div>
  );
}
