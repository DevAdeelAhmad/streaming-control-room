# Deployment Guide - Streaming Control Room

## 🚀 Production Deployment Guide

This guide covers deploying the Streaming Control Room to production environments.

---

## Deployment Options

### Option 1: Vercel (Recommended for Next.js)

**Pros:**
- ✅ Optimized for Next.js
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Zero-config deployment
- ✅ Git integration

**Cons:**
- ⚠️ Serverless (requires adaptation for Socket.IO)
- ⚠️ File uploads need external storage

### Option 2: Railway

**Pros:**
- ✅ Full Node.js support
- ✅ WebSocket support
- ✅ Database included
- ✅ Simple deployment

### Option 3: DigitalOcean App Platform

**Pros:**
- ✅ Full control
- ✅ Persistent storage
- ✅ Database hosting
- ✅ WebSocket support

### Option 4: Self-Hosted (VPS/Dedicated Server)

**Pros:**
- ✅ Complete control
- ✅ Best for local networks
- ✅ No vendor lock-in

---

## Pre-Deployment Checklist

### 1. Database Setup

✅ **Neon.tech PostgreSQL** (already configured)
- Your database is already set up and connected
- Connection string in `.env`

### 2. Environment Variables

Update your `.env` for production:

```bash
# Database (already configured)
DB_HOST=your-neon-host
DB_PORT=5432
DB_NAME=neondb
DB_USER=neondb_owner
DB_PASSWORD=your-password
DB_SSL=true

# Next.js Production URL
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-production-secret-min-32-chars

# WebSocket URL (production)
NEXT_PUBLIC_WS_URL=wss://your-domain.com

# Node Environment
NODE_ENV=production
```

### 3. Security

- [ ] Strong `NEXTAUTH_SECRET` (at least 32 characters)
- [ ] Secure database password
- [ ] HTTPS enabled
- [ ] CORS configured properly
- [ ] Rate limiting enabled (optional)

---

## Deployment: Vercel

### Step 1: Prepare for Vercel

Vercel has limitations with Socket.IO. We'll use a hybrid approach.

**Option A: External WebSocket Server**

Deploy Socket.IO server separately (Railway/Heroku) and connect from Vercel.

**Option B: Use Vercel's Edge Functions**

Replace Socket.IO with Pusher or Ably for real-time communication.

### Step 2: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 3: Configure Vercel

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "env": {
    "NEXTAUTH_URL": "https://your-domain.vercel.app",
    "NEXTAUTH_SECRET": "@nextauth-secret",
    "DB_HOST": "@db-host",
    "DB_PORT": "@db-port",
    "DB_NAME": "@db-name",
    "DB_USER": "@db-user",
    "DB_PASSWORD": "@db-password",
    "DB_SSL": "true"
  }
}
```

### Step 4: Deploy

```bash
vercel
```

Follow the prompts and add environment variables when requested.

---

## Deployment: Railway (Recommended for Full-Stack)

Railway supports everything out of the box, including WebSockets.

### Step 1: Create Railway Project

1. Go to [railway.app](https://railway.app)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"** or **"Empty Project"**

### Step 2: Connect Repository

1. Connect your GitHub account
2. Select your repository
3. Railway will auto-detect Next.js

### Step 3: Configure Environment Variables

In Railway dashboard, add all variables from `.env`:

```
NEXTAUTH_URL=https://your-app.railway.app
NEXTAUTH_SECRET=your-secret-here
DB_HOST=your-neon-host
DB_PORT=5432
DB_NAME=neondb
DB_USER=neondb_owner
DB_PASSWORD=your-password
DB_SSL=true
NODE_ENV=production
```

### Step 4: Configure Build

Railway auto-detects Next.js. Ensure `package.json` has:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### Step 5: Deploy

Railway will automatically build and deploy when you push to GitHub.

**Custom Domain:**
1. Go to **Settings → Domains**
2. Add your custom domain
3. Update DNS records

---

## Deployment: DigitalOcean

### Step 1: Create Droplet

1. Create a new Droplet (Ubuntu 22.04 LTS)
2. Size: At least 2GB RAM, 1 vCPU
3. Add SSH keys

### Step 2: Initial Server Setup

```bash
# SSH into server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PM2 (process manager)
npm install -g pm2

# Install Nginx
apt install -y nginx

# Install certbot for SSL
apt install -y certbot python3-certbot-nginx
```

### Step 3: Clone and Setup Project

```bash
# Create app directory
mkdir -p /var/www/streaming-control-room
cd /var/www/streaming-control-room

# Clone repository
git clone https://github.com/your-username/streaming-control-room.git .

# Install dependencies
npm install

# Create .env file
nano .env
# (Paste your production environment variables)

# Build the project
npm run build
```

### Step 4: Configure PM2

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'streaming-control-room',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/streaming-control-room',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

Start the application:

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Step 5: Configure Nginx

Create `/etc/nginx/sites-available/streaming-control-room`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # WebSocket support
    location /socket.io/ {
        proxy_pass http://localhost:3000/socket.io/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
    }

    # Static files
    location /_next/static {
        alias /var/www/streaming-control-room/.next/static;
        expires 365d;
        access_log off;
    }

    # Uploaded assets
    location /uploads {
        alias /var/www/streaming-control-room/public/uploads;
        expires 7d;
    }
}
```

Enable the site:

```bash
ln -s /etc/nginx/sites-available/streaming-control-room /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Step 6: SSL Certificate

```bash
certbot --nginx -d your-domain.com -d www.your-domain.com
```

Follow the prompts to configure HTTPS.

---

## Post-Deployment Configuration

### 1. Update NEXTAUTH_URL

Ensure `.env` has your production URL:

```bash
NEXTAUTH_URL=https://your-domain.com
```

### 2. Database Initialization

If deploying for the first time:

```bash
npm run db:init
```

### 3. Test Database Connection

```bash
npm run db:health
```

### 4. Create Admin User

The database initialization already creates a default admin user:
- **Email:** `admin@example.com`
- **Password:** `admin123`

**⚠️ IMPORTANT:** Change this password immediately after first login!

---

## File Storage for Production

### Option 1: Local Storage (Current Setup)

Files are stored in `public/uploads/`. This works for single-server deployments.

**Backup Strategy:**
```bash
# Create daily backups
crontab -e

# Add this line:
0 2 * * * tar -czf /backups/uploads-$(date +\%Y\%m\%d).tar.gz /var/www/streaming-control-room/public/uploads/
```

### Option 2: Cloud Storage (Recommended for Scale)

For multi-server or serverless deployments, use:
- **AWS S3**
- **Cloudflare R2**
- **DigitalOcean Spaces**
- **Vercel Blob**

---

## Monitoring & Maintenance

### PM2 Monitoring

```bash
# View logs
pm2 logs streaming-control-room

# Monitor resources
pm2 monit

# Restart application
pm2 restart streaming-control-room
```

### Nginx Logs

```bash
# Access logs
tail -f /var/log/nginx/access.log

# Error logs
tail -f /var/log/nginx/error.log
```

### Database Backups

```bash
# Create backup script
nano /root/backup-db.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/backups/db"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# PostgreSQL backup (from Neon)
pg_dump "postgresql://neondb_owner:password@host/neondb" > $BACKUP_DIR/backup_$DATE.sql

# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete

echo "Backup completed: $DATE"
```

```bash
chmod +x /root/backup-db.sh

# Add to crontab (daily at 3 AM)
crontab -e
0 3 * * * /root/backup-db.sh
```

---

## Performance Optimization

### 1. Next.js Production Build

Ensure optimized build:

```bash
npm run build
```

### 2. Enable Compression

In `next.config.ts`:

```typescript
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  // ... other config
};
```

### 3. Image Optimization

Images are automatically optimized by Next.js. Ensure proper configuration:

```typescript
const nextConfig = {
  images: {
    domains: ['your-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
};
```

### 4. CDN for Static Assets

Use a CDN for:
- `/uploads/*` - Uploaded images
- `/_next/static/*` - Next.js static files

**Cloudflare Setup:**
1. Add your domain to Cloudflare
2. Enable caching for static assets
3. Configure page rules

---

## Scaling Considerations

### Horizontal Scaling

For multiple servers:
1. **Database:** Already cloud-hosted (Neon)
2. **File Storage:** Use S3/R2/Spaces
3. **WebSockets:** Use Redis adapter for Socket.IO
4. **Session Storage:** Use Redis for NextAuth sessions
5. **Load Balancer:** Nginx or cloud load balancer

### Vertical Scaling

If single server is sufficient:
- Upgrade Droplet/VPS to more RAM/CPU
- Enable HTTP/2 in Nginx
- Use PM2 clustering

---

## Security Best Practices

### 1. Firewall

```bash
# Ubuntu UFW
ufw allow ssh
ufw allow http
ufw allow https
ufw enable
```

### 2. Fail2Ban

```bash
apt install fail2ban
systemctl enable fail2ban
```

### 3. Regular Updates

```bash
# Auto-updates
apt install unattended-upgrades
dpkg-reconfigure unattended-upgrades
```

### 4. Rate Limiting

Add to Nginx config:

```nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

location /api/ {
    limit_req zone=api burst=20 nodelay;
    # ... rest of config
}
```

---

## Troubleshooting

### Issue: 502 Bad Gateway

**Cause:** Application not running

**Solution:**
```bash
pm2 restart streaming-control-room
pm2 logs
```

### Issue: Database Connection Failed

**Cause:** Firewall or incorrect credentials

**Solution:**
1. Check `.env` variables
2. Test connection: `npm run db:health`
3. Verify Neon.tech IP whitelist (if configured)

### Issue: WebSocket Not Connecting

**Cause:** Nginx not proxying WebSocket correctly

**Solution:**
Ensure Nginx has WebSocket configuration (see Nginx section above).

### Issue: File Uploads Failing

**Cause:** Permission issues

**Solution:**
```bash
chown -R www-data:www-data /var/www/streaming-control-room/public/uploads
chmod -R 755 /var/www/streaming-control-room/public/uploads
```

---

## Cost Estimates

### Neon.tech (Database)
- **Free Tier:** Up to 500 MB storage
- **Pro:** $19/month for 1 GB

### Railway
- **Free Tier:** $5 credit/month
- **Starter:** $5-20/month depending on usage

### DigitalOcean
- **Droplet:** $6/month (1GB RAM) to $24/month (4GB RAM)
- **Spaces (Storage):** $5/month (250GB)

### Vercel
- **Hobby:** Free (personal projects)
- **Pro:** $20/month (commercial)

---

## Conclusion

You now have multiple deployment options for the Streaming Control Room. Choose the one that best fits your:

- **Budget**
- **Technical expertise**
- **Scaling requirements**
- **Network setup** (local vs cloud)

**Recommended Paths:**
- **Quick & Easy:** Railway
- **Maximum Control:** DigitalOcean VPS
- **Serverless:** Vercel + External WebSocket

---

**Last Updated:** October 3, 2025  
**Version:** 1.0

