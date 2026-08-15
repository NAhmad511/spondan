# Getting Started with স্পন্দন (Spondan)

A complete step-by-step guide to set up your music player.

---

## 🎯 Quick Overview

This is a **Next.js music player** that:
- ✅ Plays music from YouTube (visible player, not hidden)
- ✅ Has 5 playlists with 182 songs
- ✅ Works on desktop and mobile
- ✅ Shows a spinning vinyl and glowing interface
- ✅ Displays Kolkata time with a blinking colon

**Current Status:** Code is ready. You just need to:
1. Install dependencies
2. Add YouTube video IDs for songs
3. Add background images
4. Run the server

---

## 📋 Prerequisites

You'll need:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** (comes with Node.js)
- **A text editor** - VS Code recommended: [Download](https://code.visualstudio.com/)
- **5 minutes per playlist** to add YouTube video IDs

---

## ⚡ Step-by-Step Setup

### Step 1: Install Dependencies (2 minutes)

Open your terminal in the project folder and run:

```bash
npm install
```

This downloads all necessary packages.

### Step 2: Add Background Images (5 minutes)

The images you provided:

1. **scene-wide.png** (landscape, ~1920×1080+)
   - Save to: `public/bg/scene-wide.png`

2. **scene-tall.png** (portrait, separately composed)
   - Save to: `public/bg/scene-tall.png`

**Folder structure should look like:**
```
public/
└── bg/
    ├── scene-wide.png
    └── scene-tall.png
```

> **If you don't have the images yet:** The app will still run but show a black background. Add them whenever you're ready.

### Step 3: Add YouTube Video IDs (Most Important!)

This is where your music actually plays. Each song needs a YouTube video ID.

**📖 Full Guide:** Read `VIDEOID_SETUP.md` (it has detailed instructions)

**Quick Version:**

1. Open: `lib/playlists.ts` in your editor
2. Find a song with empty `videoId: ""`
3. Search YouTube for that song
4. Copy the video ID from the URL
5. Paste it into the file

**Example:**

Before:
```typescript
{ id: "1", title: "Running Up That Hill", artist: "Kate Bush", duration: 305, videoId: "" }
```

After:
```typescript
{ id: "1", title: "Running Up That Hill", artist: "Kate Bush", duration: 305, videoId: "wp43OdtAAkM" }
```

**⚠️ Important:** Only use videos with embedding enabled. Usually:
- ✅ Official artist channels (with ✓)
- ✅ VEVO official
- ✅ T-Series (Indian music)
- ❌ Avoid region-restricted or disabled-embedding videos

**Pro Tip:** Start with just 1-2 videos to test. Once you see them playing, it's easier to add the rest.

### Step 4: Start the Development Server (30 seconds)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You should see:
- Background image (if you added it)
- Clock showing Kolkata time
- Player interface
- If a song has videoId, it will play

### Step 5: Test & Debug

**If music plays:** 🎉 Excellent! Continue adding more video IDs.

**If music doesn't play:**
1. Check browser console (F12 → Console tab)
2. Is there an error message?
3. Is the video ID correct?
4. Does the video play on YouTube.com directly?
5. Is embedding enabled in the share menu?

**All songs empty?** The app will show "Add YouTube video IDs to songs to start playing" message. This is correct—no songs are configured yet.

---

## 🎵 Adding All 182 Songs

You have **5 playlists:**

1. **Daily Rock** - 72 songs
   - Mix of rock, indie, Hindi, Bengali
   - Featured artists: Kate Bush, Arijit Singh, Michael Jackson, etc.

2. **সংগীত (Songeet)** - 30 songs
   - Bengali language songs
   - Featured artists: Anupam Roy, Rupankar Bagchi, Anjan Dutt, etc.

3. **Bangla FOLK** - 30 songs
   - Bengali folk music
   - Featured artists: Bhoomi, Fakira, Lopamudra Mitra, etc.

4. **Bolly 2000s** - 30 songs
   - Bollywood 2000s hits
   - Featured artists: Sonu Nigam, Arijit Singh, KK, Pritam, etc.

5. **90s** - 30 songs
   - Hindi 90s classics
   - Featured artists: Kumar Sanu, Alka Yagnik, Lata Mangeshkar, etc.

### Recommended Approach:

**Option A: Quick Start (1 hour)**
- Add 10 songs from each playlist
- Get the player working
- Add more songs later as needed

**Option B: Complete Setup (2-3 hours)**
- Add all 182 songs at once
- Use batch processing (multiple browser tabs)
- Have everything ready immediately

**Option C: Gradual (Daily)**
- Add 10 songs per day
- Takes ~18 days but no rush
- Spread the work out

---

## 🎨 Customization

### Change Accent Color

The accent color is yellow (#fbbf24). To change it:

1. Open: `app/globals.css`
2. Find the `@theme` section:
```css
@theme {
  --color-accent: #fbbf24;  /* Change this hex code */
  --color-accent-dark: #f59e0b;  /* And this one */
}
```
3. Use any hex color: [Color Picker](https://htmlcolorcodes.com/)

### Customize Social Links

1. Open: `components/SocialLinks.tsx`
2. Replace placeholder URLs:
```tsx
<a href="https://instagram.com/yourname" ...>
<a href="https://wa.me/918123456789" ...>
```

### Change Timezone (Clock)

1. Open: `components/Clock.tsx`
2. Find: `timeZone: "Asia/Kolkata"`
3. Change to your timezone: [List of timezones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

---

## 🚀 Deployment

### Deploy to Vercel (Recommended, Free)

1. Create account: [vercel.com](https://vercel.com/signup)
2. Connect your GitHub repository
3. Vercel auto-deploys on every push
4. Domain: Your project gets a free `.vercel.app` domain

**Custom Domain:**
Add spondan.in in Vercel settings (requires domain DNS configuration)

### Deploy to Your Own Server

```bash
npm run build
npm run start
```

Then serve with nginx or another web server.

---

## 📁 Project Structure

```
spondan/
├── app/
│   ├── layout.tsx          # Page structure
│   ├── page.tsx            # Main player page
│   └── globals.css         # Styling with Tailwind
│
├── components/
│   ├── Clock.tsx           # Kolkata timezone clock
│   ├── Player.tsx          # Main player controller
│   ├── DesktopPlayer.tsx   # Desktop UI (glass pill)
│   ├── MobilePlayer.tsx    # Mobile UI (card layout)
│   ├── PlaylistSelector.tsx# Playlist buttons
│   ├── SocialLinks.tsx     # Social links
│   └── GrainOverlay.tsx    # Film grain effect
│
├── lib/
│   ├── playlists.ts        # ⭐ All songs & video IDs
│   └── utils.ts            # Helper functions
│
├── public/
│   └── bg/
│       ├── scene-wide.png  # Landscape background
│       └── scene-tall.png  # Portrait background
│
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── next.config.js          # Next.js config
└── postcss.config.js       # Tailwind config
```

---

## 🐛 Troubleshooting

### "npm install fails"
```
Solution: Delete node_modules folder and package-lock.json, then run again:
$ rm -rf node_modules package-lock.json
$ npm install
```

### "Port 3000 already in use"
```
Use a different port:
$ npm run dev -- -p 3001
```

### "Video doesn't play"
1. Is videoId correct? (Copy directly from YouTube URL)
2. Is embedding enabled on YouTube? (Check share settings)
3. Different region? Try a different upload of the same song.

### "Background image not showing"
1. Check file path: `public/bg/scene-wide.png`
2. File exists? (No typos in filename)
3. File format is .png or .jpg?
4. Image size ~500KB? (Too large might not load)

### "Build errors"
1. Check terminal for error messages
2. Verify TypeScript syntax in edited files
3. All components are in `components/` folder?

---

## 📚 Learning Resources

- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS:** [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **YouTube IFrame API:** [developers.google.com/youtube](https://developers.google.com/youtube/iframe_api_reference)

---

## ✅ Checklist Before Going Live

- [ ] All 182 songs have YouTube video IDs (or however many you want)
- [ ] Background images (scene-wide.png, scene-tall.png) are added
- [ ] Tested in browser and songs play
- [ ] Social links point to your accounts
- [ ] Customized accent color if desired
- [ ] npm run build completes without errors
- [ ] Tested on both desktop and mobile browsers

---

## 🎵 You're Ready!

That's it! Your music player is complete.

**Next steps:**
1. Keep adding song video IDs
2. Share with friends
3. Enjoy your nostalgia playlist!

---

## 📞 Quick Support

### Songs Not Playing?
→ Check `VIDEOID_SETUP.md`

### Design Issues?
→ Edit `app/globals.css` or components in `components/`

### Need to Add More Playlists?
→ Edit `lib/playlists.ts`, duplicate a playlist object, give it a new ID

### Want to Hide/Show Components?
→ Edit `app/page.tsx` (main layout)

---

**Made with ♪ for you. Happy listening! 🎵**
