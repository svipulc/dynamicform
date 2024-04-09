import React, { EventHandler, SyntheticEvent } from "react";
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormReturn,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface formType {
  formName: string;
  inputFields: {
    inputName: string;
    type: string;
    options?: string[] | string;
  }[];
}

interface AddFieldsFormProps {
  inputFields: FieldArrayWithId<formType, "inputFields", "id">[]; // change required
  form: UseFormReturn<formType, any, undefined>;
  append: UseFieldArrayAppend<formType, "inputFields">;
  remove: UseFieldArrayRemove;
}

export default function AddFieldForm({
  form,
  inputFields,
  append,
  remove,
}: AddFieldsFormProps) {
  const { register, watch } = form;

  return (
    <main>
      <h1 className="text-2xl font-normal">Input Creator</h1>
      <div>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            {inputFields.map((field, i) => (
              <>
                <Accordion type="single" collapsible className="w-1/3 p-2">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      {watch(`inputFields.${i}.inputName`) === ""
                        ? `InputField ${i + 1}`
                        : watch(`inputFields.${i}.inputName`)}
                    </AccordionTrigger>
                    <AccordionContent>
                      <FormField
                        name={`inputFields.${i}.inputName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Input Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your input name"
                                className="w-full focus-visible:ring-0 focus-visible:ring-offset-0"
                                {...field}
                                {...register(`inputFields.${i}.inputName`)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        name={`inputFields.${i}.type`}
                        render={({ field }) => (
                          <FormItem className="w-full p-2">
                            <FormLabel>Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              {...register(`inputFields.${i}.type`)}
                            >
                              <FormControl>
                                <SelectTrigger className="">
                                  <SelectValue placeholder="select input type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="text">Text</SelectItem>
                                <SelectItem value="select">Select</SelectItem>
                                <SelectItem value="checkbox">
                                  CheckBox
                                </SelectItem>
                                <SelectItem value="textArea">
                                  Text Area
                                </SelectItem>
                                <SelectItem value="switch">Switch</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* add condition to for specific type only */}
                      {watch(`inputFields.${i}.type`) === "select" ? (
                        <FormField
                          name={`inputFields.${i}.options`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Options</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your Select options separated by ; "
                                  className="w-full focus-visible:ring-0 focus-visible:ring-offset-0"
                                  {...field}
                                  {...register(`inputFields.${i}.options`)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ) : null}

                      {i > 0 && (
                        <div>
                          <Button
                            type="button"
                            variant={"outline"}
                            onClick={() => {
                              remove(i);
                            }}
                          >
                            -
                          </Button>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </>
            ))}
          </div>
        </div>
        <Button
          className="mt-2"
          type="button"
          onClick={() => {
            append({ inputName: "", type: "", options: [] });
            console.log(inputFields);
          }}
        >
          Add
        </Button>
      </div>
    </main>
  );
}
