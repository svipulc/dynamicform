import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import DisplayForm from "./DisplayFormList";

export default function AdminPage() {
  return (
    <div className="">
      <h1 className="text-4xl font-normal">AdminPage</h1>
      <div className="pt-4">Create Your Custom Form here.</div>
      <div className="flex justify-around items-center ">
        <DisplayForm />
        <div>
          <Button
            variant={"default"}
            size={"lg"}
            className="cursor-pointer"
            asChild
          >
            <Link href={"/admin/form"} className="w-full flex">
              +
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
