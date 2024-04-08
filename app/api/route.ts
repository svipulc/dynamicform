import { DummyFormData } from "@/constant";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET() {
  return Response.json({ data: DummyFormData });
}
