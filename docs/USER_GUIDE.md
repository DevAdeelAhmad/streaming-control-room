# Streaming Control Room - User Guide

**Version:** 1.0  
**Last Updated:** October 3, 2025

Welcome to the Streaming Control Room! This guide will walk you through everything you need to know to use the application effectively.

---

## 📖 Table of Contents

1. [Getting Started](#getting-started)
2. [Authentication](#authentication)
3. [Dashboard Overview](#dashboard-overview)
4. [Playout Windows](#playout-windows)
5. [Control Panel](#control-panel)
6. [Theme Management](#theme-management)
7. [Asset Management](#asset-management)
8. [OBS Integration](#obs-integration)
9. [Tips & Best Practices](#tips--best-practices)
10. [Troubleshooting](#troubleshooting)

---

## Getting Started

### What is Streaming Control Room?

Streaming Control Room is a web application that lets you control graphics and overlays in OBS Studio in real-time. Update text, images, and layouts during your live stream without touching OBS!

### System Requirements

- **Web Browser:** Chrome, Firefox, Safari, or Edge (latest version)
- **OBS Studio:** Version 28.0 or higher
- **Internet Connection:** Required for cloud database and real-time updates
- **Screen Resolution:** 1920x1080 recommended for best experience

---

## Authentication

### Creating an Account

1. **Navigate to the Application**
   - Open your web browser
   - Go to: `http://localhost:3000` (or your deployed URL)

2. **Sign Up**
   - You'll be redirected to the login page
   - Click **"Sign up"** at the bottom
   - Fill in the registration form:
     - **Full Name:** Your display name
     - **Email Address:** Your email (must be valid)
     - **Password:** At least 6 characters
     - **Confirm Password:** Must match your password
   - Click **"Create Account"**

3. **Automatic Login**
   - After successful registration, you'll be automatically logged in
   - You'll be redirected to the Dashboard

### Logging In

1. **Go to Login Page**
   - Navigate to `http://localhost:3000` (or your URL)
   - You'll see the login page

2. **Enter Credentials**
   - **Email Address:** The email you registered with
   - **Password:** Your account password

3. **Sign In**
   - Click **"Sign In"**
   - You'll be redirected to the Dashboard

### Signing Out

**To sign out from any page:**
- Look for the **"Sign Out"** button in the top-right corner of the header
- Click **"Sign Out"**
- You'll be redirected to the login page
- Your session will be securely ended

**Note:** The Sign Out button appears on all dashboard pages (Dashboard, Playout Windows, Themes, Assets, Control Panel).

---

## Dashboard Overview

The Dashboard is your home page after logging in. It provides quick access to all features.

### Dashboard Layout

#### Header Section
- **Title:** "Streaming Control Room"
- **Welcome Message:** Shows your name
- **Sign Out Button:** Top-right corner (red button)

#### Feature Cards

1. **System Status Card**
   - Shows if database is connected
   - Shows if authentication is active
   - Green indicators mean everything is working

2. **Control Panel Card (Purple)**
   - Click to access live stream controls
   - Manage playout windows

3. **Playout Windows Card (Blue)**
   - Click to create and manage OBS displays
   - View all your playout sessions

4. **Themes Card (Pink)**
   - Click to save and load graphic configurations
   - Browse your saved themes

5. **Assets Card (Yellow)**
   - Click to upload and manage images
   - Access your asset library

6. **Your Profile Card**
   - View your account information
   - Shows your email and name

#### Quick Start Guide Section
At the bottom of the dashboard, you'll find quick instructions:
1. Create a Playout Window
2. Add to OBS
3. Control Graphics
4. Save Themes

---

## Playout Windows

Playout Windows are the 1920x1080 browser sources you add to OBS. Each playout window can be controlled independently.

### Creating a Playout Window

1. **Navigate to Playout Windows**
   - Click the **"Playout Windows"** card on the Dashboard
   - OR use the navigation

2. **Click "New Playout"**
   - Button is in the top-right corner of the header

3. **Enter Playout Name**
   - Give your playout a descriptive name
   - Examples: "Main Stream", "Lower Third", "Scoreboard"
   - Click **"Create"**

4. **Playout Created!**
   - Your new playout window appears in the list
   - It's automatically set to "Active" status

### Understanding Playout URLs

Each playout window has **three URL types**:

#### 1. Standard (Preview)
- **Color:** Gray
- **Use For:** Testing in your web browser
- **Features:** Shows development indicators
- **URL:** `http://localhost:3000/playout/[id]`

#### 2. OBS Mode (Optimized) ⭐ Recommended
- **Color:** Green
- **Use For:** Adding to OBS Studio
- **Features:** Optimized performance, no dev indicators
- **URL:** `http://localhost:3000/playout/[id]?obs=true`

#### 3. OBS Transparent
- **Color:** Blue
- **Use For:** Overlays with transparent backgrounds
- **Features:** No background, perfect for overlays
- **URL:** `http://localhost:3000/playout/[id]?obs=true&transparent=true`

### Managing Playout Windows

Each playout session has several action buttons:

#### ⚙️ Control Button
- Opens the Control Panel for this playout
- Edit text, images, and layout in real-time

#### 👁️ View Button
- Opens the playout window in a new tab
- Preview how it looks in OBS

#### 📋 Copy Buttons
- **Standard:** Copy standard URL
- **OBS Mode:** Copy optimized OBS URL
- **OBS Transparent:** Copy transparent OBS URL
- Click any copy button to copy the URL to clipboard

#### 🗑️ Delete Button
- Permanently removes the playout session
- **Warning:** This cannot be undone!
- All configurations for this playout will be lost

### Playout Window Information

For each playout, you can see:
- **Name:** The name you gave it
- **Status:** Active or Inactive (green or gray badge)
- **ID:** Unique identifier
- **Created:** When it was created
- **Last Active:** Last time it was used

---

## Control Panel

The Control Panel is where the magic happens! Control your playout window graphics in real-time.

### Opening the Control Panel

1. **From Playout Windows Page**
   - Click the **"⚙️ Control"** button next to any playout

2. **You'll See:**
   - Header with playout name
   - Connection status indicator
   - Tabbed interface (Text, Images, Layout)
   - Live preview on the right

### Connection Status

**Look for the status indicator:**
- **● Live (Green):** Real-time connection active
- **○ Disconnected (Red):** Connection lost

**If disconnected:**
- The system will automatically try to reconnect
- Wait a few seconds
- If it doesn't reconnect, refresh the page

### Tab 1: Text Layers

Add and edit text overlays on your playout window.

#### Adding a Text Layer

1. **Click "Add Text Layer"** button
2. A new text layer appears in the list

#### Editing Text Content

**Content Field:**
- Type your text (e.g., "Live Now!", "John Doe")
- Changes apply instantly to the playout window

#### Position Settings

**X Position:**
- Horizontal position (0 = left edge, 1920 = right edge)
- Default: 100

**Y Position:**
- Vertical position (0 = top edge, 1080 = bottom edge)
- Default: 100

#### Text Styling

**Font Size:**
- Slider from 12px to 120px
- Default: 32px

**Font Weight:**
- Dropdown: Normal, Bold
- Makes text thicker or thinner

**Color:**
- Click the color picker
- Choose any color
- Default: White (#FFFFFF)

**Text Align:**
- Left, Center, Right
- Aligns text within its container

**Font Family:**
- Arial (default)
- Helvetica
- Times New Roman
- Courier New
- Georgia
- Verdana
- Impact

#### Text Effects

**Shadow:**
- Checkbox to enable/disable
- Adds a subtle shadow behind text
- Makes text more readable on any background

**Stroke (Outline):**
- Checkbox to enable/disable
- **Stroke Width:** 0-10px (thickness of outline)
- **Stroke Color:** Color picker for outline color
- Great for making text stand out

#### Visibility & Actions

**Visible Checkbox:**
- Toggle to show/hide the text layer
- Useful for preparing text before showing it

**🗑️ Remove Button:**
- Deletes this text layer
- Cannot be undone

**💾 Update Button:**
- Saves changes and broadcasts to playout
- **Note:** Most changes apply automatically, but click this to ensure everything is saved

### Tab 2: Image Layers

Add and manage image overlays.

#### Adding an Image Layer

1. **Click "Add Image Layer"** button
2. A new image layer appears

#### Setting the Image

**Three Ways to Add Images:**

1. **Upload Image** (Drag & Drop)
   - Click "Upload Image" or drag file onto the area
   - Accepted formats: PNG, JPG, GIF, WebP, SVG
   - Max size: 10MB
   - Uploaded images go to your Asset Library

2. **Browse Library**
   - Click "Browse Library"
   - Select from your previously uploaded images
   - Click an image to select it

3. **Image URL**
   - Paste a direct image URL
   - Must be a publicly accessible link
   - Example: `https://example.com/logo.png`

#### Position Settings

**X Position:**
- Horizontal position (0 = left, 1920 = right)
- Default: 100

**Y Position:**
- Vertical position (0 = top, 1080 = bottom)
- Default: 100

**Width & Height:**
- Size of the image in pixels
- Default: 200x200
- Maintain aspect ratio or set custom dimensions

#### Transform Settings

**Opacity:**
- Slider from 0 (invisible) to 1 (fully visible)
- Default: 1 (fully opaque)
- Use for fade effects or watermarks

**Z-Index:**
- Layer order (-100 to 100)
- Higher numbers appear on top
- Default: 1
- Use to control which images appear above others

#### Visibility & Actions

**Visible Checkbox:**
- Toggle to show/hide the image layer
- Prepare images before revealing them

**🗑️ Remove Button:**
- Deletes this image layer
- Cannot be undone

**💾 Update Button:**
- Saves changes and broadcasts to playout

### Tab 3: Layout Settings

Control the overall appearance of your playout window.

#### Background Color

**Color Picker:**
- Click to choose a background color
- Default: Black (#000000)
- This color fills the entire 1920x1080 canvas

**Transparent Mode:**
- If using transparent URL mode, this is ignored

#### Background Image

**Image URL:**
- Paste a URL to use as background image
- Covers the entire 1920x1080 canvas
- Shows behind all text and image layers

**Tips:**
- Use high-resolution images (1920x1080 recommended)
- Image will be sized to "cover" the canvas

### Live Preview

**Located on the right side:**
- Shows a scaled-down view of your playout window
- Updates in real-time as you make changes
- Resolution: Scaled to fit (maintains 1920x1080 aspect ratio)

**Features:**
- ● Live indicator when connected
- Refresh automatically with each change
- What you see is what appears in OBS

### Saving Configuration

#### Save Current Configuration

**Click "💾 Save Configuration" button:**
- Saves all layers, positions, and settings
- Configuration is tied to this playout session
- Automatically loaded next time you open this playout

#### Save as Theme

**Click "🎨 Save as Theme" button:**
1. A modal appears
2. **Theme Name:** Give your theme a name (e.g., "Lower Third Blue")
3. **Description:** Optional description (e.g., "Blue lower third with white text")
4. Click **"Save Theme"**
5. Theme is now saved in your Theme Library!

#### Load Theme

**Click "📁 Load Theme" button:**
1. A modal shows all your saved themes
2. Browse your themes
3. Click **"Load"** on any theme
4. Confirmation prompt appears
5. Click **"Yes, load it!"** to apply the theme
6. All layers and settings are replaced with the theme's configuration

---

## Theme Management

Themes let you save and reuse playout configurations quickly.

### Viewing Your Themes

1. **Go to Themes Page**
   - Click **"Themes"** card on the Dashboard
   - OR navigate to Themes from any page

2. **Theme Gallery**
   - All your saved themes are displayed
   - Each theme shows:
     - Theme icon
     - Theme name
     - Description
     - Text layers count
     - Image layers count
     - Creation date

### Loading a Theme

**From Themes Page:**
1. Find the theme you want to use
2. Click **"📂 Load"** button
3. You'll see a list of active playout sessions
4. Click on the playout session where you want to load this theme
5. Theme is immediately applied to that playout!

**From Control Panel:**
1. Click **"📁 Load Theme"** button in the Control Panel
2. Browse your themes
3. Click **"Load"** on the theme you want
4. Confirm the action
5. Theme is applied to the current playout

### Deleting a Theme

1. **From Themes Page**
   - Click the **"🗑️"** (delete) button on any theme card
2. **Confirm Deletion**
   - Click **"Yes, delete it!"** to confirm
3. **Theme Deleted**
   - Theme is permanently removed from your library
   - This does NOT affect any playout windows currently using this theme

**Note:** Deleted themes cannot be recovered!

---

## Asset Management

Manage all your uploaded images in one place.

### Viewing Your Assets

1. **Go to Assets Page**
   - Click **"Assets"** card on Dashboard

2. **Asset Library**
   - Grid view of all uploaded images
   - Shows image thumbnail, filename, and size

### Uploading Assets

#### Method 1: Drag & Drop

1. **On Assets Page:**
   - Locate the upload area
   - Drag one or more image files from your computer
   - Drop them onto the upload area
   - Upload begins automatically

#### Method 2: Click to Browse

1. **On Assets Page:**
   - Click **"Upload Image"** button (or upload area)
   - File browser opens
   - Select one or more images
   - Click **"Open"**
   - Upload begins automatically

#### Supported Formats

- **PNG** (recommended for transparency)
- **JPG / JPEG**
- **GIF** (animated supported)
- **WebP**
- **SVG**

#### File Size Limit

- **Maximum:** 10MB per file
- Larger files will be rejected with an error message

#### Upload Progress

- Progress bar shows upload status
- Success message appears when complete
- Asset appears in your library immediately

### Using Assets

**Assets can be used in:**
1. **Image Layers** (Control Panel → Images tab)
2. **Background Images** (Control Panel → Layout tab)

**To Use an Asset:**
1. Go to Control Panel
2. In Images tab, click **"Browse Library"**
3. Select the asset you want
4. Asset is immediately added to your playout

### Deleting Assets

1. **Find the Asset**
   - Locate the image in your asset library

2. **Click Delete Button (🗑️)**
   - Confirm deletion
   - Asset is permanently removed from the server

**Warning:**
- Deleted assets cannot be recovered
- If an asset is currently used in a playout or theme, it will show as missing
- Consider replacing references before deleting

### Asset Statistics

**At the top of Assets page:**
- **Total Assets:** Total number of uploaded images
- **Total Size:** Combined size of all assets
- **Storage Used:** How much space you're using

---

## OBS Integration

Connect your playout windows to OBS Studio for professional streaming.

### Adding a Playout to OBS

#### Step 1: Get the URL

1. **Go to Playout Windows page**
2. **Find your playout session**
3. **Click "📋 Copy"** for **"OBS Mode (Optimized)"** URL
   - The URL is now in your clipboard
   - It looks like: `http://localhost:3000/playout/abc123?obs=true`

#### Step 2: Add Browser Source in OBS

1. **Open OBS Studio**
2. **In the Sources panel, click "+"**
3. **Select "Browser"**
4. **Name the source** (e.g., "Lower Third", "Scoreboard")
5. **Click OK**

#### Step 3: Configure Browser Source

**In the Properties window:**

**URL:**
- Paste the URL you copied (Ctrl+V or Cmd+V)

**Width:**
- Enter: `1920`

**Height:**
- Enter: `1080`

**FPS:**
- Enter: `60` (or 30 for lower CPU usage)

**Custom CSS:** (optional)
- Leave blank

**Checkboxes:**
- ✅ **Use custom frame rate**
- ✅ **Control audio via OBS**
- ❌ **Shutdown source when not visible** (uncheck for transparency)
- ❌ **Refresh browser when scene becomes active** (uncheck)

**Click OK**

#### Step 4: Position the Source

1. **Playout appears in your scene**
2. **Resize/position** as needed:
   - For full-screen: Leave at 1920x1080
   - For overlays: Resize and position

3. **Done!** Your playout is now live in OBS

### Using Transparent Backgrounds

**For transparent overlays:**

1. **Copy the "OBS Transparent" URL** instead
   - It includes `?obs=true&transparent=true`

2. **Follow the same steps as above**

3. **In Control Panel:**
   - Don't set a background color
   - Don't set a background image
   - Only text and image layers will be visible

**Perfect for:**
- Lower thirds
- Corner overlays
- Floating graphics
- Score overlays

### Real-Time Updates

**Once connected:**
1. **Keep Control Panel open** in your web browser
2. **Make changes** to text, images, or layout
3. **Changes appear instantly** in OBS
4. **No need to refresh** OBS browser source

**Connection Status:**
- Check the **"● Live"** indicator in Control Panel
- If disconnected, OBS will keep showing the last state
- Reconnection is automatic

### Multiple Playout Windows

**You can add multiple playouts to one OBS scene:**

1. Create multiple playout sessions (e.g., "Lower Third", "Scoreboard", "Alerts")
2. Add each as a separate Browser source in OBS
3. Position and layer them as needed
4. Control each independently from its own Control Panel

**Use Cases:**
- Main overlay + scoreboard
- Multiple lower thirds
- Corner logos + center alerts

---

## Tips & Best Practices

### General Tips

1. **Name Your Playouts Clearly**
   - Use descriptive names like "Main Lower Third" instead of "Playout 1"
   - Makes it easier to find the right control panel

2. **Use Themes for Quick Switching**
   - Save different configurations as themes
   - Switch between looks instantly during a stream

3. **Test Before Going Live**
   - Always preview in OBS before streaming
   - Check text readability and image positions

4. **Keep Control Panel Open**
   - Open in a separate browser window or second monitor
   - Easy access for real-time updates during streams

5. **Sign Out When Done**
   - Click "Sign Out" button in top-right corner
   - Secures your account

### Performance Tips

1. **Optimize Image Sizes**
   - Use compressed images when possible
   - Don't upload unnecessarily large files
   - 1920x1080 or smaller is usually sufficient

2. **Limit Active Layers**
   - Hide layers you're not currently using
   - Fewer active layers = better performance

3. **Use OBS Mode URLs**
   - Always use "OBS Mode" URLs in OBS Studio
   - Better performance than standard URLs

4. **Set Appropriate FPS**
   - 60 FPS for smooth animations
   - 30 FPS for static graphics (saves CPU)

### Design Tips

1. **Contrast is Key**
   - Use text shadows or strokes for readability
   - White text with dark stroke works on any background

2. **Consistent Sizing**
   - Keep text sizes consistent across similar elements
   - Makes your stream look more professional

3. **Z-Index Layering**
   - Use Z-index to control layer order
   - Background images: -1
   - Text: 10 or higher

4. **Test Different Backgrounds**
   - Your overlays should work on various game/camera backgrounds
   - Test with different content behind

### Workflow Tips

1. **Create a "Default" Theme**
   - Save your standard setup as a theme
   - Quickly reset to default if needed

2. **Prepare Graphics Before Stream**
   - Upload all assets beforehand
   - Create themes for different segments

3. **Use Multiple Browser Tabs**
   - One tab for playout management
   - Separate tabs for each control panel
   - One tab for asset/theme management

4. **Keyboard Shortcuts**
   - Use Tab key to navigate between form fields
   - Enter key to submit forms
   - Speeds up your workflow

---

## Troubleshooting

### Cannot Sign In

**Issue:** "Invalid email or password" error

**Solutions:**
1. Double-check your email and password
2. Make sure Caps Lock is off
3. Try resetting your password (if implemented)
4. Contact administrator if you can't access your account

---

### Playout Not Showing in OBS

**Issue:** Black screen or "Loading..." in OBS

**Solutions:**
1. **Check the URL:**
   - Make sure you copied the correct OBS Mode URL
   - Verify it includes `?obs=true`

2. **Verify Browser Source Settings:**
   - Width: 1920
   - Height: 1080
   - FPS: 60 or 30

3. **Refresh the Browser Source:**
   - Right-click the source in OBS
   - Click "Refresh"

4. **Check if Server is Running:**
   - Open the URL in your regular browser
   - If it doesn't load there, the server might be down

5. **Try a New Browser Source:**
   - Delete the source in OBS
   - Add it again from scratch

---

### Changes Not Appearing in OBS

**Issue:** Control Panel changes don't show in OBS

**Solutions:**
1. **Check Connection Status:**
   - Look for **"● Live"** (green) in Control Panel
   - If disconnected, wait for reconnection or refresh

2. **Click Update Button:**
   - After making changes, click the "💾 Update" button
   - Some changes may require manual save

3. **Refresh OBS Browser Source:**
   - Right-click source → Refresh

4. **Check if Layers are Visible:**
   - Make sure the "Visible" checkbox is checked
   - Hidden layers won't show in OBS

5. **Verify You're Controlling the Right Playout:**
   - Check the playout name in Control Panel header
   - Make sure it matches the one in OBS

---

### WebSocket Disconnected

**Issue:** "○ Disconnected" status in Control Panel

**Solutions:**
1. **Wait for Auto-Reconnect:**
   - System automatically tries to reconnect
   - Usually happens within 5-10 seconds

2. **Check Internet Connection:**
   - Ensure you're connected to the internet
   - Check if other websites load

3. **Refresh the Page:**
   - Ctrl+R (or Cmd+R on Mac)
   - You'll need to log in again

4. **Check Server Status:**
   - If self-hosted, ensure the server is running
   - Check terminal for errors

---

### Images Not Loading

**Issue:** Image layers show as broken or don't display

**Solutions:**
1. **Check Image URL:**
   - Make sure the URL is correct and publicly accessible
   - Test the URL in a new browser tab

2. **Verify Image Format:**
   - Only supported formats work (PNG, JPG, GIF, WebP, SVG)
   - Try converting to PNG if it's an unusual format

3. **Check File Size:**
   - Maximum 10MB per image
   - Compress large images

4. **Re-upload the Image:**
   - Delete and re-upload the asset
   - Try using a different image

5. **Use Full URLs:**
   - Use complete URLs including `http://` or `https://`
   - Relative paths won't work

---

### Upload Failing

**Issue:** "Upload failed" error when uploading assets

**Solutions:**
1. **Check File Size:**
   - Maximum 10MB per file
   - Compress or resize if too large

2. **Verify File Type:**
   - Only image files are accepted
   - PNG, JPG, GIF, WebP, SVG

3. **Check File Name:**
   - Avoid special characters in filename
   - Use only letters, numbers, hyphens, underscores

4. **Try a Different Browser:**
   - Some browsers handle uploads differently
   - Chrome usually works best

5. **Check Storage Space:**
   - If self-hosted, verify server has disk space
   - Contact administrator

---

### Theme Not Loading

**Issue:** "Failed to load theme" error

**Solutions:**
1. **Verify Theme Exists:**
   - Check Themes page to ensure theme is still there
   - Theme may have been deleted

2. **Select a Playout:**
   - When loading from Themes page, select which playout to load into
   - Can't load without a target playout

3. **Try a Different Theme:**
   - Test if other themes load
   - The specific theme may be corrupted

4. **Reload the Page:**
   - Refresh and try again
   - Sometimes temporary network issues cause this

---

### Performance Issues

**Issue:** Slow performance or lag in OBS

**Solutions:**
1. **Lower Browser Source FPS:**
   - Change from 60 FPS to 30 FPS in OBS
   - Right-click source → Properties

2. **Reduce Active Layers:**
   - Hide unused layers
   - Fewer layers = better performance

3. **Optimize Images:**
   - Use compressed, optimized images
   - Avoid very large images

4. **Close Other Applications:**
   - Free up system resources
   - Close unnecessary browser tabs

5. **Hardware Acceleration:**
   - In OBS: Settings → Advanced
   - Ensure hardware acceleration is enabled

6. **Check CPU/GPU Usage:**
   - Open Task Manager (Windows) or Activity Monitor (Mac)
   - If at 100%, consider upgrading hardware

---

### Account Locked or Issues

**Issue:** Cannot access your account

**Solutions:**
1. **Verify Email:**
   - Use the same email you registered with
   - Check for typos

2. **Contact Administrator:**
   - If self-hosted, contact the server administrator
   - They can help reset your account

3. **Create a New Account:**
   - If allowed, register a new account
   - Use a different email address

---

## Getting More Help

### Documentation

- **README.md:** Project overview and setup
- **OBS_INTEGRATION_GUIDE.md:** Detailed OBS setup
- **DEPLOYMENT_GUIDE.md:** Hosting and deployment
- **PRODUCTION_CHECKLIST.md:** Production readiness

### Checking Logs

**Browser Console (for troubleshooting):**
1. Press F12 (or Cmd+Option+I on Mac)
2. Click "Console" tab
3. Look for error messages (red text)
4. Share these with support if needed

**OBS Logs:**
1. In OBS: Help → Log Files → View Current Log
2. Search for "Browser" to find browser source issues

---

## Keyboard Shortcuts & Quick Actions

### Universal

- **F12:** Open browser developer console
- **Ctrl+R / Cmd+R:** Refresh page
- **Tab:** Navigate between form fields
- **Enter:** Submit forms

### Control Panel

- **Click & Type:** Edit text content directly
- **Tab:** Move between fields
- **Enter:** Confirm inputs

### OBS

- **Right-click source → Refresh:** Reload browser source
- **Right-click source → Interact:** Interact with webpage (not recommended for playout)

---

## Glossary

**Playout Window:** The 1920x1080 display that appears in OBS

**Control Panel:** The interface where you edit playout graphics

**Theme:** A saved configuration of layers and settings

**Asset:** An uploaded image file in your library

**Layer:** A single text or image element on the playout

**Z-Index:** The stacking order of layers (higher = on top)

**OBS Mode:** Optimized URL for OBS Studio

**Transparent Mode:** Playout with no background

**WebSocket:** Real-time connection technology used for instant updates

---

## Conclusion

You now have all the knowledge to use the Streaming Control Room effectively! Remember:

1. **Create playout windows** for each graphic you need
2. **Add them to OBS** as browser sources
3. **Control in real-time** from the Control Panel
4. **Save as themes** for quick switching
5. **Upload assets** for easy reuse
6. **Sign out** when done for security

**Happy Streaming! 🎬📺**

---

**Support:** For additional help, refer to the other documentation files in the `docs/` folder or contact your system administrator.

**Version:** 1.0  
**Last Updated:** October 3, 2025

