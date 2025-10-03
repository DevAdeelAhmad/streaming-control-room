import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { query } from "@/lib/db/connection";
import { Theme } from "@/types/database";

/**
 * GET /api/themes/[id]
 * Get a specific theme
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const themeId = params.id;

    const result = await query<Theme>(
      "SELECT * FROM themes WHERE id = $1 AND user_id = $2",
      [themeId, session.user.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Theme not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      theme: result.rows[0],
    });
  } catch (error) {
    console.error("Failed to fetch theme:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/themes/[id]
 * Update a theme
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const themeId = params.id;
    const body = await request.json();
    const { name, description, configuration, thumbnail_url, is_default } = body;

    const result = await query<Theme>(
      `UPDATE themes 
       SET name = COALESCE($1, name),
           description = COALESCE($2, description),
           configuration = COALESCE($3, configuration),
           thumbnail_url = COALESCE($4, thumbnail_url),
           is_default = COALESCE($5, is_default),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6 AND user_id = $7
       RETURNING *`,
      [
        name,
        description,
        configuration ? JSON.stringify(configuration) : null,
        thumbnail_url,
        is_default,
        themeId,
        session.user.id,
      ]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Theme not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Theme updated successfully",
      theme: result.rows[0],
    });
  } catch (error) {
    console.error("Failed to update theme:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/themes/[id]
 * Delete a theme
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

    const themeId = params.id;

    const result = await query(
      "DELETE FROM themes WHERE id = $1 AND user_id = $2 RETURNING id",
      [themeId, session.user.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Theme not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Theme deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete theme:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

