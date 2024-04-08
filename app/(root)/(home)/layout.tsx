import Sidebar from "@/components/Sidebar";
import React, { ReactNode } from "react";

interface HomeLayoutProp {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProp) {
  return (
    <main className="relative">
      <div className="flex">
        <Sidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pd-14 sm:px-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
}
