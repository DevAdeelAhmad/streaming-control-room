# Streaming Control Room

**Real-Time Graphics Control for OBS Studio**

A professional web application that enables streamers to control graphics, overlays, and text in OBS Studio in real-time. Update your stream graphics without touching OBS!

![Streaming Control Room](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Cloud-blue.svg)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--time-green.svg)

---

## 🚀 Features

### ✨ Core Functionality
- **Real-Time Control** - Update graphics instantly during streams
- **1920x1080 Playout Windows** - Professional broadcast-quality displays
- **OBS Integration** - Seamless browser source integration
- **Multi-User Support** - Multiple operators can control simultaneously
- **Theme System** - Save and load graphic configurations
- **Asset Management** - Upload and manage images

### 🎨 Graphics Control
- **Text Layers** - Full typography control (fonts, colors, shadows, strokes)
- **Image Layers** - Position, scale, opacity, and layering
- **Layout Settings** - Background colors and images
- **Live Preview** - See changes instantly before applying

### 🎬 OBS Features
- **Transparent Backgrounds** - Perfect for overlays
- **Multiple Playout Windows** - Different graphics for different scenes
- **Connection Status** - Real-time sync indicators
- **Hardware Acceleration** - Optimized for streaming performance

---

## 📋 Quick Start

### 1. Clone and Setup

```bash
git clone <repository-url>
cd streaming-control-room
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

Edit `.env` with your database credentials (Neon.tech PostgreSQL recommended):

```bash
# Database (Neon.tech PostgreSQL)
DB_HOST=your-neon-host
DB_PORT=5432
DB_NAME=neondb
DB_USER=neondb_owner
DB_PASSWORD=your-password
DB_SSL=true

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
```

### 3. Initialize Database

```bash
# Initialize the database with schema
npm run db:init

# Verify connection
npm run db:health
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and create your account!

---

## 🏗 Architecture

### Tech Stack
- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Node.js
- **Database:** PostgreSQL (hosted on Neon.tech)
- **Real-Time:** Socket.IO
- **Authentication:** NextAuth.js with bcryptjs
- **File Storage:** Local file system with upload validation

### Project Structure
```
streaming-control-room/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   ├── dashboard/         # Protected dashboard pages
│   ├── login/             # Authentication
│   ├── playout/           # OBS display windows
│   └── register/          # User registration
├── components/            # React components
│   ├── ControlPanel/      # Real-time editing UI
│   ├── Assets/           # File management
│   ├── Themes/           # Configuration management
│   └── Auth/             # Authentication forms
├── lib/                  # Utilities and configurations
│   ├── auth/             # NextAuth setup
│   ├── db/               # Database connections
│   └── socket/           # WebSocket server
├── types/                # TypeScript definitions
├── docs/                 # Documentation
└── public/               # Static assets
```

---

## 📚 Documentation

### 📖 User Guide
Start here for complete usage instructions:
- **[Complete User Guide](docs/USER_GUIDE.md)** - 3,500+ lines of comprehensive documentation

### 🛠 Developer Documentation
- **[OBS Integration Guide](docs/OBS_INTEGRATION_GUIDE.md)** - Step-by-step OBS setup
- **[Deployment Guide](docs/DEPLOYMENT_GUIDE.md)** - Production deployment options
- **[Production Checklist](docs/PRODUCTION_CHECKLIST.md)** - Pre-deployment verification
- **[Development Plan](docs/DEVELOPMENT_PLAN.md)** - 8-phase development roadmap

### 🔧 Quick References
- **[Control Panel Guide](docs/CONTROL_PANEL_GUIDE.md)** - Using the real-time editor
- **[Quick Start](docs/QUICKSTART.md)** - 5-minute setup guide

---

## 🚀 Available Commands

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run linter

# Database Management
npm run db:init          # Initialize database with schema
npm run db:health        # Check database connection
npm run db:reset         # Reset database (⚠️ deletes all data!)

# Code Quality
npm run lint             # Check code quality
```

---

## 🎬 How It Works

### 1. Create Playout Windows
- Design 1920x1080 graphics in your browser
- Add text layers with full typography control
- Add image layers with positioning and effects
- Set background colors or images

### 2. Add to OBS Studio
- Copy the OBS URL from the dashboard
- Add as a Browser Source in OBS
- Set resolution to 1920x1080
- Graphics appear instantly in your stream

### 3. Control in Real-Time
- Keep the control panel open in a second browser tab
- Edit text, move images, change colors
- Changes appear instantly in OBS
- No need to switch between applications

### 4. Save and Reuse
- Save configurations as "Themes"
- Load themes instantly during streams
- Upload images to your asset library
- Reuse graphics across multiple streams

---

## 🌐 Deployment Options

### Quick Deploy (Recommended)
**Railway** - Full Node.js support with WebSocket
```bash
# Push to GitHub, connect Railway
# Auto-deploys with database included
```

### Serverless
**Vercel** - Best for Next.js (requires WebSocket adaptation)
```bash
npm install -g vercel
vercel
```

### Self-Hosted
**DigitalOcean VPS** - Complete control
```bash
# Follow docs/DEPLOYMENT_GUIDE.md
```

See **[Deployment Guide](docs/DEPLOYMENT_GUIDE.md)** for detailed instructions.

---

## 🔐 Security Features

- ✅ Secure password hashing (bcryptjs)
- ✅ JWT-based session management
- ✅ Protected API routes
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ File upload validation
- ✅ SSL database connections

---

## 🎯 Use Cases

### Live Streaming
- **Lower Thirds** - Names, titles, social media
- **Scoreboards** - Sports, games, competitions
- **Alerts** - Donations, follows, subscribers
- **Overlays** - Logos, watermarks, corners

### Broadcast Production
- **News Graphics** - Headlines, tickers, weather
- **Event Streaming** - Conferences, ceremonies
- **Corporate** - Company branding, presentations
- **Gaming** - Tournament brackets, player stats

---

## 📊 Performance

- **Real-Time Latency:** <100ms updates
- **Build Time:** ~30-45 seconds
- **Bundle Size:** Optimized with SWC minification
- **OBS CPU Usage:** 5-10% for single playout
- **Concurrent Users:** Multiple operators supported

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

---

## 📄 License

This project is private and proprietary. All rights reserved.

---

## 🆘 Support

### Getting Help
1. Check the **[User Guide](docs/USER_GUIDE.md)**
2. Review **[OBS Integration Guide](docs/OBS_INTEGRATION_GUIDE.md)**
3. Check the troubleshooting sections
4. Contact your system administrator

### Common Issues
- **Can't connect to OBS?** Check the URL and firewall settings
- **Updates not appearing?** Verify WebSocket connection (● Live indicator)
- **Images not loading?** Check file format and size limits
- **Database errors?** Run `npm run db:health`

---

## 🎉 Quick Demo

1. **Start the app:** `npm run dev`
2. **Create account:** Sign up at http://localhost:3000
3. **Create playout:** Dashboard → Playout Windows → New Playout
4. **Add to OBS:** Copy OBS URL → OBS Browser Source → 1920x1080
5. **Control graphics:** Control Panel → Edit text/images → See instant updates!

---

**🎬 Ready to revolutionize your streaming graphics? Start here!**

For questions or issues, refer to the documentation in the `docs/` folder or contact support.

---

**Version:** 1.0.0 | **Built with:** Next.js 15, React 19, TypeScript | **Database:** PostgreSQL
