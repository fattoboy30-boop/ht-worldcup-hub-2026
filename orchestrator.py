#!/usr/bin/env python3
"""
HT World Cup Hub - Site Orchestrator Agent
Checks site integrity, verifies content, and reports issues.
Run: python orchestrator.py
"""

import os
import re
import json
import sys
import io
from datetime import datetime, timedelta
from pathlib import Path

# Force UTF-8 output on Windows
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

# Configuration
REPO_ROOT = r"C:\Users\Owner\Desktop\HT Worldcup hub"
REQUIRED_FILES = [
    "index.html",
    "css/style.css",
    "js/app.js",
    "js/data.js",
    "images/HT LOGO.jpg",
    "images/hero-banner.png",
    "images/countdown-card.png",
    "images/groups-overview.png",
    "images/solomon-bonitos.png",
    "images/matchday-card.png",
    "images/facebook-cover.png",
    "images/twitter-header.png",
    "downloads/world-cup-2026-schedule.html",
    "downloads/prediction-bracket.html",
    "downloads/matchday-bingo.html",
    "downloads/world-cup-trivia.html",
]


class Colors:
    GREEN = "\033[92m"
    RED = "\033[91m"
    YELLOW = "\033[93m"
    CYAN = "\033[96m"
    BOLD = "\033[1m"
    END = "\033[0m"


def print_header(text):
    print(f"\n{Colors.BOLD}{Colors.CYAN}{'=' * 60}{Colors.END}")
    print(f"{Colors.BOLD}{Colors.CYAN}  {text}{Colors.END}")
    print(f"{Colors.BOLD}{Colors.CYAN}{'=' * 60}{Colors.END}")


def print_check(name, status, detail=""):
    icon = f"{Colors.GREEN}✓{Colors.END}" if status else f"{Colors.RED}✗{Colors.END}"
    msg = f"  {icon} {name}"
    if detail:
        msg += f" {Colors.YELLOW}- {detail}{Colors.END}"
    print(msg)


def check_files():
    """Check all required files exist"""
    print_header("FILE INTEGRITY CHECK")
    missing = []
    for f in REQUIRED_FILES:
        path = os.path.join(REPO_ROOT, f)
        exists = os.path.exists(path)
        print_check(
            f, exists, "MISSING" if not exists else f"{os.path.getsize(path):,} bytes"
        )
        if not exists:
            missing.append(f)
    return missing


def check_images():
    """Verify all images are valid"""
    print_header("IMAGE VALIDATION")
    images_dir = os.path.join(REPO_ROOT, "images")
    issues = []
    for img in os.listdir(images_dir):
        path = os.path.join(images_dir, img)
        size = os.path.getsize(path)
        valid = size > 1000  # At least 1KB
        size_str = f"{size:,} bytes"
        if size < 10000:
            size_str += f" {Colors.YELLOW}(small){Colors.END}"
        print_check(img, valid, size_str)
        if not valid:
            issues.append(f"Image too small: {img}")
    return issues


def check_html():
    """Validate HTML structure"""
    print_header("HTML STRUCTURE CHECK")
    issues = []
    path = os.path.join(REPO_ROOT, "index.html")
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    checks = [
        ("DOCTYPE", "<!DOCTYPE html>" in content),
        ("<html> tag", "<html" in content and "</html>" in content),
        ("<head> tag", "<head>" in content and "</head>" in content),
        ("<body> tag", "<body>" in content and "</body>" in content),
        ("Title tag", "<title>" in content and "</title>" in content),
        ("Meta viewport", "viewport" in content),
        ("CSS linked", "css/style.css" in content),
        ("JS linked", "js/data.js" in content and "js/app.js" in content),
        ("Header section", 'class="header"' in content),
        ("Hero section", 'id="home"' in content),
        ("News section", 'id="news"' in content),
        ("Fixtures section", 'id="fixtures"' in content),
        ("Downloads section", 'id="downloads"' in content),
        ("Wallpapers section", 'id="galleries"' in content),
        ("Footer", 'class="footer"' in content),
    ]

    for name, ok in checks:
        print_check(name, ok)
        if not ok:
            issues.append(f"HTML missing: {name}")

    return issues


def check_css():
    """Check CSS variables and key styles"""
    print_header("CSS STYLES CHECK")
    issues = []
    path = os.path.join(REPO_ROOT, "css/style.css")
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    required_vars = [
        "--primary",
        "--secondary",
        "--accent",
        "--gold",
        "--dark",
        "--darker",
        "--darkest",
        "--white",
        "--text",
        "--text-muted",
    ]

    for var in required_vars:
        found = var in content
        print_check(f"Variable {var}", found)
        if not found:
            issues.append(f"CSS missing variable: {var}")

    key_selectors = [
        ".header",
        ".hero",
        ".nav-link",
        ".countdown",
        ".news-card",
        ".fixture-item",
        ".download-card",
        ".wallpaper-card",
        ".poll-card",
        ".footer",
    ]

    for sel in key_selectors:
        found = sel in content
        print_check(f"Selector {sel}", found)
        if not found:
            issues.append(f"CSS missing selector: {sel}")

    return issues


def check_js():
    """Check JavaScript functions"""
    print_header("JAVASCRIPT CHECK")
    issues = []
    path = os.path.join(REPO_ROOT, "js/app.js")
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    required_functions = [
        "initParticles",
        "initCountdown",
        "initScrollReveal",
        "initNews",
        "initFixtures",
        "initDownloads",
        "initPolls",
        "initMobileMenu",
        "initNavigation",
        "initTicker",
    ]

    for func in required_functions:
        found = f"function {func}" in content
        print_check(f"Function {func}()", found)
        if not found:
            issues.append(f"JS missing function: {func}")

    return issues


def check_data():
    """Validate data.js content"""
    print_header("DATA VALIDATION")
    issues = []
    path = os.path.join(REPO_ROOT, "js/data.js")
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Check tournament info
    print_check("Tournament name", "FIFA World Cup 2026" in content)
    print_check("Start date", "2026-06-11" in content)
    print_check("48 teams", "totalTeams: 48" in content)
    print_check("104 matches", "totalMatches: 104" in content)

    # Count groups
    groups = re.findall(r'"([A-L])":\s*[\[{]', content)
    print_check(f"All 12 groups (A-L)", len(groups) == 12, f"Found {len(groups)}")
    if len(groups) != 12:
        issues.append(f"Expected 12 groups, found {len(groups)}")

    # Count fixtures
    fixtures = re.findall(r'stage:\s*"group"', content)
    print_check(f"72+ group fixtures", len(fixtures) >= 72, f"Found {len(fixtures)}")
    if len(fixtures) < 72:
        issues.append(f"Expected 72+ group fixtures, found {len(fixtures)}")

    # Check teams in each group
    group_teams = {
        "A": ["Mexico", "South Africa", "Korea Republic", "Czechia"],
        "B": ["Canada", "Bosnia and Herzegovina", "Qatar", "Switzerland"],
        "C": ["Brazil", "Morocco", "Haiti", "Scotland"],
        "D": ["USA", "Paraguay", "Australia", "Türkiye"],
        "E": ["Germany", "Curaçao", "Côte d'Ivoire", "Ecuador"],
        "F": ["Netherlands", "Japan", "Sweden", "Tunisia"],
        "G": ["Belgium", "Egypt", "IR Iran", "New Zealand"],
        "H": ["Spain", "Cabo Verde", "Saudi Arabia", "Uruguay"],
        "I": ["France", "Senegal", "Iraq", "Norway"],
        "J": ["Argentina", "Algeria", "Austria", "Jordan"],
        "K": ["Portugal", "Congo DR", "Uzbekistan", "Colombia"],
        "L": ["England", "Croatia", "Ghana", "Panama"],
    }

    all_found = True
    for group, teams in group_teams.items():
        for team in teams:
            if team not in content:
                print_check(f"Group {group}: {team}", False, "MISSING")
                all_found = False
                issues.append(f"Missing team: {team}")
            else:
                print_check(f"Group {group}: {team}", True)

    # Check news count
    news = re.findall(r'title:\s*"', content)
    print_check(f"12+ news items", len(news) >= 12, f"Found {len(news)}")

    # Check downloads count
    downloads = re.findall(r'type:\s*"(PDF|ZIP|HTML)"', content)
    print_check(f"6+ downloads", len(downloads) >= 6, f"Found {len(downloads)}")

    # Check last updated date
    print_check("Last updated timestamp", "lastUpdated:" in content)

    return issues


def check_index_images():
    """Check that index.html references existing local images"""
    print_header("IMAGE REFERENCES CHECK")
    issues = []

    html_path = os.path.join(REPO_ROOT, "index.html")
    with open(html_path, "r", encoding="utf-8") as f:
        html = f.read()

    # Find all local image references
    local_refs = re.findall(r'src="(images/[^"]+)"', html)
    local_refs += re.findall(r'href="(images/[^"]+)"', html)

    for ref in set(local_refs):
        path = os.path.join(REPO_ROOT, ref)
        exists = os.path.exists(path)
        print_check(ref, exists)
        if not exists:
            issues.append(f"Broken image reference: {ref}")

    return issues


def check_ticker():
    """Verify ticker has recent content"""
    print_header("TICKER CONTENT CHECK")
    issues = []

    html_path = os.path.join(REPO_ROOT, "index.html")
    with open(html_path, "r", encoding="utf-8") as f:
        html = f.read()

    ticker_items = re.findall(r'class="ticker-item">(.*?)<', html)
    print_check(f"Ticker items", len(ticker_items) >= 5, f"Found {len(ticker_items)}")

    has_june = any("June" in item or "JUNE" in item for item in ticker_items)
    print_check("Current date reference (June 2026)", has_june)

    has_48 = any("48" in item for item in ticker_items)
    print_check("48 teams mentioned", has_48)

    return issues


def check_countdown():
    """Verify countdown is set correctly"""
    print_header("COUNTDOWN CHECK")
    issues = []

    data_path = os.path.join(REPO_ROOT, "js/data.js")
    with open(data_path, "r", encoding="utf-8") as f:
        content = f.read()

    start_match = re.search(r'startDate:\s*"([^"]+)"', content)
    if start_match:
        start_str = start_match.group(1)
        try:
            start_date = datetime.fromisoformat(
                start_str.replace("Z", "+00:00").replace("-04:00", "")
            )
            now = datetime.now()
            days_left = (start_date - now).days
            print_check(f"Start date: {start_str}", True)
            print_check(f"Days until kickoff", days_left >= 0, f"{days_left} days")
            if days_left < 0:
                print(
                    f"    {Colors.YELLOW}⚠ Tournament has already started!{Colors.END}"
                )
        except:
            print_check("Start date parse", False, "Could not parse")
    else:
        print_check("Start date found", False)
        issues.append("Missing startDate in data.js")

    return issues


def run_all_checks():
    """Run all checks and generate report"""
    print(f"\n{Colors.BOLD}{Colors.CYAN}{'#' * 60}{Colors.END}")
    print(
        f"{Colors.BOLD}{Colors.CYAN}  HT WORLD CUP HUB - ORCHESTRATOR AGENT{Colors.END}"
    )
    print(
        f"{Colors.BOLD}{Colors.CYAN}  {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}{Colors.END}"
    )
    print(f"{Colors.BOLD}{Colors.CYAN}{'#' * 60}{Colors.END}")

    all_issues = []

    all_issues.extend(check_files())
    all_issues.extend(check_images())
    all_issues.extend(check_html())
    all_issues.extend(check_css())
    all_issues.extend(check_js())
    all_issues.extend(check_data())
    all_issues.extend(check_index_images())
    all_issues.extend(check_ticker())
    all_issues.extend(check_countdown())

    # Summary
    print_header("SUMMARY REPORT")

    if not all_issues:
        print(
            f"\n  {Colors.GREEN}{Colors.BOLD}✓ ALL CHECKS PASSED - HUB IS FULLY OPERATIONAL{Colors.END}\n"
        )
        print(f"  {Colors.CYAN}Site ready for deployment at:{Colors.END}")
        print(f"  https://fattoboy30-boop.github.io/ht-worldcup-hub-2026/\n")
    else:
        print(
            f"\n  {Colors.RED}{Colors.BOLD}✗ FOUND {len(all_issues)} ISSUE(S):{Colors.END}\n"
        )
        for i, issue in enumerate(all_issues, 1):
            print(f"  {Colors.RED}{i}. {issue}{Colors.END}")
        print()

    return len(all_issues) == 0


if __name__ == "__main__":
    success = run_all_checks()
    sys.exit(0 if success else 1)
