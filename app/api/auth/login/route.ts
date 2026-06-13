import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  // Mock auth: accept any non-empty credentials
  const name = email.split("@")[0];
  const payload = JSON.stringify({ name, email });
  const token = Buffer.from(payload).toString("base64");

  const cookieStore = await cookies();
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return NextResponse.json({ name, email });
}
