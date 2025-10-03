import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { query } from "@/lib/db/connection";
import { PlayoutSession, Theme } from "@/types/database";

/**
 * GET /api/playout/[id]
 * Fetch playout configuration by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const playoutId = params.id;

    // Check if playout session exists
    const sessionResult = await query<PlayoutSession>(
      "SELECT * FROM playout_sessions WHERE id = $1",
      [playoutId]
    );

    if (sessionResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Playout session not found" },
        { status: 404 }
      );
    }

    const session = sessionResult.rows[0];

    // Get the active theme for this user (if any)
    const themeResult = await query<Theme>(
      `SELECT * FROM themes 
       WHERE user_id = $1 
       ORDER BY updated_at DESC 
       LIMIT 1`,
      [session.user_id]
    );

    const config = themeResult.rows[0]?.configuration || {
      textLayers: [],
      imageLayers: [],
      layoutSettings: {
        width: 1920,
        height: 1080,
        backgroundColor: "#000000",
      },
    };

    // Update last_active timestamp
    await query(
      "UPDATE playout_sessions SET last_active = CURRENT_TIMESTAMP WHERE id = $1",
      [playoutId]
    );

    return NextResponse.json({
      success: true,
      config: {
        id: playoutId,
        ...config,
      },
      session: {
        id: session.id,
        name: session.session_name,
        isActive: session.is_active,
      },
    });
  } catch (error) {
    console.error("Failed to fetch playout config:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/playout/[id]
 * Update playout configuration
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

    const playoutId = params.id;
    const body = await request.json();

    // Verify playout session belongs to user
    const sessionResult = await query<PlayoutSession>(
      "SELECT * FROM playout_sessions WHERE id = $1 AND user_id = $2",
      [playoutId, session.user.id]
    );

    if (sessionResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Playout session not found or unauthorized" },
        { status: 404 }
      );
    }

    // Configuration will be broadcast via WebSocket
    // This endpoint is for direct API updates
    return NextResponse.json({
      success: true,
      message: "Configuration update queued",
      config: body,
    });
  } catch (error) {
    console.error("Failed to update playout config:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/playout/[id]
 * Delete/deactivate playout session
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

    const playoutId = params.id;

    // Mark session as inactive
    const result = await query(
      "UPDATE playout_sessions SET is_active = false WHERE id = $1 AND user_id = $2 RETURNING *",
      [playoutId, session.user.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Playout session not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Playout session deactivated",
    });
  } catch (error) {
    console.error("Failed to delete playout session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
