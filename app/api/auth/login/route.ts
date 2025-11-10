import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const password = String(formData.get("password") || "");

    if (!email || !password) {
      return NextResponse.redirect(new URL(`/login?error=missing_fields`, req.url), { status: 303 });
    }

    const { rows } = await pool.query(
      `SELECT id, name, email, password_hash FROM users WHERE email = $1 LIMIT 1`,
      [email]
    );

    if (!rows.length) {
      return NextResponse.redirect(new URL(`/login?error=invalid_credentials`, req.url), { status: 303 });
    }

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password_hash as string);

    if (!valid) {
      return NextResponse.redirect(new URL(`/login?error=invalid_credentials`, req.url), { status: 303 });
    }

    const res = NextResponse.redirect(new URL(`/dashboard`, req.url), { status: 303 });
    const payload = Buffer.from(
      JSON.stringify({ id: user.id, name: user.name as string, email: user.email as string })
    ).toString("base64");
    res.cookies.set("session_user", payload, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    return res;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.redirect(new URL(`/login?error=server_error`, req.url), { status: 303 });
  }
}
