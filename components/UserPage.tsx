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
import { formData } from "@/constant";

export default async function UserPage() {
  const response = await fetch("http://localhost:3000/api", {
    cache: "no-store",
  });
  const { data }: { data: formData[] } = await response.json();

  console.log(data);

  return (
    <div>
      <h1 className="text-4xl font-normal">UserPage</h1>
      <div className="pt-4">
        <h3 className="text-md font-normal">Dynamic form</h3>
        <div className="mt-4 flex justify-center items-center flex-col p-4">
          <FullForm fields={data} />
        </div>
      </div>
    </div>
  );
}
