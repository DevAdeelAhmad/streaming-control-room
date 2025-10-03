import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { query } from "@/lib/db/connection";
import { Asset } from "@/types/database";
import { unlink } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

/**
 * DELETE /api/assets/[id]
 * Delete an asset
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const assetId = params.id;

    // Get asset info
    const assetResult = await query<Asset>(
      "SELECT * FROM assets WHERE id = $1 AND user_id = $2",
      [assetId, session.user.id]
    );

    if (assetResult.rows.length === 0) {
      return NextResponse.json({ error: "Asset not found" }, { status: 404 });
    }

    const asset = assetResult.rows[0];

    // Delete from database
    await query("DELETE FROM assets WHERE id = $1", [assetId]);

    // Delete file from disk
    try {
      const filePath = join(process.cwd(), "public", asset.file_path);
      if (existsSync(filePath)) {
        await unlink(filePath);
      }
    } catch (fileError) {
      console.error("Failed to delete file from disk:", fileError);
      // Continue even if file deletion fails
    }

    return NextResponse.json({
      success: true,
      message: "Asset deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete asset:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

