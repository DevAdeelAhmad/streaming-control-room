import { authOptions } from "@/lib/auth/auth-options";
import { query } from "@/lib/db/connection";
import { Asset } from "@/types/database";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

/**
 * GET /api/assets
 * List all assets for the authenticated user
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await query<Asset>(
      `SELECT * FROM assets 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [session.user.id]
    );

    return NextResponse.json({
      success: true,
      assets: result.rows,
    });
  } catch (error) {
    console.error("Failed to fetch assets:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

