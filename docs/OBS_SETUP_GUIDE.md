# OBS Setup Guide - Streaming Control Room

## Quick Start: Adding Playout Window to OBS

### Step 1: Create a Playout Window

1. Log in to the dashboard at http://localhost:3000
2. Click on **"Playout Windows"** card
3. Click **"+ New Playout"** button
4. Enter a name (e.g., "Main Stream Display")
5. Click **"Create"**

### Step 2: Copy the URL

You'll see a URL like:
```
http://localhost:3000/playout/a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

Click the **"Copy URL"** button.

### Step 3: Add to OBS

1. Open **OBS Studio**
2. In your Scene, click **"+"** to add a source
3. Select **"Browser"**
4. Give it a name (e.g., "Control Room Display")
5. Click **OK**

### Step 4: Configure Browser Source

In the Browser Source properties:

**Required Settings:**
- **URL**: Paste your copied playout URL
- **Width**: `1920`
- **Height**: `1080`

**Recommended Settings:**
- ✅ **Shutdown source when not visible**
- ✅ **Refresh browser when scene becomes active**
- **FPS**: `30` (or `60` for smoother animations)
- **Custom CSS**: (leave blank)

Click **OK** to save.

---

## Testing Your Setup

### Test 1: Preview in Browser

Before adding to OBS, test in your browser:

1. Click **"Open"** button in the playout management page
2. You should see:
   - Black 1920x1080 canvas
   - Green "● Live" indicator (top right)
   - Playout ID (bottom left)

### Test 2: OBS Preview

1. In OBS, select your scene with the Browser source
2. You should see the same black canvas in OBS preview
3. Connection indicator should show "● Live"

### Test 3: Real-Time Updates (Coming in Phase 4)

Once the Control Panel is built, changes will appear instantly in OBS!

---

## Recommended OBS Settings

### Performance Optimization

**For Standard Streams:**
```
Width: 1920
Height: 1080
FPS: 30
```

**For High-Performance Streams:**
```
Width: 1920
Height: 1080
FPS: 60
```

### Browser Source Properties

✅ **Always Enable:**
- Shutdown source when not visible
- Refresh browser when scene becomes active

❌ **Keep Disabled:**
- Control audio via OBS (unless you want audio from animations)
- Use custom frame rate (use default)

---

## Multiple Playout Windows

You can create multiple playout windows for different purposes:

**Example Setup:**
1. **Main Overlay** - Logo, name, social media
2. **Lower Third** - Player names, scores
3. **Starting Soon** - Pre-stream display
4. **Be Right Back** - Break screen

Each playout has its own:
- Unique URL
- Independent configuration
- Separate real-time control

---

## Layering in OBS

### Recommended Layer Order (Top to Bottom)

1. **Alerts / Notifications** (OBS alerts plugin)
2. **Playout Windows** (Control Room overlays)
3. **Webcam** (Your camera)
4. **Game Capture / Screen Capture** (Main content)
5. **Background** (Scene background)

### Transparency

Playout windows support transparent backgrounds:
- Black background: Use for testing
- Transparent background: Coming in Phase 4 (via Control Panel)

---

## Troubleshooting

### "Failed to load URL" in OBS

**Solution:**
1. Verify dev server is running: `npm run dev`
2. Test URL in regular browser first
3. Check firewall isn't blocking localhost
4. Try using `127.0.0.1:3000` instead of `localhost:3000`

### Black screen in OBS

**Possible Causes:**
1. Source is hidden (check eye icon in OBS)
2. Source is behind other elements (check layer order)
3. Wrong dimensions (verify 1920x1080)

**Solution:**
- Right-click source → Transform → Fit to screen
- Verify source is visible (eye icon)
- Move source to top layer temporarily

### Playout not updating

**Check:**
1. WebSocket connected (green indicator)
2. Browser console for errors
3. Network tab shows WebSocket connection

**Solution:**
- Refresh browser source in OBS
- Check dev server logs
- Recreate playout session if needed

### Performance issues

**If OBS lags:**
1. Enable "Shutdown when not visible"
2. Lower FPS from 60 to 30
3. Reduce number of active playout windows
4. Close unused browser sources

---

## Production Deployment

### When deploying to production:

1. **Update NEXTAUTH_URL** in `.env`:
   ```
   NEXTAUTH_URL=https://your-domain.com
   ```

2. **Update playout URLs** in OBS:
   ```
   https://your-domain.com/playout/[id]
   ```

3. **Use HTTPS** for:
   - Secure WebSocket connections
   - Better browser compatibility
   - Production-ready setup

---

## Advanced Tips

### Hotkey Switching

Create multiple scenes in OBS, each with different playout windows:
- Press hotkey to switch between scenes
- Each scene shows different overlay configuration

### Scene Collections

Save different setups for different stream types:
- Gaming stream collection
- Podcast collection
- Event stream collection

### Browser Source Settings

For best quality:
```
Width: 1920
Height: 1080
FPS: 60
Hardware acceleration: Enable
```

For performance:
```
Width: 1920
Height: 1080
FPS: 30
Hardware acceleration: Enable
Shutdown when not visible: Yes
```

---

## What's Coming Next

### Phase 4: Control Panel Interface

You'll be able to control your playout windows in real-time:
- ✏️ Edit text (position, font, color, size)
- 🖼️ Add/remove images
- 🎨 Apply themes instantly
- 👁️ Live preview
- 💾 Save configurations

All changes will appear **instantly** in OBS!

---

## Support

### Common Questions

**Q: Can I use multiple playout windows at once?**  
A: Yes! Create multiple playouts and add them as separate Browser sources in OBS.

**Q: Will this work with Streamlabs OBS?**  
A: Yes! The setup is identical - just add a Browser source with your playout URL.

**Q: Can I use this on a different computer?**  
A: Yes, but you'll need to use your local IP or deploy to a server. Replace `localhost` with your computer's IP address.

**Q: Does this work offline?**  
A: The playout requires connection to your server (localhost or deployed). No internet required for localhost.

---

## Next Steps

1. ✅ Create your first playout window
2. ✅ Add to OBS and test
3. ⏳ Wait for Phase 4 to customize your overlays!

---

**For detailed documentation, see:**
- [PHASE3_COMPLETE.md](./PHASE3_COMPLETE.md) - Technical details
- [CURRENT_STATUS.md](./CURRENT_STATUS.md) - Project status
- [DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md) - Full roadmap

