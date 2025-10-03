# OBS Integration Guide - Streaming Control Room

## 📺 Complete Setup Guide for OBS Studio

This guide walks you through integrating your Playout Windows into OBS Studio for professional live streaming.

---

## Prerequisites

- **OBS Studio** installed (v28.0 or higher recommended)
- **Streaming Control Room** running (development or production)
- Active playout session created in the dashboard

---

## Quick Start

### Step 1: Get Your Playout URL

1. Navigate to **Dashboard → Playout Windows**
2. Click **"📋 Copy URL"** for your playout session
3. Your URL will look like: `http://localhost:3000/playout/abc123`

### Step 2: Add to OBS

1. Open **OBS Studio**
2. Click **"+"** in the Sources panel
3. Select **"Browser"** source
4. Configure the browser source (see below)

---

## OBS Browser Source Configuration

### Basic Configuration

| Setting | Value | Description |
|---------|-------|-------------|
| **URL** | `http://localhost:3000/playout/[id]?obs=true` | Your playout URL with OBS parameter |
| **Width** | `1920` | Fixed playout width |
| **Height** | `1080` | Fixed playout height |
| **FPS** | `60` | Frame rate (30-60 recommended) |
| **Use custom frame rate** | ✅ Checked | Enable custom FPS |
| **Shutdown source when not visible** | ❌ Unchecked | Keep connection alive |
| **Refresh browser when scene becomes active** | ❌ Unchecked | Prevents reconnection |

### Transparent Background (Recommended)

For transparent backgrounds (no black/colored background), add the `transparent` parameter:

```
http://localhost:3000/playout/[id]?obs=true&transparent=true
```

**Additional Settings for Transparency:**
- ☑️ Check **"Control audio via OBS"**
- ☑️ Check **"Shutdown source when not visible"** only if you need to save resources

---

## URL Parameters Reference

Customize your playout window behavior with URL parameters:

| Parameter | Values | Description | Example |
|-----------|--------|-------------|---------|
| `obs` | `true`/`false` | Enables OBS mode (hides dev indicators) | `?obs=true` |
| `transparent` | `true`/`false` | Makes background transparent | `?transparent=true` |

**Combined Example:**
```
http://localhost:3000/playout/session123?obs=true&transparent=true
```

---

## Performance Optimization

### OBS Settings

**Video Settings** (`Settings → Video`):
- **Base Canvas Resolution:** 1920x1080
- **Output Resolution:** 1920x1080 (or your streaming resolution)
- **FPS:** 60 or 30

**Advanced Settings** (`Settings → Advanced`):
- **Process Priority:** High
- **Renderer:** Direct3D 11 (Windows) or OpenGL (Mac)

### Browser Source Advanced Settings

Click **"Advanced"** in the Browser Source properties:

| Setting | Recommended Value |
|---------|-------------------|
| **Hardware Acceleration** | ✅ Enabled |
| **Custom CSS** | See below |

**Optional Custom CSS for Fine-tuning:**
```css
body {
  overflow: hidden !important;
  margin: 0 !important;
  padding: 0 !important;
}
```

---

## Production Deployment

### Production URL Format

When deployed to production, your URLs will look like:
```
https://your-domain.com/playout/[id]?obs=true
```

### SSL/HTTPS Considerations

- OBS Browser Source works best with HTTPS in production
- Local development (`localhost`) works with HTTP
- Ensure WebSocket connections use WSS in production

### Environment Variables for Production

Update your `.env` file:
```bash
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-production-secret
NEXT_PUBLIC_WS_URL=wss://your-domain.com
```

---

## Multiple Playout Windows

You can add multiple playout windows to a single OBS scene:

1. Create multiple playout sessions in the dashboard
2. Add each as a separate **Browser** source in OBS
3. Position and layer them as needed
4. Each maintains independent real-time control

**Tips:**
- Use descriptive names: "Playout - Lower Third", "Playout - Scoreboard"
- Group related sources together
- Use Scene Collections for different show formats

---

## Real-Time Control Workflow

### Typical Workflow

1. **Setup Phase** (Before Stream):
   - Open OBS and add browser sources
   - Open Control Panel in your web browser
   - Test each playout window
   - Verify real-time sync

2. **Live Streaming**:
   - OBS displays the playout windows
   - Control Panel allows real-time updates
   - Changes appear instantly in OBS
   - No need to switch to OBS for content updates

3. **Multi-Operator Setup**:
   - Graphics operator: Controls text/image layers
   - Stream operator: Manages OBS scenes
   - Both work simultaneously without conflicts

---

## Troubleshooting

### Issue: Playout Window Not Loading

**Symptoms:** Black screen or "Loading..." message in OBS

**Solutions:**
1. Verify the playout session exists in the dashboard
2. Check that your server is running (`npm run dev`)
3. Test the URL in a regular browser first
4. Check OBS logs: `Help → Log Files → View Current Log`

### Issue: Updates Not Appearing in Real-Time

**Symptoms:** Changes in Control Panel don't show in OBS

**Solutions:**
1. Check WebSocket connection status (green indicator)
2. Refresh the browser source: Right-click → Refresh
3. Verify firewall isn't blocking WebSocket connections
4. Check console for errors in Control Panel (F12)

### Issue: Performance/Lag Issues

**Symptoms:** Stuttering, low FPS, delayed updates

**Solutions:**
1. **Reduce FPS:** Set Browser Source FPS to 30 instead of 60
2. **Hardware Acceleration:** Ensure it's enabled in OBS
3. **Close Other Apps:** Free up system resources
4. **Lower Image Resolution:** Use optimized/compressed images
5. **Disable Transparency:** If not needed, use solid background

### Issue: Transparent Background Not Working

**Symptoms:** Black background instead of transparency

**Solutions:**
1. Ensure URL includes `?transparent=true`
2. Check that no background color is set in Layout settings
3. Remove any background images from the configuration
4. Try toggling "Shutdown source when not visible" in OBS

### Issue: WebSocket Connection Fails

**Symptoms:** "Disconnected" status in Control Panel or Playout

**Solutions:**
1. **Check Server:** Ensure `npm run dev` is running
2. **Port Conflicts:** Verify port 3000 is available
3. **Firewall:** Allow port 3000 through firewall
4. **Production:** Ensure WSS (WebSocket Secure) is configured

---

## Testing Checklist

Before going live, test the following:

### Pre-Stream Checklist

- [ ] Playout window loads in OBS without errors
- [ ] Resolution is exactly 1920x1080
- [ ] Text layers appear correctly
- [ ] Image layers display properly
- [ ] Transparency works (if enabled)
- [ ] No console errors in Control Panel
- [ ] WebSocket shows "● Live" (green)
- [ ] Real-time updates work:
  - [ ] Text content changes
  - [ ] Text color changes
  - [ ] Image changes
  - [ ] Position changes
- [ ] Multiple concurrent users can control (if needed)
- [ ] Performance is smooth (60 FPS or 30 FPS)

### During Stream

- [ ] Monitor WebSocket connection status
- [ ] Test failover: What happens if connection drops?
- [ ] Verify changes apply instantly
- [ ] Check CPU/GPU usage in OBS Stats

---

## Advanced Tips & Tricks

### 1. Chroma Key Backgrounds

Instead of transparency, use a chroma key color:

```
Layout Settings → Background Color: #00FF00 (green)
```

Then apply a **Chroma Key** filter in OBS for better keying control.

### 2. Smooth Transitions

Use OBS **Stinger Transitions** or **Move Transition** plugin to animate playout window changes.

### 3. Hotkeys for Scenes

Set up OBS hotkeys to switch between scenes with different playout configurations:
- `F1` - Scene with Lower Third
- `F2` - Scene with Scoreboard  
- `F3` - Scene with Full Overlay

### 4. Pre-Loading Themes

Save commonly used layouts as **Themes** in the dashboard:
- Lower Third Template
- Scoreboard Template
- Breaking News Template

Load them instantly during live streams!

### 5. Backup Playout

Create a duplicate playout session as a backup:
1. Add it as a second browser source in OBS
2. Keep it hidden
3. If primary fails, switch to backup instantly

---

## Network Considerations

### Local Network Setup

- **Server:** Run on a powerful PC/Mac
- **Control:** Access control panel from any device on the network
- **OBS:** Add browser source using server's IP address

**Example URL for network access:**
```
http://192.168.1.100:3000/playout/[id]?obs=true
```

### Cloud Deployment

For remote operators or distributed teams, deploy to a cloud service:
- **Vercel** (recommended for Next.js)
- **Railway**
- **DigitalOcean**
- **AWS/Azure**

Then access from anywhere with HTTPS URLs.

---

## Performance Benchmarks

### Recommended System Requirements

**For OBS Computer:**
- **CPU:** Intel i5/AMD Ryzen 5 or better
- **RAM:** 8GB minimum, 16GB recommended
- **GPU:** Dedicated GPU recommended (NVIDIA/AMD)
- **Internet:** 10 Mbps upload for streaming

**For Server (if separate):**
- **CPU:** Intel i3/AMD Ryzen 3 or better
- **RAM:** 4GB minimum
- **Network:** Gigabit Ethernet (local) or good internet (cloud)

### Expected Performance

| Configuration | FPS | CPU Usage | Notes |
|---------------|-----|-----------|-------|
| Single playout, 1080p60 | 60 | 5-10% | Ideal |
| Single playout, 1080p30 | 30 | 3-5% | Low CPU |
| Multiple playouts (3+) | 30-60 | 15-25% | May need GPU |
| With Rive animation | 60 | 10-20% | Depends on complexity |

---

## Support & Resources

### Official Documentation
- **OBS Studio:** https://obsproject.com/wiki/
- **Browser Source:** https://obsproject.com/wiki/Sources-Guide#browser-source
- **Next.js:** https://nextjs.org/docs

### Community
- OBS Forums: https://obsproject.com/forum/
- OBS Discord: https://obsproject.com/discord

### Streaming Control Room
- Dashboard: http://localhost:3000/dashboard
- Playout Management: http://localhost:3000/dashboard/playout
- Themes: http://localhost:3000/dashboard/themes
- Assets: http://localhost:3000/dashboard/assets

---

## Examples & Use Cases

### Use Case 1: Live Sports Stream

**Setup:**
- **Playout 1:** Live scoreboard (top-right corner)
- **Playout 2:** Player stats overlay (lower-third)
- **Control:** Update scores and stats in real-time

**OBS Layout:**
```
├── Scene: Game Camera
│   ├── Camera Feed
│   ├── Browser Source: Scoreboard (playout/sports-score)
│   └── Browser Source: Player Stats (playout/player-info)
```

### Use Case 2: News Broadcast

**Setup:**
- **Playout 1:** Breaking news ticker
- **Playout 2:** Anchor name/title (lower-third)
- **Playout 3:** Weather/time widget

**Control Panel:**
- Graphics operator updates headlines
- Producer changes anchor names
- Weather updates automatically

### Use Case 3: Podcast/Talk Show

**Setup:**
- **Playout 1:** Guest name cards
- **Playout 2:** Topic overlay
- **Playout 3:** Social media handles

**Workflow:**
- Pre-save themes for each guest
- Load themes with one click during show
- Update social handles on the fly

---

## Conclusion

With this setup, you have a powerful, flexible streaming graphics system that:

✅ Updates in real-time  
✅ Requires no OBS interaction during streams  
✅ Supports multiple operators  
✅ Scales from local to cloud deployment  
✅ Provides professional-quality graphics  

**Happy Streaming!** 🎥🚀

---

**Last Updated:** October 3, 2025  
**Version:** 1.0  
**Compatible with:** OBS Studio 28.0+, Next.js 15

