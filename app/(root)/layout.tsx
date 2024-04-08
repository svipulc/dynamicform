import React, { ReactNode } from "react";
import { Metadata } from "next";

interface RootLayoutProp {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProp) {
  return <main>{children}</main>;
}
