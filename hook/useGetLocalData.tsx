import { LocalFormData } from "@/constant";
import React, { useEffect, useState } from "react";

export default function useGetLocalData(name: string) {
  const [localData, setLocalData] = useState<LocalFormData>([]);
  useEffect(() => {
    if (typeof window !== undefined) {
      const localData = window.localStorage.getItem(name);
      if (localData) {
        const tempData: LocalFormData = JSON.parse(localData);
        setLocalData(tempData);
      }
    }
  }, []);

  return { localData, setLocalData };
}
