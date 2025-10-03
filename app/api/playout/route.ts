import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth-options";
import { query } from "@/lib/db/connection";
import { PlayoutSession } from "@/types/database";

/**
 * GET /api/playout
 * List all playout sessions for the authenticated user
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await query<PlayoutSession>(
      `SELECT * FROM playout_sessions 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [session.user.id]
    );

    return NextResponse.json({
      success: true,
      sessions: result.rows,
    });
  } catch (error) {
    console.error("Failed to fetch playout sessions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/playout
 * Create a new playout session
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name } = body;

    // Create new playout session
    const result = await query<PlayoutSession>(
      `INSERT INTO playout_sessions (user_id, session_name, is_active) 
       VALUES ($1, $2, true) 
       RETURNING *`,
      [session.user.id, name || "Untitled Playout"]
    );

    const newSession = result.rows[0];

    // Generate the full URL for OBS
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const playoutUrl = `${baseUrl}/playout/${newSession.id}`;

    return NextResponse.json(
      {
        success: true,
        message: "Playout session created",
        session: newSession,
        url: playoutUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create playout session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
