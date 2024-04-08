import React, { EventHandler } from "react";
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface formType {
  formName: string;
  inputFields: {
    inputName: string;
    type: string;
    options: string[];
  }[];
}

interface AddFieldsFormProps {
  inputFields: FieldArrayWithId<formType, "inputFields", "id">[]; // change required
  // control: any;
  // register: UseFormRegister<formType>;
  form: UseFormReturn<formType, any, undefined>;
  append: UseFieldArrayAppend<formType, "inputFields">;
}

export default function AddFieldForm({
  form,
  inputFields,
  append,
}: AddFieldsFormProps) {
  const { register } = form;

  return (
    <main>
      <h1 className="text-2xl font-normal">Input Creator</h1>
      <div>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            {inputFields.map((field, index) => (
              <FormField
                name="inputName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Input Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your input name"
                        className="w-1/3"
                        {...register(`inputFields.${index}.inputName`)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>
        <Button
          type="submit"
          onClick={() => {
            append({ inputName: "", type: "", options: [""] });
          }}
        >
          Add
        </Button>
      </div>
    </main>
  );
}
