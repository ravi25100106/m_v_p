import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    const allowedTypes = new Set([
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]);

    if (!allowedTypes.has(file.type)) {
      return NextResponse.json({ error: "Only PDF or Word files are allowed" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Read local feedback.pdf to include as an additional attachment
    const feedbackPath = path.join(process.cwd(), "feedback.pdf");
    let feedbackBuffer: Buffer | null = null;
    try {
      const fb = await fs.readFile(feedbackPath);
      feedbackBuffer = Buffer.from(fb);
    } catch {
      // If feedback.pdf is missing, proceed without it
      feedbackBuffer = null;
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.FROM_EMAIL || user;
    const to = "ravishankar2510.prime@gmail.com";

    if (!host || !user || !pass || !from) {
      return NextResponse.json({ error: "SMTP is not configured on the server" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to,
      subject: `File submission: ${file.name}`,
      text: `Please find the attached file: ${file.name}`,
      attachments: [
        {
          filename: file.name,
          content: buffer,
          contentType: file.type || undefined,
        },
        ...(feedbackBuffer
          ? [
              {
                filename: "feedback.pdf",
                content: feedbackBuffer,
                contentType: "application/pdf",
              },
            ]
          : []),
      ],
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("send-file error", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
