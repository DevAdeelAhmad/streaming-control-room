#!/usr/bin/env tsx

/**
 * Database Initialization Script
 * Run this script to set up the database for the first time
 * 
 * Usage:
 *   npm run db:init
 *   npm run db:reset (to reset the database)
 *   npm run db:health (to check database health)
 */

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

import { initDatabase, resetDatabase, checkDatabaseHealth } from '../lib/db/init';
import { closePool } from '../lib/db/connection';

const command = process.argv[2] || 'init';

async function main() {
  console.log('=================================');
  console.log('  Database Management Script');
  console.log('=================================');
  console.log('');

  try {
    switch (command) {
      case 'init':
        await initDatabase();
        break;

      case 'reset':
        console.log('⚠️  You are about to RESET the database!');
        console.log('   This will DELETE ALL DATA!');
        console.log('');
        
        // In a production script, you'd want to ask for confirmation
        // For now, we'll just proceed
        await resetDatabase();
        break;

      case 'health':
        console.log('🔍 Checking database health...');
        console.log('');
        const health = await checkDatabaseHealth();
        
        if (health.healthy) {
          console.log('✅ Database is healthy!');
          console.log(`📊 Tables found: ${health.tables.join(', ')}`);
        } else {
          console.log('❌ Database is not healthy!');
          console.log(`⚠️  ${health.message}`);
          if (health.tables.length > 0) {
            console.log(`   Existing tables: ${health.tables.join(', ')}`);
          }
        }
        break;

      default:
        console.log('❌ Unknown command:', command);
        console.log('');
        console.log('Available commands:');
        console.log('  init   - Initialize the database');
        console.log('  reset  - Reset the database (deletes all data)');
        console.log('  health - Check database health');
        process.exit(1);
    }

    console.log('');
    console.log('=================================');
    console.log('  Operation completed!');
    console.log('=================================');

  } catch (error) {
    console.error('');
    console.error('=================================');
    console.error('  ❌ Operation failed!');
    console.error('=================================');
    console.error(error);
    process.exit(1);
  } finally {
    // Close the database connection pool
    await closePool();
  }
}

// Run the script
main();


