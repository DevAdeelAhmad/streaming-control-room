/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFileSync } from 'fs';
import { join } from 'path';
import { query, testConnection, tableExists } from './connection';
import bcrypt from 'bcryptjs';

/**
 * Initialize the database with schema and default data
 */
export async function initDatabase(): Promise<void> {
  console.log('🔄 Starting database initialization...');

  // Test connection first
  const isConnected = await testConnection();
  if (!isConnected) {
    throw new Error('Cannot connect to database. Please check your configuration.');
  }

  // Check if tables already exist
  const usersTableExists = await tableExists('users');
  if (usersTableExists) {
    console.log('✅ Database tables already exist. Skipping initialization.');
    return;
  }

  try {
    // Read the schema file
    const schemaPath = join(process.cwd(), 'lib', 'db', 'schema.sql');
    let schemaSQL = readFileSync(schemaPath, 'utf-8');

    // Generate a proper password hash for the default admin user
    const defaultPassword = 'admin123';
    const passwordHash = await bcrypt.hash(defaultPassword, 10);

    // Replace the placeholder password hash with the real one
    schemaSQL = schemaSQL.replace(
      '$2a$10$YourHashedPasswordHere',
      passwordHash
    );

    // Execute the entire schema as one transaction
    console.log(`📝 Executing database schema...`);

    try {
      await query(schemaSQL);
      console.log(`  ✓ Schema executed successfully`);
    } catch (error: any) {
      // If the error is about something already existing, that's okay
      if (error.message.includes('already exists')) {
        console.log(`  ⚠ Some objects already exist (this is okay)`);
      } else {
        console.error(`  ✗ Schema execution failed:`, error.message);
        throw error;
      }
    }

    console.log('✅ Database initialized successfully!');
    console.log('');
    console.log('📋 Default Admin User Created:');
    console.log('   Email: admin@streaming.local');
    console.log('   Password: admin123');
    console.log('   ⚠️  Please change this password after first login!');
    console.log('');

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

/**
 * Reset the database (drops all tables and recreates them)
 * WARNING: This will delete all data!
 */
export async function resetDatabase(): Promise<void> {
  console.log('⚠️  WARNING: Resetting database will delete all data!');

  try {
    // Drop all tables in reverse order of dependencies
    const dropStatements = [
      'DROP TABLE IF EXISTS theme_assets CASCADE',
      'DROP TABLE IF EXISTS themes CASCADE',
      'DROP TABLE IF EXISTS assets CASCADE',
      'DROP TABLE IF EXISTS sessions CASCADE',
      'DROP TABLE IF EXISTS playout_sessions CASCADE',
      'DROP TABLE IF EXISTS users CASCADE',
      'DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE',
      'DROP FUNCTION IF EXISTS update_last_active_column() CASCADE',
    ];

    for (const statement of dropStatements) {
      await query(statement);
    }

    console.log('✅ All tables dropped successfully');

    // Now initialize the database fresh
    await initDatabase();

  } catch (error) {
    console.error('❌ Database reset failed:', error);
    throw error;
  }
}

/**
 * Check database health
 */
export async function checkDatabaseHealth(): Promise<{
  healthy: boolean;
  tables: string[];
  message: string;
}> {
  try {
    const isConnected = await testConnection();
    if (!isConnected) {
      return {
        healthy: false,
        tables: [],
        message: 'Cannot connect to database',
      };
    }

    // Check all required tables
    const requiredTables = [
      'users',
      'playout_sessions',
      'assets',
      'themes',
      'theme_assets',
      'sessions',
    ];

    const existingTables: string[] = [];
    for (const table of requiredTables) {
      const exists = await tableExists(table);
      if (exists) {
        existingTables.push(table);
      }
    }

    if (existingTables.length === requiredTables.length) {
      return {
        healthy: true,
        tables: existingTables,
        message: 'All database tables exist and are accessible',
      };
    } else {
      return {
        healthy: false,
        tables: existingTables,
        message: `Missing tables: ${requiredTables
          .filter(t => !existingTables.includes(t))
          .join(', ')}`,
      };
    }
  } catch (error: any) {
    return {
      healthy: false,
      tables: [],
      message: error.message,
    };
  }
}


