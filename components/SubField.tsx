import { Root2 } from "@/constant";
import React, { Fragment } from "react";
import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormReturn,
} from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";

interface SubFieldProp {
  nestIndex: number;
  control: Control<Root2, any>;
  register: UseFormRegister<Root2>;
  form: UseFormReturn<Root2, any, undefined>;
}

export default function SubField({
  nestIndex,
  control,
  register,
  form,
}: SubFieldProp) {
  const { watch } = form;
  const { fields, remove, append } = useFieldArray({
    control,
    name: `inputFields.${nestIndex}.subFields`,
  });

  return (
    <div className="flex flex-col">
      {fields.map((field, i) => (
        <Fragment key={field.id}>
          <Accordion
            type="single"
            collapsible
            className="w-full p-2"
            key={field.id}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                {watch(`inputFields.${nestIndex}.subFields.${i}.inputLabel`) ===
                ""
                  ? `Sub InputField ${i + 1}`
                  : watch(`inputFields.${nestIndex}.subFields.${i}.inputLabel`)}
              </AccordionTrigger>
              <AccordionContent>
                {/* input name filed */}
                <FormField
                  name={`inputFields.${nestIndex}.subFields.${i}.inputName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Input Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your input name"
                          className="w-full focus-visible:ring-0 focus-visible:ring-offset-0"
                          {...field}
                          {...register(
                            `inputFields.${nestIndex}.subFields.${i}.inputName`
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* input label filed */}
                <FormField
                  name={`inputFields.${nestIndex}.subFields.${i}.inputLabel`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Input Label</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your input Label"
                          className="w-full focus-visible:ring-0 focus-visible:ring-offset-0"
                          {...field}
                          {...register(
                            `inputFields.${nestIndex}.subFields.${i}.inputLabel`
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* input placeholder filed */}
                <FormField
                  name={`inputFields.${nestIndex}.subFields.${i}.placeholder`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Input Placeholder</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your input placeholder"
                          className="w-full focus-visible:ring-0 focus-visible:ring-offset-0"
                          {...field}
                          {...register(
                            `inputFields.${nestIndex}.subFields.${i}.placeholder`
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* input required filed */}
                <FormField
                  name={`inputFields.${nestIndex}.subFields.${i}.required`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border mt-2 p-2">
                      <div className="space-y-0.5">
                        <FormLabel className="text-md">
                          Want to make Required?
                        </FormLabel>
                        <FormDescription></FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          {...register(
                            `inputFields.${nestIndex}.subFields.${i}.required`
                          )}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* input type select filed */}
                <FormField
                  name={`inputFields.${nestIndex}.subFields.${i}.type`}
                  render={({ field }) => (
                    <FormItem className="w-full p-2">
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        {...register(
                          `inputFields.${nestIndex}.subFields.${i}.type`
                        )}
                      >
                        <FormControl>
                          <SelectTrigger className="">
                            <SelectValue placeholder="select input type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="password">Password</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="select">Select</SelectItem>
                          <SelectItem value="checkbox">CheckBox</SelectItem>
                          <SelectItem value="textArea">Text Area</SelectItem>
                          <SelectItem value="switch">Switch</SelectItem>
                          <SelectItem value="button">Button</SelectItem>
                          <SelectItem value="radio">Radio group</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* add condition to for specific type only */}
                {watch(`inputFields.${nestIndex}.subFields.${i}.type`) ===
                  "select" ||
                watch(`inputFields.${nestIndex}.subFields.${i}.type`) ===
                  "radio" ? (
                  <FormField
                    name={`inputFields.${nestIndex}.subFields.${i}.options`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Options</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your Select options separated by , "
                            className="w-full focus-visible:ring-0 focus-visible:ring-offset-0"
                            {...field}
                            {...register(
                              `inputFields.${nestIndex}.subFields.${i}.options`
                            )}
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
        </Fragment>
      ))}
      <Button
        className="mt-2"
        type="button"
        onClick={() => {
          append({
            id: "",
            inputName: "",
            inputLabel: "",
            placeholder: "",
            type: "",
            required: false,
            options: [],
          });
          // console.log(inputFields); //remove this console log
        }}
      >
        Add SubField
      </Button>
    </div>
  );
}
