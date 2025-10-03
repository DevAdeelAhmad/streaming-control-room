# Phase 1: Database Setup - Completed ✅

## What Was Implemented

### 1. Database Schema (`lib/db/schema.sql`)
Complete PostgreSQL schema with the following tables:
- **users** - User authentication and profile data
- **playout_sessions** - Tracking unique playout window instances
- **assets** - Uploaded images and media files
- **themes** - Saved control panel configurations
- **theme_assets** - Junction table linking themes to assets
- **sessions** - NextAuth session management

**Features:**
- UUID primary keys for all tables
- Proper foreign key relationships with CASCADE deletes
- Indexes for optimized queries
- JSONB field for flexible theme configuration storage
- Triggers for auto-updating timestamps
- Default admin user (email: admin@streaming.local, password: admin123)

### 2. Database Connection Utilities (`lib/db/connection.ts`)
- Singleton connection pool pattern
- Query execution with automatic logging
- Transaction support
- Connection testing
- Table existence checking
- Error handling and connection pooling

### 3. Database Initialization (`lib/db/init.ts`)
- Initialize database with schema
- Reset database (drop and recreate)
- Health check functionality
- Automatic password hashing for default user
- Safe execution with error handling

### 4. Type Definitions (`types/database.ts`)
Complete TypeScript interfaces for:
- User, PlayoutSession, Asset, Theme
- ThemeConfiguration with text/image layers
- Layout settings
- API response types
- Query filter types

### 5. CLI Scripts (`scripts/init-db.ts`)
Command-line tool for database management:
- `npm run db:init` - Initialize database
- `npm run db:reset` - Reset database (WARNING: deletes all data)
- `npm run db:health` - Check database health

### 6. API Endpoints
- `GET /api/health` - Application and database health check

### 7. Environment Configuration
- `.env` - Database connection parameters
- `.env.example` - Template for environment variables

---

## Setup Instructions

### Prerequisites
1. PostgreSQL installed and running
2. Node.js and npm installed

### Step 1: Configure Database
Edit `.env` file with your PostgreSQL credentials:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=streaming_control_room
DB_USER=postgres
DB_PASSWORD=your_password
```

### Step 2: Create Database
Create a PostgreSQL database:
```bash
# Using psql
psql -U postgres
CREATE DATABASE streaming_control_room;
\q
```

Or use a GUI tool like pgAdmin or DBeaver.

### Step 3: Initialize Database
Run the initialization script:
```bash
npm run db:init
```

This will:
- Create all required tables
- Set up indexes and triggers
- Create a default admin user
- Display connection confirmation

### Step 4: Verify Installation
Check database health:
```bash
npm run db:health
```

Or start the dev server and visit:
```
http://localhost:3000/api/health
```

You should see a JSON response indicating all tables exist.

---

## Default Admin User

After initialization, you can log in with:
- **Email:** admin@streaming.local
- **Password:** admin123

⚠️ **IMPORTANT:** Change this password after first login in production!

---

## Database Management Commands

### Initialize Database
```bash
npm run db:init
```
Creates tables and default data. Safe to run multiple times (skips if tables exist).

### Reset Database
```bash
npm run db:reset
```
⚠️ **WARNING:** Deletes ALL data and recreates tables. Use only in development!

### Check Health
```bash
npm run db:health
```
Verifies database connection and checks if all required tables exist.

---

## Database Schema Overview

### Users Table
Stores user authentication and profile information.

### Playout Sessions Table
Tracks each unique playout window instance with a UUID. Each playout window will have its own unique URL using this ID.

### Assets Table
Stores metadata about uploaded images/media files. The actual files are stored in `public/uploads/`.

### Themes Table
Stores complete control panel configurations as JSONB:
- Text layers (content, position, styling)
- Image layers (position, dimensions, rotation)
- Layout settings (dimensions, background)

### Theme Assets Table
Links assets to themes with role information (logo, banner, overlay, etc.).

### Sessions Table
Used by NextAuth for session management.

---

## Next Steps

With Phase 1 complete, you can now proceed to:

**Phase 2: Authentication System**
- Implement NextAuth.js configuration
- Create login/register pages
- Set up protected routes
- User session management

---

## Troubleshooting

### Cannot connect to database
- Verify PostgreSQL is running: `pg_isready`
- Check credentials in `.env` file
- Ensure database exists: `psql -U postgres -l`

### Tables already exist error
This is normal if you've run `db:init` before. The script will skip initialization. To start fresh, use `npm run db:reset`.

### Permission denied
- Ensure your PostgreSQL user has CREATE privileges
- Check PostgreSQL pg_hba.conf for authentication settings

### Module not found errors
Run `npm install` to ensure all dependencies are installed.

---

## Database ER Diagram

```
┌─────────────┐
│    Users    │
└──────┬──────┘
       │
       ├──────────────┬──────────────┬──────────────┐
       │              │              │              │
┌──────▼──────┐ ┌─────▼─────┐ ┌─────▼──────┐ ┌────▼─────┐
│  Playout    │ │   Assets  │ │   Themes   │ │ Sessions │
│  Sessions   │ └─────┬─────┘ └─────┬──────┘ └──────────┘
└─────────────┘       │              │
                      │      ┌───────▼────────┐
                      └──────►  Theme_Assets  │
                             └────────────────┘
```

---

## Files Created

```
streaming-control-room/
├── lib/
│   └── db/
│       ├── schema.sql          # Database schema definition
│       ├── connection.ts       # Connection pool and query utilities
│       └── init.ts            # Initialization and health check
├── scripts/
│   └── init-db.ts             # CLI database management tool
├── types/
│   └── database.ts            # TypeScript type definitions
├── app/
│   └── api/
│       └── health/
│           └── route.ts       # Health check API endpoint
├── public/
│   └── uploads/
│       └── .gitkeep          # Placeholder for uploads directory
├── .env                       # Environment variables (not in git)
├── .env.example              # Environment variables template
└── PHASE1_SETUP.md           # This file
```

---

## Testing Checklist

- [x] Database connection successful
- [x] All tables created
- [x] Indexes created
- [x] Triggers working
- [x] Default admin user created
- [x] Health check API responds correctly
- [x] CLI scripts run without errors
- [x] TypeScript types defined
- [x] Environment variables configured

---

**Phase 1 Status:** ✅ Complete  
**Ready for Phase 2:** Yes  
**Last Updated:** October 3, 2025


