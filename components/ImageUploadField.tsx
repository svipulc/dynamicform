import React, { useEffect, useRef, useState } from "react";
import Uppy from "@uppy/core";
import AwsS3 from "@uppy/aws-s3";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { InputField } from "@/constant";
import { useToast } from "./ui/use-toast";

interface ImageUploadFieldProps {
  form: UseFormReturn<FieldValues, any, undefined>;
  inField: InputField;
}

export default function ImageUploadField({
  form,
  inField,
}: ImageUploadFieldProps) {
  const { toast } = useToast();
  const [imageStatus, setImageStatus] = useState<Boolean>(false);
  const uppyRef = useRef<any>();
  useEffect(() => {
    uppyRef.current = new Uppy({
      restrictions: {
        allowedFileTypes: ["image/*", ".jpg", ".jpeg", ".png", ".gif"],
      },
      onBeforeUpload(file) {
        if (!file) {
          toast({
            variant: "destructive",
            title: "File Required",
          });
          return false;
        } else {
          return true;
        }
      },
    })
      .use(AwsS3, {
        async getUploadParameters(file): Promise<any> {
          const response = await fetch("/api/upload", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              accept: "application/json",
            },
            body: JSON.stringify({
              filename: file.name,
              contentType: file.type,
            }),
          });
          const data = await response.json();
          return {
            method: data.method,
            url: data.url,
            fields: {},
            headers: {
              "content-type": file.type,
            },
          };
        },
      })
      .on("complete", (result) => {
        console.log("result", result);
        uppyRef.current.setState({ files: {} });
      });
    return () => {
      uppyRef.current.close();
    };
  }, []);
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
      <Label htmlFor={inField.inputName}>{inField.inputLabel}</Label>
      <div className="flex gap-4">
        <Input
          id={inField.inputName}
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={(file) => {
            if (file.target.files != null) {
              setImageStatus(true);
              uppyRef.current.addFile({
                name: file.target.files[0].name,
                type: file.target.files[0].type,
                data: file.target.files[0],
              });
              console.log("change file state", file);
            }
          }}
          required={inField.required}
        />
        <Button
          type="button"
          size={"sm"}
          onClick={() => {
            if (imageStatus) {
              uppyRef.current.upload().then((result: any) => {
                if (result.successful[0].uploadURL) {
                  form.setValue(
                    `${inField.inputName}`,
                    result.successful[0].uploadURL
                  );
                  toast({
                    variant: "success",
                    title: "Image upload Successfully",
                  });
                  setImageStatus(false);
                }
              });
            } else {
              toast({
                variant: "destructive",
                title: "Image Required",
              });
            }
          }}
        >
          Upload
        </Button>
      </div>
    </div>
  );
}
