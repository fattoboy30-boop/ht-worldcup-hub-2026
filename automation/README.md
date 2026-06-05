# HT World Cup Hub - Automation System

## Hermes Agent - Automated Content Workflow

---

## Overview

Hermes Agent automates the entire HT World Cup Hub workflow:
- **News Research** - Scans multiple sources for World Cup news
- **Content Generation** - Creates Facebook posts, blogs, and articles
- **Printable Products** - Generates PDFs for downloads
- **Website Updates** - Keeps the hub fresh with latest content

---

## Components

### 1. News Scout (`news-scout.js`)
Scans news sources for World Cup content:
- FIFA.com
- BBC Sport
- ESPN
- OFC (Oceania Football Confederation)
- Solomon Star News

### 2. Content Generator (`content-generator.js`)
Creates social media posts:
- Breaking news posts
- Match previews and results
- Polls and engagement posts
- Download announcements
- Countdown posts

### 3. Printable Generator (`printable-generator.js`)
Generates downloadable products:
- World Cup Schedule (PDF)
- Prediction Bracket (PDF)
- Match Day Bingo (PDF)
- World Cup Trivia (PDF)

### 4. Hermes Agent (`hermes.js`)
Main automation controller that:
- Coordinates all agents
- Handles scheduling
- Manages logging
- Updates website data

---

## Quick Start

### Run Full Update
```bash
cd "C:\Users\Owner\Desktop\HT WorldCup Hub"
node automation/scripts/hermes.js full
```

### Run Individual Components
```bash
# News research only
node automation/scripts/hermes.js scout

# Content generation only
node automation/scripts/hermes.js content

# Printables only
node automation/scripts/hermes.js printables

# Check status
node automation/scripts/hermes.js status
```

---

## Folder Structure

```
automation/
├── agents/
│   └── hermes.config.md    # Agent configuration
├── scripts/
│   ├── hermes.js           # Main agent
│   ├── news-scout.js       # News research
│   ├── content-generator.js # Content creation
│   └── printable-generator.js # PDF generation
├── templates/              # Content templates
├── output/                 # Generated content
│   ├── content/           # Social media posts
│   ├── news/              # News articles
│   ├── images/            # Generated images
│   └── logs/              # Agent logs
└── Facebook-Posting-Guide.md # Social media guide
```

---

## How It Works

### Daily Workflow

```
06:00 SIT - Morning Update
    ↓
[News Scout] → Scan overnight news
    ↓
[Content Generator] → Create morning posts
    ↓
[Hermes] → Update website data
    ↓
[Facebook] → Post morning update

12:00 SIT - Midday Engagement
    ↓
[Content Generator] → Create polls, trivia
    ↓
[Facebook] → Post engagement content

18:00 SIT - Evening Content
    ↓
[Content Generator] → Create download posts
    ↓
[Facebook] → Post evening content

21:00 SIT - Night Engagement
    ↓
[News Scout] → Check for late news
    ↓
[Content Generator] → Create discussion posts
    ↓
[Facebook] → Post night content
```

### Match Day Workflow

```
-2 hours: Match Preview
-1 hour: Hype Post
During: Live Updates (manual)
+30 min: Result Post
+1 hour: Analysis Post
```

---

## Output Files

### Facebook Posts
- `output/facebook-posts.json` - Ready-to-post content
- Format: `{ type, content, createdAt }`

### News Articles
- `output/news/news-YYYY-MM-DD.json` - Daily news scan
- Format: `{ id, title, summary, source, url, date }`

### Printable Products
- `downloads/world-cup-2026-schedule.html`
- `downloads/prediction-bracket.html`
- `downloads/matchday-bingo.html`
- `downloads/world-cup-trivia.html`

---

## Integration with OpenCode

### Using in OpenCode
1. Load the skill: `skill ht-worldcup-hub`
2. Ask Hermes to perform tasks:
   - "Run Hermes full update"
   - "Scout today's World Cup news"
   - "Generate Facebook posts for match day"
   - "Create a countdown post"
   - "Make a poll about..."

### Manual Commands
```bash
# Full automation
node automation/scripts/hermes.js full

# Specific tasks
node automation/scripts/hermes.js scout
node automation/scripts/hermes.js content
node automation/scripts/hermes.js printables
```

---

## Configuration

### Edit `agents/hermes.config.md`
- News sources
- Keywords to track
- Posting schedule
- Brand guidelines
- Content templates

### Edit `scripts/content-generator.js`
- Post templates
- Maximum lengths
- Hashtag strategies

### Edit `js/data.js`
- Add new fixtures
- Update news items
- Add download links

---

## Logs

Logs are stored in `automation/output/logs/`:
- `hermes-YYYY-MM-DD.log` - Daily execution logs
- Contains timestamps, errors, and status updates

---

## Troubleshooting

### News Scout Not Finding Articles
- Check internet connection
- Verify source URLs are accessible
- Some sites may block automated requests

### Content Not Updating
- Check `js/data.js` permissions
- Verify file paths in config
- Check console for error messages

### Printables Not Generating
- Ensure `downloads/` folder exists
- Check file write permissions
- Verify HTML templates are valid

---

## Future Enhancements

- [ ] Add Puppeteer for actual PDF generation
- [ ] Implement image generation with Canvas
- [ ] Add Facebook API integration
- [ ] Create scheduling system with cron jobs
- [ ] Add analytics tracking
- [ ] Implement comment response automation

---

*Hermes Agent v1.0 - HT World Cup Hub Automation*
*Built for Honiara Today*
