# PWA Icons for iktara Medical Scrubs

## Required Icons

To complete the PWA setup, you need to create app icons in the following sizes:

- 72x72px
- 96x96px
- 128x128px
- 144x144px
- 152x152px (Apple)
- 192x192px
- 384x384px
- 512x512px

## Icon Design Recommendations

### Design Guidelines:
- **Background Color**: #4C3F6C (iktara purple)
- **Text/Logo**: White or #FFFD8F (yellow accent)
- **Text**: "iktara" or "ik" monogram
- **Style**: Clean, professional, medical-themed

### Quick Icon Creation Options:

#### Option 1: Use Favicon Generator (Easiest)
1. Go to https://realfavicongenerator.net/
2. Upload a simple logo/design (500x500px recommended)
3. Configure:
   - iOS: Use iktara purple background
   - Android: Use iktara purple background
   - Set theme color to #4C3F6C
4. Download and extract all icons to this folder

#### Option 2: Use PWA Asset Generator
```bash
npm install -g pwa-asset-generator

# Create icons from a source image
pwa-asset-generator source-logo.png ./public/icons --background "#4C3F6C" --opaque false
```

#### Option 3: Use Figma/Canva
1. Create a 512x512px square
2. Background: #4C3F6C
3. Add "iktara" text in white (centered)
4. Export as PNG
5. Use an online resizer to create all sizes:
   - https://www.iloveimg.com/resize-image
   - Or https://bulkresizephotos.com/

#### Option 4: Temporary Placeholder Icons
For testing, you can use data URIs or simple colored squares.
The app will still work as a PWA, just with basic icons.

## Icon Placement

All icons should be placed in `/public/icons/` with the following names:
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

## Testing Your Icons

After adding icons:
1. Deploy to Vercel
2. Open on mobile device
3. Check browser menu for "Add to Home Screen" or "Install App"
4. Install and verify icon appears correctly

## Example SVG Logo Code (Simple)

```svg
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#4C3F6C"/>
  <text x="50%" y="50%" 
        font-family="Arial, sans-serif" 
        font-size="120" 
        font-weight="bold" 
        fill="white" 
        text-anchor="middle" 
        dominant-baseline="middle">
    iktara
  </text>
</svg>
```

Save this as `icon.svg` and convert to PNG at various sizes.
