import { NextResponse } from 'next/server';
import { checkDatabaseHealth } from '@/lib/db/init';

/**
 * Health check endpoint for the application
 * GET /api/health
 */
export async function GET() {
  try {
    const dbHealth = await checkDatabaseHealth();

    const response = {
      status: dbHealth.healthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      database: {
        connected: dbHealth.healthy,
        tables: dbHealth.tables,
        message: dbHealth.message,
      },
      uptime: process.uptime(),
      version: process.env.npm_package_version || '0.1.0',
    };

    return NextResponse.json(response, {
      status: dbHealth.healthy ? 200 : 503,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: error.message,
      },
      { status: 500 }
    );
  }
}


