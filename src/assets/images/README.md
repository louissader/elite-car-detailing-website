# Image Assets Directory

This directory contains all images for the Elite Detailing website.

## Folder Structure

### `/team` - Professional Team Photos
Place professional headshots and team photos here.

**Recommended specs:**
- Format: JPG or PNG
- Size: 800x800px (square) for headshots
- Resolution: 72-150 DPI (web optimized)
- File naming: `firstname-lastname.jpg` (e.g., `john-doe.jpg`)

**Example files:**
- `john-smith.jpg` - CEO/Founder headshot
- `jane-doe.jpg` - Lead detailer headshot
- `team-photo.jpg` - Group photo

---

### `/cars` - Luxury Auto Detailing Photos
Place before/after photos and showcase images of detailed luxury cars here.

**Recommended specs:**
- Format: JPG (for photos)
- Size: 1920x1080px (landscape) or 1080x1920px (portrait)
- Resolution: 72-150 DPI (web optimized)
- File naming: `[vehicle]-[type]-[number].jpg`

**Example files:**
- `ferrari-488-before-1.jpg`
- `ferrari-488-after-1.jpg`
- `lamborghini-aventador-detail-1.jpg`
- `porsche-911-ceramic-coating.jpg`
- `range-rover-interior-before.jpg`
- `range-rover-interior-after.jpg`

**Suggested vehicles to photograph:**
- Ferrari, Lamborghini, Porsche (exotic sports cars)
- Mercedes, BMW, Audi (luxury sedans)
- Range Rover, Escalade (luxury SUVs)
- Tesla Model S, Lucid Air (luxury EVs)

---

### `/jets` - Private Jet Detailing Photos
Place before/after photos and showcase images of detailed private jets here.

**Recommended specs:**
- Format: JPG (for photos)
- Size: 1920x1080px (landscape preferred)
- Resolution: 72-150 DPI (web optimized)
- File naming: `[aircraft-model]-[type]-[number].jpg`

**Example files:**
- `gulfstream-g650-exterior-before-1.jpg`
- `gulfstream-g650-exterior-after-1.jpg`
- `citation-x-interior-detail.jpg`
- `bombardier-global-7500-cabin.jpg`
- `cessna-citation-exterior.jpg`

**Suggested aircraft to photograph:**
- Gulfstream G650, G550 (large business jets)
- Bombardier Global 7500, 6000
- Cessna Citation X, CJ3+
- Embraer Phenom 300, Legacy 650

---

## Image Optimization Tips

Before adding images to this folder:

1. **Compress images** to reduce file size without losing quality
   - Use tools like TinyPNG, ImageOptim, or Squoosh
   - Target: <500KB per image for fast loading

2. **Resize to web dimensions**
   - Don't upload 4K+ images (they'll slow down the site)
   - Max width: 1920px for hero images, 1200px for gallery

3. **Use descriptive filenames**
   - Good: `porsche-911-paint-correction-after.jpg`
   - Bad: `IMG_1234.jpg`

4. **Consistent naming convention**
   - Lowercase letters
   - Hyphens instead of spaces
   - Include vehicle/aircraft type and detail type

---

## How Images Are Used

- **Team photos**: About page, testimonials section
- **Car photos**: Homepage hero, services page, gallery, before/after comparisons
- **Jet photos**: Homepage hero, services page, gallery, before/after comparisons

---

## Next Steps

After adding images:
1. Place images in the appropriate folders
2. Update the component imports to use real images instead of placeholders
3. Images will automatically be optimized by Vite during build
