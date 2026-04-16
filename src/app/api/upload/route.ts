import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID?.trim();
    const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID?.trim();
    const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY?.trim();
    const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME?.trim();
    const R2_PUBLIC_URL_PREFIX = process.env.R2_PUBLIC_URL_PREFIX?.trim() || "https://pub-8bd96ff5b3f74aefab467e23265651e3.r2.dev";

    if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
      return NextResponse.json(
        { error: "R2 credentials are not fully configured in the environment." },
        { status: 500 }
      );
    }

    const client = new S3Client({
      region: "auto",
      endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
      },
    });

    // Create a safe, unique filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const originalName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "");
    const fileName = `${uniqueSuffix}-${originalName}`;

    await client.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: fileName,
        Body: buffer,
        ContentType: file.type,
      })
    );

    // Combine prefix and filename to generate the accessible public URL
    const publicUrl = `${R2_PUBLIC_URL_PREFIX}/${fileName}`;

    return NextResponse.json({ url: publicUrl, success: true });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: `Upload failed: ${error?.message || "Unknown Error"}` }, { status: 500 });
  }
}
