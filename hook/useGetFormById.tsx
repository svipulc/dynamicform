import { LocalFormData, Root2 } from "@/constant";
import React, { useEffect, useState } from "react";

export default function useGetFormById(formId: string) {
  const [formData, setFormData] = useState<Root2>({
    id: "",
    formName: "",
    inputFields: [],
  });
  useEffect(() => {
    if (typeof window !== undefined) {
      const localData = window.localStorage.getItem("form");
      if (localData) {
        const tempData: LocalFormData = JSON.parse(localData);
        tempData.filter((f, index) => {
          if (f.id == formId) {
            setFormData(f);
          }
        });
      }
    }
  }, []);
  return { formData, setFormData };
}
