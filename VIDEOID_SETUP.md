# YouTube Video ID Setup Guide

**This is the most important step to get your music player working!**

## What is a Video ID?

A YouTube video ID is the unique code at the end of a YouTube URL.

Example: `https://www.youtube.com/watch?v=**wp43OdtAAkM**`
- The video ID is: `wp43OdtAAkM`

## How to Find Video IDs for Each Song

### Method 1: Search YouTube (Recommended)

1. Go to [youtube.com](https://youtube.com)
2. Search: `Running Up That Hill Kate Bush` (song + artist)
3. Click on the official video (usually has a checkmark ✓ or channel name)
4. Look at the URL bar: `youtube.com/watch?v=VIDEOID`
5. Copy the video ID after `v=`
6. Paste it into `lib/playlists.ts`

### Method 2: Get from Channel

1. Go to the artist's official YouTube channel
2. Find the song in their uploads
3. Copy the video ID from the URL

### Method 3: Browser Extension

Install "Copy YouTube Video ID" extension to copy IDs with one click.

## Adding Video IDs to Your Project

### Step 1: Open the File

Open this file in VS Code or your editor:
```
lib/playlists.ts
```

### Step 2: Find the Song

Search for the song title. For example, find "Running Up That Hill":

```typescript
{ id: "1", title: "Running Up That Hill", artist: "Kate Bush", duration: 305, videoId: "" }
```

### Step 3: Add the Video ID

Replace the empty `videoId: ""` with the actual ID:

```typescript
{ id: "1", title: "Running Up That Hill", artist: "Kate Bush", duration: 305, videoId: "wp43OdtAAkM" }
```

**Before:**
```
videoId: ""
```

**After:**
```
videoId: "wp43OdtAAkM"
```

### Step 4: Repeat for All Songs

Do this for each song in all 5 playlists until all `videoId` fields are filled.

---

## Batch Processing Tips

### Find Multiple Videos Quickly

1. Create a spreadsheet with song titles and artists
2. Open YouTube in multiple tabs
3. Search each song quickly
4. Copy all video IDs to a list
5. Paste into `lib/playlists.ts` all at once

### Use Find & Replace

In your editor:
1. Press Ctrl+H (or Cmd+H on Mac) to open Find & Replace
2. Find: `videoId: ""`
3. This shows you all empty video IDs you need to fill

---

## Common Issues & Solutions

### "Video not available in your country"

**Solution:** Find an alternative upload by the same artist or official channel
- Search: `"Song Title" "Artist Name" official`
- Try channels: VEVO, UMusicOfficial, T-Series, etc.

### "Embedding disabled for this video"

**Solution:** Find a different version that allows embedding
- Right-click video → "Copy video URL"
- Check if embedding icon shows in share menu
- If sharing is disabled, find another version

### "Video was removed"

**Solution:** The video no longer exists
- Try searching for a live version or cover
- Check if the artist reuploaded it
- The player will auto-skip unavailable videos

### Some Videos Play, Others Don't

**Reason:** Those videos don't allow embedding
- YouTube restricts embedding for licensed content in certain regions
- Try finding the same song from a different artist/channel
- Some Bollywood songs have regional restrictions

---

## Which Videos Are Safe to Use?

✅ **Use These:**
- Official artist channels (with ✓ checkmark)
- VEVO official uploads
- T-Series (for Indian music)
- Music label official channels
- Official soundtrack releases

❌ **Avoid These:**
- Unofficial reuploads
- Compilations with no clear rights
- User-created videos
- Low-quality/bootleg uploads
- Videos with embedding disabled

---

## Example: Adding Running Up That Hill

**Song in playlists.ts:**
```typescript
{ 
  id: "1", 
  title: "Running Up That Hill (A Deal With God)", 
  artist: "Kate Bush", 
  duration: 305, 
  videoId: ""  // ← Empty, needs to be filled
}
```

**Steps:**
1. Search YouTube: "Running Up That Hill Kate Bush"
2. Click official Kate Bush Vevo video
3. URL: `youtube.com/watch?v=wp43OdtAAkM`
4. Video ID: `wp43OdtAAkM`
5. Update to:
```typescript
{ 
  id: "1", 
  title: "Running Up That Hill (A Deal With God)", 
  artist: "Kate Bush", 
  duration: 305, 
  videoId: "wp43OdtAAkM"  // ← Added!
}
```

---

## All 5 Playlists Overview

- **Daily Rock** - 72 songs (mix of rock, indie, Hindi/Bengali)
- **সংগীত** - 30 Bengali songs
- **Bangla FOLK** - 30 Bengali folk songs
- **Bolly 2000s** - 30 Bollywood 2000s hits
- **90s** - 30 Hindi 90s classics

**Total: 182 songs to configure**

---

## Testing

After adding a few video IDs:

1. Save the file
2. The development server auto-reloads
3. Refresh your browser
4. Try playing a song

If it works: Great! Continue adding more.
If it doesn't: Check the browser console for errors.

---

## Automating This Process

### Script to Extract Video IDs (Advanced)

If you have a list of video URLs, you can extract IDs:

```bash
# Extract video IDs from a list of URLs
grep -oP 'v=\K[^&]*' urls.txt
```

---

## Need Help?

### Check These First:
1. Is the `videoId` correctly copied? (No spaces, no extra characters)
2. Does the video play on YouTube.com directly?
3. Is embedding enabled? (Try sharing menu)
4. Is it a region-restricted video?

### Test a Video:
Paste this URL in your browser to test if embedding works:
```
https://www.youtube.com/embed/VIDEOID
```
Replace VIDEOID with the actual ID. If it plays, embedding is enabled.

---

**Ready to add some music? Start with the Daily Rock playlist! 🎵**
