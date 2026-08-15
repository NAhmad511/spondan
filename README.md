# স্পন্দন (Spondan) - Music Player

A nostalgic music player built with Next.js, featuring multiple playlists and YouTube integration.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Add Background Images

Place your background images in the `public/bg/` directory:
- `public/bg/scene-wide.png` - Landscape background (1920×1080 or wider)
- `public/bg/scene-tall.png` - Portrait background (separately composed, not a crop)

### 3. Add YouTube Video IDs

This is the **most important step**. Open `lib/playlists.ts` and add YouTube video IDs for each song.

#### How to find YouTube video IDs:

1. Go to youtube.com
2. Search for the song: `[Song Title] [Artist Name]`
3. Find the official video (prefer rights holder uploads)
4. Copy the video ID from the URL: `youtube.com/watch?v=**VIDEOID**`
5. Paste it into the `videoId` field in `lib/playlists.ts`

#### Example:
```typescript
{
  id: "1",
  title: "Running Up That Hill",
  artist: "Kate Bush",
  duration: 305,
  videoId: "wp43OdtAAkM"  // <-- Add this
}
```

**IMPORTANT:** Only include videos where:
- Embedding is enabled (video can be embedded in web players)
- You have the right to use them (official uploads or licensed content)
- The video is from the rights holder's channel or official uploads

### 4. Configure Social Links

Edit `components/SocialLinks.tsx` and replace placeholder URLs:
```tsx
<a href="https://instagram.com/yourprofile" ...>
<a href="https://wa.me/1234567890" ...>
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Features

### ✅ Multiple Playlists
- **Daily Rock** - 72 songs
- **সংগীত (Songeet)** - 30 Bengali songs
- **Bangla FOLK** - 30 folk songs
- **Bolly 2000s** - 30 Bollywood hits
- **90s** - 30 classic 90s songs

Switch between playlists with the playlist selector buttons.

### ✅ Responsive Design
- **Desktop:** Horizontal glass pill design with spinning vinyl
- **Mobile:** Stacked card layout optimized for touch
- Automatically detects and adapts to screen orientation

### ✅ YouTube Integration
- Plays videos directly from YouTube
- No background audio separation (complies with YouTube Developer Policies)
- Visible player with proper iframe implementation
- Error handling: auto-skips unavailable videos

### ✅ Playback Controls
- Play/Pause
- Previous/Next track
- Seek bar with progress indicator
- Elapsed time / Total duration display
- Spinning vinyl animation (runs/pauses with playback)

### ✅ Design Details
- Glass morphism effect on player
- Kolkata timezone clock (Asia/Kolkata) with blinking colon
- Film grain overlay for nostalgia
- Safe area insets for notched devices
- Accessible keyboard and touch controls

## File Structure

```
spondan/
├── app/
│   ├── layout.tsx           # Root layout with viewport config
│   ├── page.tsx             # Main page
│   ├── globals.css          # Tailwind v4 with @theme tokens
│   └── api/                 # API routes (admin access)
├── components/
│   ├── Clock.tsx            # Kolkata timezone clock
│   ├── SocialLinks.tsx      # Social media links
│   ├── Player.tsx           # Main player orchestrator
│   ├── PlaylistSelector.tsx # Playlist switcher
│   ├── DesktopPlayer.tsx    # Desktop UI
│   ├── MobilePlayer.tsx     # Mobile UI
│   └── GrainOverlay.tsx     # Film grain effect
├── lib/
│   ├── playlists.ts         # Song data (add videoIds here)
│   └── utils.ts             # Helper functions
├── public/
│   └── bg/
│       ├── scene-wide.png   # Landscape background
│       └── scene-tall.png   # Portrait background
├── package.json
├── tsconfig.json
├── next.config.js
├── postcss.config.js
└── README.md
```

## Adding/Removing Songs

### Add a Song

Edit `lib/playlists.ts` and add a one-line entry to any playlist:

```typescript
{ id: "73", title: "New Song", artist: "Artist Name", duration: 240, videoId: "YT_VIDEO_ID" }
```

### Remove a Song

Delete the entire track line. The IDs don't need to be sequential.

## Customization

### Change Accent Color

Edit `app/globals.css`:
```css
@theme {
  --color-accent: #fbbf24;  /* Yellow */
  --color-accent-dark: #f59e0b;
}
```

### Adjust Clock Timezone

Edit `components/Clock.tsx`:
```typescript
timeZone: "Asia/Kolkata"  // Change to your timezone
```

### Modify Social Links

Edit `components/SocialLinks.tsx` to add/remove links.

## Performance Tips

- Optimize background images: ~500KB each
- Use WebP format if possible
- Enable BROTLI compression in deployment
- Vercel Analytics and Speed Insights are included

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### GitHub Pages / Self-hosted

```bash
npm run build
npm run start
```

## Known Limitations

- YouTube videos must have embedding enabled
- Some music publishers restrict embedding
- Video availability depends on YouTube's content policies
- Cannot play audio if video is deleted or embedding disabled

## Support

If a song doesn't play:
1. Check that the YouTube video has embedding enabled
2. Verify the `videoId` is correct (copy directly from YouTube URL)
3. Try a different upload of the same song (some artists have multiple versions)

## License

This project is open source. Credit the creators of the music you include.

---

**Made with ♪ for nostalgic listening**
