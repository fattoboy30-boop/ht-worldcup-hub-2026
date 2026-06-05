#!/usr/bin/env python3
"""
HT World Cup Hub - Combined Content Pipeline
Open Design: News Agent + Image Agent working together

Usage:
    python run_pipeline.py              # Full pipeline
    python run_pipeline.py --step news  # News only
    python run_pipeline.py --step images # Images only
    python run_pipeline.py --step deploy # Deploy only
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
from datetime import datetime

# Fix Windows encoding
if sys.platform == "win32":
    import io

    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8")

BASE_DIR = Path(__file__).parent.parent.parent
DATA_JS = BASE_DIR / "js" / "data.js"
IMAGES_DIR = BASE_DIR / "images"
NEWS_DIR = IMAGES_DIR / "news"


# ===================== NEWS AGENT =====================
class NewsAgent:
    """Scrapes latest World Cup news from web sources."""

    QUERIES = [
        "FIFA World Cup 2026 news today",
        "World Cup 2026 squads confirmed",
        "World Cup 2026 injury updates",
        "World Cup 2026 fixtures schedule",
        "World Cup 2026 tickets news",
    ]

    TAGS = [
        "Breaking",
        "Squad",
        "Injury",
        "FIFA Update",
        "Friendly",
        "Team News",
        "Visa News",
    ]

    def scrape_news(self):
        """Scrape latest news (simulated - in production uses websearch)."""
        print("\n{'='*55}")
        print("  NEWS AGENT - Scraping Latest World Cup News")
        print("{'='*55}")

        # In production, this would call websearch API
        # For now, return template news items
        news_items = [
            {
                "id": 301,
                "title": "World Cup 2026 Countdown: 5 Days to Go!",
                "summary": "The biggest World Cup in history kicks off June 11 in USA, Mexico and Canada. 48 teams, 104 matches, 16 cities across three nations.",
                "tag": "Breaking",
                "date": datetime.now().strftime("%B %d, %Y"),
                "keywords": ["countdown", "world cup", "opening"],
            },
            {
                "id": 302,
                "title": "All 48 Squads Confirmed - 1,248 Players Ready",
                "summary": "FIFA confirms final squad lists from all 48 nations. Record 1,248 players representing 449 clubs from 71 countries.",
                "tag": "Squad",
                "date": datetime.now().strftime("%B %d, %Y"),
                "keywords": ["squads", "players", "teams"],
            },
            {
                "id": 303,
                "title": "Opening Match: Mexico vs South Africa",
                "summary": "Mexico hosts South Africa at Estadio Azteca in the opening match of World Cup 2026 on June 11.",
                "tag": "Breaking",
                "date": datetime.now().strftime("%B %d, %Y"),
                "keywords": ["mexico", "south africa", "opening match"],
            },
        ]

        print(f"  Found {len(news_items)} news items")
        return news_items

    def format_for_datajs(self, items):
        """Format news items for data.js."""
        formatted = []
        for item in items:
            formatted.append(
                {
                    "id": item["id"],
                    "title": item["title"],
                    "summary": item["summary"],
                    "tag": item["tag"],
                    "date": item["date"],
                    "image": item.get("image", "news/news_01.jpg"),
                }
            )
        return formatted


# ===================== IMAGE AGENT =====================
class ImageAgent:
    """Manages images for the hub."""

    # Free Pexels images (verified working)
    NEWS_IMAGES = {
        "countdown": "https://images.pexels.com/photos/1884521/pexels-photo-1884521.jpeg?auto=compress&cs=tinysrgb&w=600",
        "squads": "https://images.pexels.com/photos/1860066/pexels-photo-1860066.jpeg?auto=compress&cs=tinysrgb&w=600",
        "opening": "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=600",
        "match": "https://images.pexels.com/photos/2100983/pexels-photo-2100983.jpeg?auto=compress&cs=tinysrgb&w=600",
        "goal": "https://images.pexels.com/photos/4773081/pexels-photo-4773081.jpeg?auto=compress&cs=tinysrgb&w=600",
        "celebration": "https://images.pexels.com/photos/1860066/pexels-photo-1860066.jpeg?auto=compress&cs=tinysrgb&w=600",
        "training": "https://images.pexels.com/photos/2100983/pexels-photo-2100983.jpeg?auto=compress&cs=tinysrgb&w=600",
        "stadium": "https://images.pexels.com/photos/1884521/pexels-photo-1884521.jpeg?auto=compress&cs=tinysrgb&w=600",
    }

    def find_match(self, keywords):
        """Find best matching image for keywords."""
        for keyword in keywords:
            keyword_lower = keyword.lower()
            for key, url in self.NEWS_IMAGES.items():
                if key in keyword_lower or keyword_lower in key:
                    return key
        return "match"  # Default

    def download_image(self, url, save_path):
        """Download image from URL."""
        try:
            req = urllib.request.Request(
                url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
            )
            with urllib.request.urlopen(req, timeout=30) as response:
                data = response.read()
                if len(data) > 1000:
                    with open(save_path, "wb") as f:
                        f.write(data)
                    return True
        except Exception as e:
            print(f"    Download failed: {e}")
        return False

    def ensure_images(self, news_items):
        """Ensure all news items have matching images."""
        print("\n{'='*55}")
        print("  IMAGE AGENT - Matching Visuals to News")
        print("{'='*55}")

        NEWS_DIR.mkdir(parents=True, exist_ok=True)

        for item in news_items:
            keywords = item.get("keywords", [item["title"].lower()])
            match = self.find_match(keywords)
            url = self.NEWS_IMAGES.get(match, self.NEWS_IMAGES["match"])

            filename = f"news_{item['id'] % 100:02d}.jpg"
            save_path = NEWS_DIR / filename

            if save_path.exists():
                print(
                    f"  [{item['id']}] {item['title'][:40]}... -> {filename} (exists)"
                )
                item["image"] = f"news/{filename}"
                continue

            print(
                f"  [{item['id']}] {item['title'][:40]}... -> {filename}...",
                end=" ",
                flush=True,
            )

            if self.download_image(url, save_path):
                size = save_path.stat().st_size / 1024
                print(f"OK ({size:.0f}KB)")
                item["image"] = f"news/{filename}"
            else:
                print("FAILED - using fallback")
                item["image"] = "news/news_01.jpg"  # Default fallback

        return news_items


# ===================== ORCHESTRATOR =====================
class ContentOrchestrator:
    """Combines News + Image agents and deploys."""

    def __init__(self):
        self.news_agent = NewsAgent()
        self.image_agent = ImageAgent()

    def run_pipeline(self, step=None):
        """Run the full content pipeline."""
        print("""
=====================================================
  HT World Cup Hub - Content Pipeline (Open Design)
  News Agent + Image Agent + Orchestrator
=====================================================
""")

        if step == "news" or step is None:
            news_items = self.news_agent.scrape_news()
        else:
            news_items = self.load_existing_news()

        if step == "images" or step is None:
            news_items = self.image_agent.ensure_images(news_items)

        if step is None:
            self.update_data_js(news_items)

        if step == "deploy" or step is None:
            self.deploy()

        print("\n=====================================================")
        print("  PIPELINE COMPLETE")
        print("=====================================================")

    def load_existing_news(self):
        """Load existing news from data.js."""
        print("\n  Loading existing news from data.js...")
        # Simplified - in production would parse data.js
        return []

    def update_data_js(self, news_items):
        """Update data.js with new news items."""
        print("\n{'='*55}")
        print("  ORCHESTRATOR - Updating data.js")
        print("{'='*55}")

        if not DATA_JS.exists():
            print("  data.js not found, skipping update")
            return

        formatted = self.news_agent.format_for_datajs(news_items)

        # Read existing data.js
        with open(DATA_JS, "r", encoding="utf-8") as f:
            content = f.read()

        # Find news array and update
        # This is a simplified approach - in production would use AST parsing
        print(f"  Would update {len(formatted)} news items in data.js")
        print("  (Full implementation requires JS parsing)")

        # Update timestamp
        timestamp = datetime.now().strftime("%Y-%m-%dT%H:%M:%S.000Z")
        content = content.replace('lastUpdated: "', f'lastUpdated: "{timestamp[:-8]}')

        with open(DATA_JS, "w", encoding="utf-8") as f:
            f.write(content)

        print(f"  Updated lastUpdated timestamp: {timestamp}")

    def deploy(self):
        """Deploy to GitHub Pages."""
        print("\n{'='*55}")
        print("  ORCHESTRATOR - Deploying to GitHub Pages")
        print("{'='*55}")

        import subprocess

        commands = [
            ("git", ["add", "."]),
            (
                "git",
                [
                    "commit",
                    "-m",
                    f"Content update: {datetime.now().strftime('%Y-%m-%d %H:%M')}",
                ],
            ),
            ("git", ["push", "origin", "master"]),
        ]

        # Check if gh-pages branch exists
        result = subprocess.run(
            ["git", "branch", "--list", "gh-pages"],
            capture_output=True,
            text=True,
            cwd=str(BASE_DIR),
        )

        if "gh-pages" in result.stdout:
            commands.extend(
                [
                    ("git", ["checkout", "gh-pages"]),
                    ("git", ["merge", "master"]),
                    ("git", ["push", "origin", "gh-pages"]),
                    ("git", ["checkout", "master"]),
                ]
            )

        for cmd, args in commands:
            print(f"  Running: {' '.join([cmd] + args)}")
            result = subprocess.run(
                [cmd] + args, capture_output=True, text=True, cwd=str(BASE_DIR)
            )
            if result.returncode != 0:
                print(f"  Warning: {result.stderr}")


# ===================== MAIN =====================
def main():
    parser = argparse.ArgumentParser(description="HT World Cup Hub - Content Pipeline")
    parser.add_argument(
        "--step", choices=["news", "images", "deploy"], help="Run specific step"
    )
    args = parser.parse_args()

    orchestrator = ContentOrchestrator()
    orchestrator.run_pipeline(args.step)


if __name__ == "__main__":
    main()
