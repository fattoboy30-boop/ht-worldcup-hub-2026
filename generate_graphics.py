#!/usr/bin/env python3
"""Generate graphics for HT World Cup 2026 Hub"""

from PIL import Image, ImageDraw, ImageFont
import math
import os

OUTPUT_DIR = r"C:\Users\Owner\Desktop\HT Worldcup hub\images"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Color palette
PURPLE = (123, 47, 190)
PURPLE_DARK = (90, 31, 142)
TEAL = (0, 212, 170)
GOLD = (255, 215, 0)
DARK = (26, 26, 46)
DARKER = (15, 15, 26)
WHITE = (255, 255, 255)
ACCENT = (0, 191, 255)


def create_gradient(size, color1, color2, direction="horizontal"):
    """Create a gradient image"""
    img = Image.new("RGB", size)
    draw = ImageDraw.Draw(img)
    w, h = size
    for i in range(w if direction == "horizontal" else h):
        ratio = i / (w if direction == "horizontal" else h)
        r = int(color1[0] + (color2[0] - color1[0]) * ratio)
        g = int(color1[1] + (color2[1] - color1[1]) * ratio)
        b = int(color1[2] + (color2[2] - color1[2]) * ratio)
        if direction == "horizontal":
            draw.line([(i, 0), (i, h)], fill=(r, g, b))
        else:
            draw.line([(0, i), (w, i)], fill=(r, g, b))
    return img


def draw_circle(draw, center, radius, fill, alpha=255):
    """Draw a circle with optional transparency"""
    x, y = center
    draw.ellipse([x - radius, y - radius, x + radius, y + radius], fill=fill)


def draw_star(draw, center, size, fill):
    """Draw a 5-pointed star"""
    cx, cy = center
    points = []
    for i in range(10):
        angle = math.radians(i * 36 - 90)
        r = size if i % 2 == 0 else size * 0.4
        points.append((cx + r * math.cos(angle), cy + r * math.sin(angle)))
    draw.polygon(points, fill=fill)


def create_hero_banner():
    """Create main hero banner (1920x1080)"""
    width, height = 1920, 1080
    img = Image.new("RGB", (width, height), DARKER)
    draw = ImageDraw.Draw(img)

    # Background gradient
    for y in range(height):
        ratio = y / height
        r = int(DARKER[0] + (PURPLE_DARK[0] - DARKER[0]) * ratio * 0.5)
        g = int(DARKER[1] + (PURPLE_DARK[1] - DARKER[1]) * ratio * 0.3)
        b = int(DARKER[2] + (PURPLE_DARK[2] - DARKER[2]) * ratio * 0.5)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    # Geometric pattern - diagonal lines
    for i in range(-height, width + height, 80):
        draw.line(
            [(i, 0), (i + height, height)],
            fill=(PURPLE[0], PURPLE[1], PURPLE[2], 15),
            width=1,
        )

    # Glowing circles (stadium lights effect)
    for _ in range(15):
        x = int(width * (0.1 + 0.8 * (hash(str(_)) % 100) / 100))
        y = int(height * (0.1 + 0.8 * (hash(str(_ + 50)) % 100) / 100))
        r = int(30 + 80 * (hash(str(_ + 100)) % 100) / 100)
        for ring in range(r, 0, -2):
            alpha = int(20 * (ring / r))
            color = (TEAL[0], TEAL[1], TEAL[2])
            draw.ellipse([x - ring, y - ring, x + ring, y + ring], outline=color)

    # Central geometric accent
    cx, cy = width // 2, height // 2
    # Large circle
    for r in range(200, 180, -1):
        draw.ellipse(
            [cx - r, cy - r, cx + r, cy + r], outline=(PURPLE[0], PURPLE[1], PURPLE[2])
        )

    # Hexagonal pattern
    for angle in range(0, 360, 60):
        rad = math.radians(angle)
        x1 = cx + 160 * math.cos(rad)
        y1 = cy + 160 * math.sin(rad)
        x2 = cx + 160 * math.cos(rad + math.radians(60))
        y2 = cy + 160 * math.sin(rad + math.radians(60))
        draw.line([(x1, y1), (x2, y2)], fill=TEAL, width=2)

    # Trophy silhouette (simplified)
    # Cup body
    trophy_y = cy - 30
    draw.ellipse([cx - 60, trophy_y - 80, cx + 60, trophy_y + 10], fill=GOLD)
    draw.rectangle([cx - 40, trophy_y - 10, cx + 40, trophy_y + 40], fill=GOLD)
    # Base
    draw.rectangle([cx - 50, trophy_y + 40, cx + 50, trophy_y + 55], fill=GOLD)
    draw.rectangle([cx - 35, trophy_y + 55, cx + 35, trophy_y + 70], fill=GOLD)
    # Handles
    draw.arc([cx - 90, trophy_y - 70, cx - 50, trophy_y], 270, 90, fill=GOLD, width=4)
    draw.arc([cx + 50, trophy_y - 70, cx + 90, trophy_y], 90, 270, fill=GOLD, width=4)

    # Stars around trophy
    star_positions = [
        (cx - 120, cy - 100),
        (cx + 120, cy - 100),
        (cx - 100, cy + 80),
        (cx + 100, cy + 80),
    ]
    for pos in star_positions:
        draw_star(draw, pos, 12, GOLD)

    # Text areas (dark overlays for text)
    draw.rectangle([0, 0, width, 120], fill=(DARKER[0], DARKER[1], DARKER[2]))
    draw.rectangle(
        [0, height - 100, width, height], fill=(DARKER[0], DARKER[1], DARKER[2])
    )

    # Accent lines
    draw.line([(0, 120), (width, 120)], fill=TEAL, width=3)
    draw.line([(0, height - 100), (width, height - 100)], fill=PURPLE, width=3)

    # Corner accents
    for corner in [
        (50, 50),
        (width - 50, 50),
        (50, height - 50),
        (width - 50, height - 50),
    ]:
        draw_star(draw, corner, 8, GOLD)

    img.save(os.path.join(OUTPUT_DIR, "hero-banner.png"), "PNG")
    print("Created hero-banner.png")


def create_countdown_card():
    """Create social media countdown card (1080x1080)"""
    size = 1080
    img = Image.new("RGB", (size, size), DARKER)
    draw = ImageDraw.Draw(img)

    # Background gradient
    for y in range(size):
        ratio = y / size
        r = int(DARKER[0] + (PURPLE_DARK[0] - DARKER[0]) * ratio * 0.4)
        g = int(DARKER[1] + (PURPLE_DARK[1] - DARKER[1]) * ratio * 0.2)
        b = int(DARKER[2] + (PURPLE_DARK[2] - DARKER[2]) * ratio * 0.4)
        draw.line([(0, y), (size, y)], fill=(r, g, b))

    # Border glow
    for i in range(20):
        alpha = int(255 * (1 - i / 20))
        color = (TEAL[0], TEAL[1], TEAL[2])
        draw.rectangle([i, i, size - i, size - i], outline=color)

    # Central design
    cx, cy = size // 2, size // 2

    # Concentric circles
    for r in range(300, 100, -20):
        draw.ellipse(
            [cx - r, cy - r, cx + r, cy + r], outline=(PURPLE[0], PURPLE[1], PURPLE[2])
        )

    # Trophy icon
    trophy_y = cy - 80
    draw.ellipse([cx - 80, trophy_y - 100, cx + 80, trophy_y + 15], fill=GOLD)
    draw.rectangle([cx - 55, trophy_y + 15, cx + 55, trophy_y + 70], fill=GOLD)
    draw.rectangle([cx - 70, trophy_y + 70, cx + 70, trophy_y + 90], fill=GOLD)
    draw.rectangle([cx - 50, trophy_y + 90, cx + 50, trophy_y + 110], fill=GOLD)

    # Football pattern on trophy
    draw.ellipse([cx - 20, trophy_y - 40, cx + 20, trophy_y], fill=DARKER)

    # Stars
    star_positions = [
        (cx - 150, trophy_y - 60),
        (cx + 150, trophy_y - 60),
        (cx, trophy_y - 140),
        (cx - 100, trophy_y + 140),
        (cx + 100, trophy_y + 140),
    ]
    for pos in star_positions:
        draw_star(draw, pos, 15, GOLD)

    # Bottom accent bar
    draw.rectangle([100, size - 180, size - 100, size - 160], fill=TEAL)

    img.save(os.path.join(OUTPUT_DIR, "countdown-card.png"), "PNG")
    print("Created countdown-card.png")


def create_group_overview():
    """Create groups overview graphic (1200x800)"""
    width, height = 1200, 800
    img = Image.new("RGB", (width, height), DARKER)
    draw = ImageDraw.Draw(img)

    # Background
    for y in range(height):
        ratio = y / height
        b_val = int(DARKER[2] + (PURPLE_DARK[2] - DARKER[2]) * ratio * 0.3)
        draw.line([(0, y), (width, y)], fill=(DARKER[0], DARKER[1], b_val))

    # Grid of groups
    groups = [
        ["A", "MEX", "RSA", "KOR", "CZE"],
        ["B", "CAN", "BIH", "QAT", "SUI"],
        ["C", "BRA", "MAR", "HAI", "SCO"],
        ["D", "USA", "PAR", "AUS", "TUR"],
        ["E", "GER", "CUW", "CIV", "ECU"],
        ["F", "NED", "JPN", "SWE", "TUN"],
        ["G", "BEL", "EGY", "IRN", "NZL"],
        ["H", "ESP", "CPV", "KSA", "URU"],
        ["I", "FRA", "SEN", "IRQ", "NOR"],
        ["J", "ARG", "ALG", "AUT", "JOR"],
        ["K", "POR", "COD", "UZB", "COL"],
        ["L", "ENG", "CRO", "GHA", "PAN"],
    ]

    # Title area
    draw.rectangle([0, 0, width, 80], fill=PURPLE)
    # Draw title text manually as blocks
    draw.rectangle([50, 20, 400, 60], fill=WHITE)  # Placeholder for title

    # Group cards - 4 columns, 3 rows
    card_w, card_h = 270, 190
    margin = 15
    start_x, start_y = 30, 100

    colors = [PURPLE, TEAL, ACCENT, GOLD]

    for idx, group in enumerate(groups):
        col = idx % 4
        row = idx // 4
        x = start_x + col * (card_w + margin)
        y = start_y + row * (card_h + margin)

        # Card background
        draw.rectangle(
            [x, y, x + card_w, y + card_h], fill=(30, 30, 55), outline=(60, 60, 90)
        )

        # Group header
        draw.rectangle([x, y, x + card_w, y + 35], fill=PURPLE)

        # Teams
        for t_idx, team in enumerate(group):
            ty = y + 45 + t_idx * 38
            if t_idx == 0:  # Group letter
                draw.rectangle([x + 5, ty, x + 35, ty + 30], fill=GOLD)
            else:
                # Team row
                row_color = (40, 40, 65) if t_idx % 2 == 0 else (35, 35, 58)
                draw.rectangle([x + 5, ty, x + card_w - 5, ty + 30], fill=row_color)

    # Bottom accent
    draw.rectangle([0, height - 10, width, height], fill=TEAL)

    img.save(os.path.join(OUTPUT_DIR, "groups-overview.png"), "PNG")
    print("Created groups-overview.png")


def create_solomon_bonitos_card():
    """Create Solomon Islands Bonitos graphic (1080x1080)"""
    size = 1080
    img = Image.new("RGB", (size, size), DARKER)
    draw = ImageDraw.Draw(img)

    # Background - green to blue gradient (Solomon Islands colors)
    for y in range(size):
        ratio = y / size
        r = int(0 + 20 * ratio)
        g = int(80 + 132 * ratio)
        b = int(50 + 120 * ratio)
        draw.line([(0, y), (size, y)], fill=(r, g, b))

    # Diagonal stripes pattern
    for i in range(-size, size * 2, 60):
        draw.line([(i, 0), (i + size, size)], fill=(255, 255, 255), width=1)

    # Central emblem area
    cx, cy = size // 2, size // 2 - 50

    # Shield shape
    shield_points = [
        (cx, cy - 180),
        (cx + 150, cy - 120),
        (cx + 150, cy + 50),
        (cx, cy + 180),
        (cx - 150, cy + 50),
        (cx - 150, cy - 120),
    ]
    draw.polygon(shield_points, fill=(20, 60, 40), outline=GOLD)

    # Inner shield
    inner_points = [
        (cx, cy - 150),
        (cx + 120, cy - 100),
        (cx + 120, cy + 40),
        (cx, cy + 150),
        (cx - 120, cy + 40),
        (cx - 120, cy - 100),
    ]
    draw.polygon(inner_points, fill=(30, 80, 50))

    # Eagle/bird silhouette (simplified)
    # Body
    draw.ellipse([cx - 40, cy - 60, cx + 40, cy + 20], fill=GOLD)
    # Wings
    draw.polygon(
        [(cx - 40, cy - 30), (cx - 120, cy - 80), (cx - 80, cy - 10)], fill=GOLD
    )
    draw.polygon(
        [(cx + 40, cy - 30), (cx + 120, cy - 80), (cx + 80, cy - 10)], fill=GOLD
    )
    # Head
    draw.ellipse([cx - 20, cy - 80, cx + 20, cy - 50], fill=GOLD)

    # Stars above shield
    for i in range(5):
        star_x = cx - 100 + i * 50
        draw_star(draw, (star_x, cy - 220), 10, GOLD)

    # Bottom text area
    draw.rectangle([100, size - 200, size - 100, size - 120], fill=(20, 50, 35))
    draw.rectangle([100, size - 200, size - 100, size - 180], fill=GOLD)

    # Accent bar
    draw.rectangle([0, size - 50, size, size - 40], fill=GOLD)

    img.save(os.path.join(OUTPUT_DIR, "solomon-bonitos.png"), "PNG")
    print("Created solomon-bonitos.png")


def create_matchday_card():
    """Create match day social card (1080x1080)"""
    size = 1080
    img = Image.new("RGB", (size, size), DARKER)
    draw = ImageDraw.Draw(img)

    # Background
    for y in range(size):
        ratio = y / size
        r = int(DARKER[0] + (PURPLE[0] - DARKER[0]) * 0.3 * ratio)
        b = int(DARKER[2] + (PURPLE[2] - DARKER[2]) * 0.3 * ratio)
        draw.line([(0, y), (size, y)], fill=(r, DARKER[1], b))

    # Top bar
    draw.rectangle([0, 0, size, 100], fill=PURPLE)

    # VS design in center
    cx, cy = size // 2, size // 2

    # Left circle (team 1)
    draw.ellipse(
        [cx - 350, cy - 120, cx - 50, cy + 120],
        fill=(30, 30, 55),
        outline=TEAL,
        width=3,
    )

    # Right circle (team 2)
    draw.ellipse(
        [cx + 50, cy - 120, cx + 350, cy + 120],
        fill=(30, 30, 55),
        outline=PURPLE,
        width=3,
    )

    # VS text
    draw.rectangle([cx - 40, cy - 30, cx + 40, cy + 30], fill=GOLD)

    # Bottom info bar
    draw.rectangle([50, size - 180, size - 50, size - 100], fill=(30, 30, 55))
    draw.rectangle([50, size - 180, size - 50, size - 160], fill=TEAL)

    # Decorative elements
    for i in range(5):
        draw_star(draw, (100 + i * 220, 50), 12, GOLD)

    # Bottom accent
    draw.rectangle([0, size - 20, size, size], fill=TEAL)

    img.save(os.path.join(OUTPUT_DIR, "matchday-card.png"), "PNG")
    print("Created matchday-card.png")


def create_facebook_cover():
    """Create Facebook cover photo (820x312)"""
    width, height = 820, 312
    img = Image.new("RGB", (width, height), DARKER)
    draw = ImageDraw.Draw(img)

    # Gradient background
    for x in range(width):
        ratio = x / width
        r = int(DARKER[0] + (PURPLE[0] - DARKER[0]) * ratio * 0.5)
        b = int(DARKER[2] + (PURPLE[2] - DARKER[2]) * ratio * 0.5)
        draw.line([(x, 0), (x, height)], fill=(r, DARKER[1], b))

    # Geometric pattern
    for i in range(0, width, 40):
        draw.line(
            [(i, 0), (i + height, height)],
            fill=(PURPLE[0], PURPLE[1], PURPLE[2]),
            width=1,
        )

    # Central trophy area
    cx, cy = width // 2, height // 2
    draw.ellipse(
        [cx - 80, cy - 80, cx + 80, cy + 80], fill=(30, 30, 55), outline=GOLD, width=3
    )

    # Simplified trophy
    draw.ellipse([cx - 30, cy - 50, cx + 30, cy - 10], fill=GOLD)
    draw.rectangle([cx - 20, cy - 10, cx + 20, cy + 30], fill=GOLD)
    draw.rectangle([cx - 30, cy + 30, cx + 30, cy + 40], fill=GOLD)

    # Side bars
    draw.rectangle([0, 0, 8, height], fill=TEAL)
    draw.rectangle([width - 8, 0, width, height], fill=TEAL)

    # Top/bottom accents
    draw.rectangle([0, 0, width, 5], fill=GOLD)
    draw.rectangle([0, height - 5, width, height], fill=GOLD)

    img.save(os.path.join(OUTPUT_DIR, "facebook-cover.png"), "PNG")
    print("Created facebook-cover.png")


def create_twitter_header():
    """Create Twitter/X header (1500x500)"""
    width, height = 1500, 500
    img = Image.new("RGB", (width, height), DARKER)
    draw = ImageDraw.Draw(img)

    # Diagonal gradient
    for y in range(height):
        for x in range(width):
            ratio = (x / width + y / height) / 2
            r = int(DARKER[0] + (PURPLE_DARK[0] - DARKER[0]) * ratio * 0.5)
            b = int(DARKER[2] + (PURPLE_DARK[2] - DARKER[2]) * ratio * 0.5)
            img.putpixel((x, y), (r, DARKER[1], b))

    # Re-draw with lines for performance
    for y in range(height):
        ratio = y / height
        r = int(DARKER[0] + (PURPLE_DARK[0] - DARKER[0]) * ratio * 0.3)
        b = int(DARKER[2] + (PURPLE_DARK[2] - DARKER[2]) * ratio * 0.3)
        draw.line([(0, y), (width, y)], fill=(r, DARKER[1], b))

    # Pattern overlay
    for i in range(-height, width + height, 100):
        draw.line(
            [(i, 0), (i + height, height)],
            fill=(PURPLE[0], PURPLE[1], PURPLE[2]),
            width=1,
        )

    # Central element
    cx, cy = width // 2, height // 2
    draw.ellipse(
        [cx - 100, cy - 100, cx + 100, cy + 100],
        fill=(30, 30, 55),
        outline=GOLD,
        width=4,
    )

    # Trophy
    draw.ellipse([cx - 40, cy - 60, cx + 40, cy - 10], fill=GOLD)
    draw.rectangle([cx - 25, cy - 10, cx + 25, cy + 40], fill=GOLD)
    draw.rectangle([cx - 35, cy + 40, cx + 35, cy + 50], fill=GOLD)

    # Side decorations
    for i in range(3):
        draw_star(draw, (200 + i * 100, cy), 15, GOLD)
        draw_star(draw, (width - 200 - i * 100, cy), 15, GOLD)

    # Border
    draw.rectangle([0, 0, width, height], outline=PURPLE, width=3)

    img.save(os.path.join(OUTPUT_DIR, "twitter-header.png"), "PNG")
    print("Created twitter-header.png")


if __name__ == "__main__":
    print("Generating HT World Cup Hub graphics...")
    create_hero_banner()
    create_countdown_card()
    create_group_overview()
    create_solomon_bonitos_card()
    create_matchday_card()
    create_facebook_cover()
    create_twitter_header()
    print("\nAll graphics created successfully!")
    print(f"Output directory: {OUTPUT_DIR}")
