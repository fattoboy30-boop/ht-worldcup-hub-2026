#!/usr/bin/env python3
"""
HT World Cup Hub - Free Image Scraper Agent v2
Downloads free World Cup images from Pexels (free API) and curated sources.

Usage:
    python scrape_images.py                    # Scrape all categories
    python scrape_images.py --category hero    # Scrape specific category
    python scrape_images.py --pexels-key KEY   # Use Pexels API key
"""

import os
import sys
import json
import time
import hashlib
import argparse
import urllib.request
import urllib.error
from pathlib import Path
from typing import List, Dict, Optional

# Fix Windows encoding
if sys.platform == "win32":
    import io

    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8")

# ===================== CONFIGURATION =====================
BASE_DIR = Path(__file__).parent.parent.parent / "images"
SCRAPE_LOG = Path(__file__).parent.parent.parent / "scrape_log.json"

# Curated free image URLs (CC0/Public Domain - verified working)
CURATED_IMAGES = {
    "hero": [
        {
            "url": "https://images.pexels.com/photos/1884521/pexels-photo-1884521.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
            "desc": "Stadium lights",
        },
        {
            "url": "https://images.pexels.com/photos/2100983/pexels-photo-2100983.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
            "desc": "Football on field",
        },
        {
            "url": "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
            "desc": "Stadium panorama",
        },
        {
            "url": "https://images.pexels.com/photos/4773081/pexels-photo-4773081.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
            "desc": "Soccer goal",
        },
    ],
    "news": [
        {
            "url": "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=600",
            "desc": "Stadium",
        },
        {
            "url": "https://images.pexels.com/photos/1884521/pexels-photo-1884521.jpeg?auto=compress&cs=tinysrgb&w=600",
            "desc": "Match",
        },
        {
            "url": "https://images.pexels.com/photos/2100983/pexels-photo-2100983.jpeg?auto=compress&cs=tinysrgb&w=600",
            "desc": "Football",
        },
        {
            "url": "https://images.pexels.com/photos/4773081/pexels-photo-4773081.jpeg?auto=compress&cs=tinysrgb&w=600",
            "desc": "Goal",
        },
        {
            "url": "https://images.pexels.com/photos/163444/soccer-stadium-sport-arena-163444.jpeg?auto=compress&cs=tinysrgb&w=600",
            "desc": "Arena",
        },
        {
            "url": "https://images.pexels.com/photos/37491/large-soccer-stadium.jpg?auto=compress&cs=tinysrgb&w=600",
            "desc": "Large stadium",
        },
        {
            "url": "https://images.pexels.com/photos/1860066/pexels-photo-1860066.jpeg?auto=compress&cs=tinysrgb&w=600",
            "desc": "Celebration",
        },
        {
            "url": "https://images.pexels.com/photos/163443/soccer-ball-close-up-163443.jpeg?auto=compress&cs=tinysrgb&w=600",
            "desc": "Football close",
        },
    ],
    "fixtures": [
        {
            "url": "https://images.pexels.com/photos/163444/soccer-stadium-sport-arena-163444.jpeg?auto=compress&cs=tinysrgb&w=800",
            "desc": "Stadium seats",
        },
        {
            "url": "https://images.pexels.com/photos/2100983/pexels-photo-2100983.jpeg?auto=compress&cs=tinysrgb&w=800",
            "desc": "Pitch view",
        },
        {
            "url": "https://images.pexels.com/photos/1884521/pexels-photo-1884521.jpeg?auto=compress&cs=tinysrgb&w=800",
            "desc": "Field",
        },
        {
            "url": "https://images.pexels.com/photos/37491/large-soccer-stadium.jpg?auto=compress&cs=tinysrgb&w=800",
            "desc": "Stadium aerial",
        },
    ],
    "downloads": [
        {
            "url": "https://images.pexels.com/photos/163443/soccer-ball-close-up-163443.jpeg?auto=compress&cs=tinysrgb&w=600",
            "desc": "Football",
        },
        {
            "url": "https://images.pexels.com/photos/1860066/pexels-photo-1860066.jpeg?auto=compress&cs=tinysrgb&w=600",
            "desc": "Trophy",
        },
        {
            "url": "https://images.pexels.com/photos/2100983/pexels-photo-2100983.jpeg?auto=compress&cs=tinysrgb&w=600",
            "desc": "Ball on pitch",
        },
        {
            "url": "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=600",
            "desc": "Stadium",
        },
        {
            "url": "https://images.pexels.com/photos/1884521/pexels-photo-1884521.jpeg?auto=compress&cs=tinysrgb&w=600",
            "desc": "Match day",
        },
        {
            "url": "https://images.pexels.com/photos/4773081/pexels-photo-4773081.jpeg?auto=compress&cs=tinysrgb&w=600",
            "desc": "Net",
        },
    ],
    "wallpapers": [
        {
            "url": "https://images.pexels.com/photos/1884521/pexels-photo-1884521.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
            "desc": "Stadium lights HD",
        },
        {
            "url": "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
            "desc": "Panorama HD",
        },
        {
            "url": "https://images.pexels.com/photos/2100983/pexels-photo-2100983.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
            "desc": "Field HD",
        },
        {
            "url": "https://images.pexels.com/photos/4773081/pexels-photo-4773081.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
            "desc": "Goal HD",
        },
        {
            "url": "https://images.pexels.com/photos/163444/soccer-stadium-sport-arena-163444.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
            "desc": "Arena HD",
        },
        {
            "url": "https://images.pexels.com/photos/1860066/pexels-photo-1860066.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
            "desc": "Celebration HD",
        },
    ],
    "teams": [
        {
            "url": "https://images.pexels.com/photos/1860066/pexels-photo-1860066.jpeg?auto=compress&cs=tinysrgb&w=600",
            "desc": "Team celebration",
        },
        {
            "url": "https://images.pexels.com/photos/2100983/pexels-photo-2100983.jpeg?auto=compress&cs=tinysrgb&w=600",
            "desc": "Team huddle",
        },
        {
            "url": "https://images.pexels.com/photos/1884521/pexels-photo-1884521.jpeg?auto=compress&cs=tinysrgb&w=600",
            "desc": "Team play",
        },
        {
            "url": "https://images.pexels.com/photos/4773081/pexels-photo-4773081.jpeg?auto=compress&cs=tinysrgb&w=600",
            "desc": "Team action",
        },
        {
            "url": "https://images.pexels.com/photos/163444/soccer-stadium-sport-arena-163444.jpeg?auto=compress&cs=tinysrgb&w=600",
            "desc": "Stadium",
        },
        {
            "url": "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=600",
            "desc": "Match",
        },
        {
            "url": "https://images.pexels.com/photos/163443/soccer-ball-close-up-163443.jpeg?auto=compress&cs=tinysrgb&w=600",
            "desc": "Ball",
        },
        {
            "url": "https://images.pexels.com/photos/37491/large-soccer-stadium.jpg?auto=compress&cs=tinysrgb&w=600",
            "desc": "Large stadium",
        },
        {
            "url": "https://images.pexels.com/photos/1860066/pexels-photo-1860066.jpeg?auto=compress&cs=tinysrgb&w=600",
            "desc": "Victory",
        },
        {
            "url": "https://images.pexels.com/photos/2100983/pexels-photo-2100983.jpeg?auto=compress&cs=tinysrgb&w=600",
            "desc": "Training",
        },
        {
            "url": "https://images.pexels.com/photos/1884521/pexels-photo-1884521.jpeg?auto=compress&cs=tinysrgb&w=600",
            "desc": "Warmup",
        },
        {
            "url": "https://images.pexels.com/photos/4773081/pexels-photo-4773081.jpeg?auto=compress&cs=tinysrgb&w=600",
            "desc": "Goal kick",
        },
    ],
    "flags": [
        {
            "url": "https://images.pexels.com/photos/163443/soccer-ball-close-up-163443.jpeg?auto=compress&cs=tinysrgb&w=800",
            "desc": "Football",
        },
        {
            "url": "https://images.pexels.com/photos/163444/soccer-stadium-sport-arena-163444.jpeg?auto=compress&cs=tinysrgb&w=800",
            "desc": "Stadium",
        },
        {
            "url": "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=800",
            "desc": "Arena",
        },
        {
            "url": "https://images.pexels.com/photos/1884521/pexels-photo-1884521.jpeg?auto=compress&cs=tinysrgb&w=800",
            "desc": "Pitch",
        },
    ],
}


def ensure_dirs():
    """Create image directories."""
    BASE_DIR.mkdir(parents=True, exist_ok=True)
    for cat in CURATED_IMAGES:
        (BASE_DIR / cat).mkdir(exist_ok=True)


def download_image(url: str, save_path: Path, timeout: int = 30) -> bool:
    """Download an image from URL."""
    try:
        req = urllib.request.Request(
            url,
            headers={
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
            },
        )
        with urllib.request.urlopen(req, timeout=timeout) as response:
            data = response.read()
            if len(data) < 1000:
                return False
            with open(save_path, "wb") as f:
                f.write(data)
            return True
    except Exception as e:
        print(f"    Error: {e}")
        return False


def get_file_hash(filepath: Path) -> str:
    """Get MD5 hash of file."""
    with open(filepath, "rb") as f:
        return hashlib.md5(f.read()).hexdigest()


def scrape_category(category: str, images: List[Dict]) -> List[Dict]:
    """Scrape images for a category."""
    cat_dir = BASE_DIR / category
    cat_dir.mkdir(exist_ok=True)

    results = []
    seen_hashes = set()

    print(f"\n{'=' * 55}")
    print(f"  {category.upper()} - {len(images)} images")
    print(f"{'=' * 55}")

    for i, img in enumerate(images):
        filename = f"{category}_{i + 1:02d}.jpg"
        save_path = cat_dir / filename

        if save_path.exists():
            h = get_file_hash(save_path)
            if h in seen_hashes:
                print(f"  [{i + 1}] {img['desc']} - duplicate, skip")
                continue
            seen_hashes.add(h)
            size = save_path.stat().st_size / 1024
            print(f"  [{i + 1}] {img['desc']} - exists ({size:.0f}KB)")
            results.append({"file": filename, "status": "exists", "desc": img["desc"]})
            continue

        print(f"  [{i + 1}] {img['desc']}... ", end="", flush=True)

        if download_image(img["url"], save_path):
            h = get_file_hash(save_path)
            if h in seen_hashes:
                save_path.unlink()
                print("duplicate")
                continue
            seen_hashes.add(h)
            size = save_path.stat().st_size / 1024
            print(f"OK ({size:.0f}KB)")
            results.append(
                {
                    "file": filename,
                    "status": "downloaded",
                    "desc": img["desc"],
                    "size_kb": round(size),
                }
            )
        else:
            print("FAILED")
            results.append({"file": filename, "status": "failed", "desc": img["desc"]})

        time.sleep(0.3)

    return results


def generate_svg_fallback(category: str, index: int, label: str) -> Path:
    """Generate a gradient SVG fallback."""
    cat_dir = BASE_DIR / category
    cat_dir.mkdir(exist_ok=True)

    gradients = [
        ("7B2FBE", "00D4AA"),
        ("00BFFF", "7B2FBE"),
        ("FFD700", "FF6B6B"),
        ("00D4AA", "00BFFF"),
        ("7B2FBE", "FFD700"),
        ("FF6B6B", "7B2FBE"),
    ]
    c1, c2 = gradients[index % len(gradients)]

    filename = f"{category}_{index + 1:02d}.svg"
    save_path = cat_dir / filename

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400">
  <defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" style="stop-color:#{c1}"/>
    <stop offset="100%" style="stop-color:#{c2}"/>
  </linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <text x="50%" y="45%" text-anchor="middle" fill="white" font-family="Arial" font-size="24" font-weight="bold">{label}</text>
  <text x="50%" y="60%" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-family="Arial" font-size="14">HT World Cup 2026</text>
</svg>"""

    with open(save_path, "w", encoding="utf-8") as f:
        f.write(svg)

    return save_path


def main():
    parser = argparse.ArgumentParser(description="HT World Cup Hub - Image Scraper v2")
    parser.add_argument("--category", "-c", help="Scrape specific category")
    parser.add_argument("--list", "-l", action="store_true", help="List categories")
    parser.add_argument(
        "--fallback", "-f", action="store_true", help="Generate fallback SVGs only"
    )
    args = parser.parse_args()

    if args.list:
        print("\nAvailable Categories:")
        for key, imgs in CURATED_IMAGES.items():
            print(f"  {key:12} - {len(imgs)} images")
        return

    ensure_dirs()

    print("""
=====================================================
  HT World Cup Hub - Free Image Scraper Agent v2
  Downloading curated free World Cup images
=====================================================""")

    categories = [args.category] if args.category else list(CURATED_IMAGES.keys())

    all_results = {}
    total_ok = 0
    total_fail = 0

    for cat in categories:
        if cat not in CURATED_IMAGES:
            print(f"\nUnknown category: {cat}")
            continue

        images = CURATED_IMAGES[cat]

        if args.fallback:
            print(f"\nGenerating fallback SVGs for {cat}...")
            for i, img in enumerate(images):
                path = generate_svg_fallback(cat, i, img["desc"])
                print(f"  Created: {path.name}")
            continue

        results = scrape_category(cat, images)
        all_results[cat] = results

        ok = sum(1 for r in results if r["status"] in ("downloaded", "exists"))
        fail = sum(1 for r in results if r["status"] == "failed")
        total_ok += ok
        total_fail += fail

        # Generate fallbacks for failures
        for i, r in enumerate(results):
            if r["status"] == "failed":
                generate_svg_fallback(cat, i, r["desc"])

    # Save log
    log = {"timestamp": time.strftime("%Y-%m-%dT%H:%M:%S"), "results": all_results}
    with open(SCRAPE_LOG, "w") as f:
        json.dump(log, f, indent=2)

    print(f"""
=====================================================
  SCRAPE COMPLETE
  Downloaded/Exists: {total_ok}
  Failed:            {total_fail} (SVG fallbacks)
  Location:          {BASE_DIR}
  Log:               {SCRAPE_LOG}
=====================================================""")


if __name__ == "__main__":
    main()
