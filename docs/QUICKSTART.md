# Quick Start Guide - Streaming Control Room

## Phase 1 Complete! 🎉

The database infrastructure is now ready. Here's what you need to do next:

## Prerequisites Setup

### 1. Install PostgreSQL
If you don't have PostgreSQL installed:

**macOS:**
```bash
brew install postgresql@16
brew services start postgresql@16
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
Download from https://www.postgresql.org/download/windows/

### 2. Create Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE streaming_control_room;

# Exit psql
\q
```

### 3. Configure Environment
Your `.env` file is already configured with default settings:
- Database: `streaming_control_room`
- User: `postgres`
- Password: `postgres`

**Update the password in `.env` to match your PostgreSQL password!**

## Initialize Database

Run this command to set up all tables:
```bash
npm run db:init
```

You should see:
```
✅ Database initialized successfully!

📋 Default Admin User Created:
   Email: admin@streaming.local
   Password: admin123
```

## Verify Setup

### Option 1: CLI Health Check
```bash
npm run db:health
```

### Option 2: Start Dev Server
```bash
npm run dev
```

Then visit: http://localhost:3000/api/health

You should see a JSON response showing all tables are present.

## What's Been Built

### Database Tables
- ✅ **users** - User authentication
- ✅ **playout_sessions** - Unique playout window tracking
- ✅ **assets** - Image/media uploads
- ✅ **themes** - Saved configurations
- ✅ **theme_assets** - Theme-to-asset relationships
- ✅ **sessions** - NextAuth sessions

### Utilities
- ✅ Database connection pool
- ✅ Query utilities with transactions
- ✅ Health check system
- ✅ CLI management tools

### Type Safety
- ✅ Complete TypeScript definitions for all database models
- ✅ API response types
- ✅ Theme configuration types

## File Structure

```
streaming-control-room/
├── lib/db/              # Database utilities
│   ├── schema.sql       # PostgreSQL schema
│   ├── connection.ts    # Connection pool
│   └── init.ts         # Initialization scripts
├── scripts/
│   └── init-db.ts      # CLI database tool
├── types/
│   └── database.ts     # TypeScript types
├── app/api/health/     # Health check endpoint
└── public/uploads/     # File upload directory
```

## Next Steps

With Phase 1 complete, we're ready for:

### Phase 2: Authentication System
- NextAuth.js setup
- Login/Register pages
- Protected routes
- Session management

## Troubleshooting

### Database Connection Error?
```bash
# Check if PostgreSQL is running
pg_isready

# If not running, start it
# macOS:
brew services start postgresql@16

# Linux:
sudo systemctl start postgresql
```

### Can't connect with provided credentials?
Update your `.env` file with correct credentials:
```env
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
```

### Need to reset database?
```bash
npm run db:reset
```
⚠️ This deletes all data!

## Test Commands

```bash
# Initialize database
npm run db:init

# Check health
npm run db:health

# Reset database (careful!)
npm run db:reset

# Start development server
npm run dev
```

## Documentation

- Full setup details: See `PHASE1_SETUP.md`
- Development plan: See `DEVELOPMENT_PLAN.md`

---

**Status:** ✅ Phase 1 Complete  
**Ready for:** Phase 2 - Authentication System  
**Last Updated:** October 3, 2025


