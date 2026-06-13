import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token");
  if (!token) return NextResponse.json(null);

  try {
    const payload = JSON.parse(Buffer.from(token.value, "base64").toString());
    return NextResponse.json(payload);
  } catch {
    return NextResponse.json(null);
  }
}
