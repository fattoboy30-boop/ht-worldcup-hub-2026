# Image Scraper Agent - Configuration

## Role
Scrape free, legal World Cup 2026 images from the internet for the HT World Cup Hub website.

## Sources
All images come from free, CC0/Public Domain sources:
- **Unsplash** - Free high-quality photos (unsplash.com/license)
- **Pexels** - Free stock photos (pexels.com/license)
- **Pixabay** - Free images (pixabay.com/service/license)

## Categories
| Category | Images | Purpose |
|----------|--------|---------|
| hero | 4 | Hero banners, stadium shots |
| news | 8 | News card backgrounds |
| fixtures | 4 | Fixture section graphics |
| downloads | 6 | Download card images |
| wallpapers | 6 | Phone/desktop wallpapers |
| teams | 12 | Team photos |
| flags | 4 | Flag graphics |

## Usage
```bash
# Scrape all categories
python automation/scripts/scrape_images.py

# Scrape specific category
python automation/scripts/scrape_images.py --category hero

# List categories
python automation/scripts/scrape_images.py --list

# Generate fallback SVGs only
python automation/scripts/scrape_images.py --fallback
```

## Output
Images saved to: `images/{category}/`
Manifest: `images/manifest.json`
Log: `scrape_log.json`

## Fallback
If download fails, SVG gradient placeholders are generated automatically.
These match the HT brand colors (purple #7B2FBE, teal #00D4AA, gold #FFD700).

## Agent Invocation
To use with OpenCode agents:
```bash
# Run the scraper
/scrape-images

# Or via orchestrator
python automation/scripts/scrape_images.py --all
```
