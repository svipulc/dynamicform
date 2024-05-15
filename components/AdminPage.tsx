import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import DisplayForm from "./DisplayFormList";

export default function AdminPage() {
  return (
    <div className="">
      <h1 className="text-4xl font-normal">AdminPage</h1>
      <div className="pt-4">Create Your Custom Form here.</div>
      <div className="block md:flex justify-around items-center ">
        <DisplayForm />
        <div className="mt-2 w-[200px]">
          <Button
            variant={"default"}
            size={"lg"}
            className="cursor-pointer"
            asChild
          >
            <Link href={"/admin/form"} className="w-full flex-col gap-1">
              +<span>Create form</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
