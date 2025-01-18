import { nikeProducts } from "@/app/components/Cards/data";
import { NextResponse } from "next/server";

export async function GET() {
  // Respond with the data as JSON
  return NextResponse.json(nikeProducts);
}
