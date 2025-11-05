import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 0;

export async function GET() {
  // Return empty array since rooms are ephemeral (no persistence)
  return NextResponse.json({ rooms: [] }, { status: 200 });
}
