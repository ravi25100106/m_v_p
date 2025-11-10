import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const cookies = Object.fromEntries(
      cookieHeader.split(/;\s*/).filter(Boolean).map((c) => {
        const idx = c.indexOf("=");
        if (idx === -1) return [c, ""]; 
        return [decodeURIComponent(c.slice(0, idx)), decodeURIComponent(c.slice(idx + 1))];
      })
    );

    const raw = cookies["session_user"];
    if (!raw) return NextResponse.json({ user: null }, { status: 200 });

    let user: { id: number | string; name: string; email: string } | null = null;
    try {
      const decoded = Buffer.from(raw, "base64").toString("utf-8");
      user = JSON.parse(decoded);
    } catch {
      user = null;
    }

    if (!user) return NextResponse.json({ user: null }, { status: 200 });

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: "",
      },
    });
  } catch (e) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
