import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const USERS = [
  { id: 1, name: "Alice", email: "alice@example.com", password: "password123" },
  { id: 2, name: "Bob", email: "bob@example.com", password: "password123" },
];

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const user = USERS.find((u) => u.email === email && u.password === password);
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = Buffer.from(JSON.stringify({ id: user.id, name: user.name, email: user.email })).toString("base64");

  const cookieStore = await cookies();
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ name: user.name, email: user.email });
}
