import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="">
      <h1 className="text-4xl font-normal">AdminPage</h1>
      <div className="pt-4">Create Your Custom Form here.</div>

      <div className="flex justify-around items-center">
        <div className="w-[200px] shadow-md h-[200px] mt-4 p-4">
          <p> Display all the Created Form here</p>
        </div>
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
