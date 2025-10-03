import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { query } from "@/lib/db/connection";
import { Asset } from "@/types/database";
import { v4 as uuidv4 } from "uuid";

/**
 * POST /api/upload
 * Upload a file and save metadata to database
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only images are allowed." },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    // Generate unique filename
    const fileExtension = file.name.split(".").pop();
    const uniqueFilename = `${uuidv4()}.${fileExtension}`;
    const uploadDir = join(process.cwd(), "public", "uploads");
    const filePath = join(uploadDir, uniqueFilename);

    // Ensure upload directory exists
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Convert file to buffer and write
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Save to database
    const result = await query<Asset>(
      `INSERT INTO assets (user_id, filename, original_filename, file_path, file_type, file_size, mime_type) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [
        session.user.id,
        uniqueFilename,
        file.name,
        `/uploads/${uniqueFilename}`,
        fileExtension || "unknown",
        file.size,
        file.type,
      ]
    );

    const asset = result.rows[0];

    return NextResponse.json(
      {
        success: true,
        message: "File uploaded successfully",
        asset: {
          id: asset.id,
          filename: asset.filename,
          originalFilename: asset.original_filename,
          url: asset.file_path,
          size: asset.file_size,
          type: asset.mime_type,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

