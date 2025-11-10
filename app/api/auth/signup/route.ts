import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const phone = String(formData.get("phone") || "").trim();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    if (!name || !email || !password) {
      return NextResponse.redirect(new URL(`/signup?error=missing_fields`, req.url), { status: 303 });
    }
    if (password.length < 8) {
      return NextResponse.redirect(new URL(`/signup?error=weak_password`, req.url), { status: 303 });
    }
    if (password !== confirmPassword) {
      return NextResponse.redirect(new URL(`/signup?error=password_mismatch`, req.url), { status: 303 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    try {
      await pool.query(
        `INSERT INTO users (name, email, phone, password_hash) VALUES ($1, $2, $3, $4)`,
        [name, email, phone || null, passwordHash]
      );
    } catch (e: any) {
      // unique violation
      if (e && e.code === "23505") {
        return NextResponse.redirect(new URL(`/signup?error=email_exists`, req.url), { status: 303 });
      }
      throw e;
    }

    return NextResponse.redirect(new URL(`/login?success=account_created`, req.url), { status: 303 });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.redirect(new URL(`/signup?error=server_error`, req.url), { status: 303 });
  }
}
