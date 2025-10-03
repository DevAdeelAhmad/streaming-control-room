import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { query } from "@/lib/db/connection";
import { Theme } from "@/types/database";

/**
 * GET /api/themes
 * List all themes for the authenticated user
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await query<Theme>(
      `SELECT * FROM themes 
       WHERE user_id = $1 
       ORDER BY updated_at DESC`,
      [session.user.id]
    );

    return NextResponse.json({
      success: true,
      themes: result.rows,
    });
  } catch (error) {
    console.error("Failed to fetch themes:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/themes
 * Create a new theme
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, configuration, thumbnail_url, is_default } = body;

    if (!name || !configuration) {
      return NextResponse.json(
        { error: "Name and configuration are required" },
        { status: 400 }
      );
    }

    // Create theme
    const result = await query<Theme>(
      `INSERT INTO themes (user_id, name, description, configuration, thumbnail_url, is_default) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [
        session.user.id,
        name,
        description || null,
        JSON.stringify(configuration),
        thumbnail_url || null,
        is_default || false,
      ]
    );

    const newTheme = result.rows[0];

    return NextResponse.json(
      {
        success: true,
        message: "Theme created successfully",
        theme: newTheme,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create theme:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

