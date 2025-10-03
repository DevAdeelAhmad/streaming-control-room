# Control Panel Quick Start Guide

## 🎮 Your Live Streaming Control Room

The Control Panel gives you **real-time control** over your OBS overlays. Make changes and see them instantly in your stream!

---

## Getting Started (60 seconds)

### 1. Create a Playout Window
```
Dashboard → Playout Windows → + New Playout → Name it → Create
```

### 2. Open Control Panel
```
Click "⚙️ Control" button on your playout
```

### 3. Add Your First Text
```
Text Tab → + Add Text Layer → Edit content → Adjust position → Done!
```

### 4. Add Your First Image
```
Images Tab → Paste image URL → Add → Adjust size/position → Done!
```

### 5. See It Live
```
Click "🎥 Open Playout" → Check your changes live!
```

---

## Control Panel Overview

```
┌────────────────────────────────────────────────────────┐
│  ← Back  │  Control Panel  │  ● Connected  │  💾 Save │
├──────────┬────────────────────────────────────────────┤
│          │                                            │
│  📝 Text │           LIVE PREVIEW                     │
│  🖼️ Image│         (Your overlay here)                │
│  🎨Layout│                                            │
│          │                                            │
│  Layers  │        📊 Statistics                       │
│  Editor  │                                            │
│          │                                            │
└──────────┴────────────────────────────────────────────┘
```

---

## Text Layer Controls

### Adding Text
1. Click **"+ Add Text Layer"**
2. Layer appears with "New Text"
3. Click layer to edit

### Editing Text

**Content:**
- Type your message (multi-line supported)
- Great for: Names, titles, messages

**Position:**
- X: Left to right (0-1920)
- Y: Top to bottom (0-1080)

**Font:**
- 10 fonts available
- Size: 12-200px
- Weight: Light, Normal, Bold, etc.

**Color:**
- Click color picker
- Or type hex code (#ffffff)

**Effects:**
- Text Shadow: `2px 2px 4px rgba(0,0,0,0.8)`
- Z-Index: Layer ordering (higher = front)

---

## Image Layer Controls

### Adding Images
1. Copy image URL
2. Paste in input field
3. Click **"Add"**

### Editing Images

**Position:**
- X, Y coordinates

**Size:**
- Width and Height in pixels
- Maintains aspect ratio if needed

**Transform:**
- Rotation: 0-360°
- Opacity: 0-100%

**Layer:**
- Z-Index for ordering
- Visibility toggle

---

## Common Use Cases

### Lower Third (Name Display)
```
1. Add Text Layer
2. Content: "Streamer Name"
3. Position: X=50, Y=950
4. Font: Arial, 48px, Bold
5. Color: White
6. Shadow: 2px 2px 4px rgba(0,0,0,0.8)
```

### Logo Overlay
```
1. Add Image Layer
2. URL: Your logo URL
3. Position: X=50, Y=50
4. Size: 200x100
5. Opacity: 90%
```

### Starting Soon Screen
```
1. Add Text Layer (Title)
   - "STREAM STARTING SOON"
   - Position: Center (960, 400)
   - Font: Impact, 72px
   
2. Add Text Layer (Subtitle)
   - Stream details
   - Position: Center (960, 500)
   - Font: Arial, 36px
```

### Multi-Layer Scene
```
Background Image (Z=1)
  ↓
Title Text (Z=10)
  ↓
Subtitle Text (Z=11)
  ↓
Logo (Z=15)
```

---

## Pro Tips

### 🎯 Positioning

**Safe Zones:**
- Leave 50px margin from edges
- Prevents clipping in OBS

**Quick Centers:**
- Center X: 960
- Center Y: 540

**Common Positions:**
- Top Left: 50, 50
- Top Right: 1820, 50
- Bottom Left: 50, 1000
- Bottom Right: 1820, 1000

### 🎨 Styling

**Readable Text:**
- Use text shadows for contrast
- White text = dark shadow
- Dark text = light shadow

**Professional Fonts:**
- Titles: Impact, Arial Black
- Body: Arial, Helvetica
- Modern: Verdana, Georgia

**Color Schemes:**
- High contrast is key
- Test on different backgrounds
- Use brand colors

### 📊 Layer Management

**Z-Index Strategy:**
- 1-9: Backgrounds
- 10-19: Main content
- 20-29: Overlays
- 30+: Foreground elements

**Performance:**
- Keep under 20 layers
- Hide unused layers
- Use compressed images

---

## Keyboard Shortcuts

- **Enter** in image URL: Add image
- **Click layer**: Select for editing
- **✕ button**: Remove layer

---

## Real-Time Updates

### How Fast?
- Your edit → **< 150ms** → OBS shows it
- Includes: Text, images, colors, positions
- No refresh needed!

### Connection Status
- **Green ● Connected**: Live updates working
- **Red ○ Disconnected**: Updates paused

### Saving
- **Auto-broadcast**: Changes sent instantly
- **Manual save**: Click 💾 to persist to database
- **Best practice**: Save after major changes

---

## Troubleshooting

### Changes Not Showing?

1. **Check Connection**
   - Is indicator green?
   - Try clicking Save

2. **Check Layer Visibility**
   - Is "👁️ Visible" enabled?
   - Check Z-index ordering

3. **Check Playout Window**
   - Is it still open?
   - Try refreshing it

### Image Not Loading?

1. **URL Issues**
   - Is URL accessible?
   - Does it start with http:// or https://?
   - Try opening URL in browser

2. **CORS Issues**
   - Some sites block external loading
   - Upload to image host
   - Wait for Phase 7 (file upload)

### Performance Slow?

1. **Too Many Layers**
   - Keep under 20 total
   - Hide unused layers

2. **Large Images**
   - Use optimized/compressed images
   - Reasonable dimensions

---

## Advanced Techniques

### Text Shadow Examples

**Soft Glow:**
```css
0 0 10px rgba(255,255,255,0.8)
```

**Strong Outline:**
```css
-2px -2px 0 black, 2px -2px 0 black,
-2px 2px 0 black, 2px 2px 0 black
```

**Multiple Shadows:**
```css
2px 2px 4px black, 0 0 10px white
```

### Dynamic Positioning

**Responsive Layout:**
- Use percentages of 1920x1080
- Example: 25% = 480px from left

**Grid System:**
- Divide screen into thirds
- Use multiples of 320 or 360

### Layering Strategies

**Information Hierarchy:**
1. Most important: Largest, front layer
2. Supporting info: Medium size, mid layer
3. Background: Subtle, back layer

---

## What You Can Control

✅ **Text Layers:**
- Content, position, size
- Font family, weight, color
- Shadows, alignment, spacing

✅ **Image Layers:**
- Position, dimensions
- Rotation, opacity
- URL, visibility

✅ **Layout:**
- Background color
- Canvas size (1920x1080)

⏳ **Coming Soon:**
- File upload (Phase 7)
- Rive animations
- Templates/themes (Phase 6)

---

## Best Practices

### Before Going Live

1. ✅ Test all text is readable
2. ✅ Check positioning on actual stream
3. ✅ Verify colors work with game/content
4. ✅ Save your configuration
5. ✅ Test visibility toggles

### During Stream

1. 🔴 Keep control panel open
2. 🔴 Monitor connection status
3. 🔴 Make small adjustments only
4. 🔴 Test changes off-camera first
5. 🔴 Save important setups

### After Stream

1. 💾 Save successful configurations
2. 💾 Note what worked well
3. 💾 Plan improvements for next time

---

## Integration with OBS

### In OBS:
1. Your playout window is a Browser source
2. Set to 1920x1080
3. Changes appear automatically
4. No refresh needed!

### OBS Settings:
```
Source: Browser
URL: http://localhost:3000/playout/[id]
Width: 1920
Height: 1080
FPS: 30-60
✅ Shutdown when not visible
✅ Refresh on scene activate
```

---

## Getting Help

**Documentation:**
- `PHASE4_COMPLETE.md` - Technical details
- `OBS_SETUP_GUIDE.md` - OBS integration
- `CURRENT_STATUS.md` - Project status

**Common Questions:**
- Can I use my own images? Yes via URL (upload coming in Phase 7)
- How many layers? Recommended under 20
- Does it work offline? Yes, on localhost
- Can I save templates? Coming in Phase 6!

---

## Next Features (Phase 6)

🔜 **Theme Management:**
- Save current setup as theme
- Quick switch between themes
- Share themes with others
- Default templates

---

**Happy Streaming! 🎮📺**

Control your overlays like a pro and make your stream stand out!

