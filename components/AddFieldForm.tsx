//Library import
import React, { Fragment, useState } from "react";

// UI import
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

// Constant type import
import { Root2 } from "@/constant";
import SubFieldAdd from "./SubField";
import SubField from "./SubField";
import { Separator } from "./ui/separator";

// Add fields form props type
interface AddFieldsFormProps {
  inputFields: FieldArrayWithId<Root2, "inputFields", "id">[];
  form: UseFormReturn<Root2, any, undefined>;
  append: UseFieldArrayAppend<Root2, "inputFields">;
  remove: UseFieldArrayRemove;
}

export default function AddFieldForm({
  form,
  inputFields,
  append,
  remove,
}: AddFieldsFormProps) {
  const { register, watch, control } = form;

  return (
    <div>
      <h1 className="text-2xl font-normal">Input Creator</h1>
      <div>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-wrap space-y-1.5">
            {inputFields.map((field, i) => (
              <Fragment key={field.id}>
                <Accordion
                  type="single"
                  collapsible
                  className="w-1/3 p-2"
                  key={field.id}
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      {watch(`inputFields.${i}.inputLabel`) === ""
                        ? `InputField ${i + 1}`
                        : watch(`inputFields.${i}.inputLabel`)}
                    </AccordionTrigger>
                    <AccordionContent>
                      {/* input name filed */}
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
                      {/* input label filed */}
                      <FormField
                        name={`inputFields.${i}.inputLabel`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Input Label</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your input Label"
                                className="w-full focus-visible:ring-0 focus-visible:ring-offset-0"
                                {...field}
                                {...register(`inputFields.${i}.inputLabel`)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* input placeholder filed */}
                      <FormField
                        name={`inputFields.${i}.placeholder`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Input Placeholder</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your input placeholder"
                                className="w-full focus-visible:ring-0 focus-visible:ring-offset-0"
                                {...field}
                                {...register(`inputFields.${i}.placeholder`)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* input required filed */}
                      <FormField
                        name={`inputFields.${i}.required`}
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
                                {...register(`inputFields.${i}.required`)}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      {/* input type select filed */}
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
                                <SelectItem value="password">
                                  Password
                                </SelectItem>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="select">Select</SelectItem>
                                <SelectItem value="checkbox">
                                  CheckBox
                                </SelectItem>
                                <SelectItem value="textArea">
                                  Text Area
                                </SelectItem>
                                <SelectItem value="switch">Switch</SelectItem>
                                <SelectItem value="button">Button</SelectItem>
                                <SelectItem value="radio">
                                  Radio group
                                </SelectItem>
                                <SelectItem value="fieldGroup">
                                  Field Group
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* add condition to for specific type only */}
                      {watch(`inputFields.${i}.type`) === "select" ||
                      watch(`inputFields.${i}.type`) === "radio" ? (
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
                      {/* for subfield */}
                      <h3 className="text-md font-bold my-2">SubFields</h3>
                      <Separator className="h-1" />
                      <SubField
                        nestIndex={i}
                        control={control}
                        register={register}
                        form={form}
                      />
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
          </div>
        </div>
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
          Add
        </Button>
      </div>
    </div>
  );
}
