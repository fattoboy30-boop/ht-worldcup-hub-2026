// HT World Cup Hub - News Scout Script
// Hermes Agent - Automated News Research

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    sources: [
        {
            name: 'FIFA.com',
            url: 'https://www.fifa.com/fifaplus/en/watch-and-read/news',
            type: 'official'
        },
        {
            name: 'BBC Sport',
            url: 'https://www.bbc.com/sport/football/world-cup',
            type: 'news'
        },
        {
            name: 'ESPN',
            url: 'https://www.espn.com/soccer/',
            type: 'news'
        },
        {
            name: 'OFC',
            url: 'https://www.oceaniafootball.com/news',
            type: 'regional'
        },
        {
            name: 'Solomon Star',
            url: 'https://www.solomonstarnews.com/sport',
            type: 'local'
        }
    ],
    keywords: [
        'World Cup 2026',
        'Solomon Islands',
        'Bonitos',
        'OFC',
        'FIFA Series',
        'Qualifiers',
        'Football'
    ],
    outputPath: path.join(__dirname, '../output/news'),
    dataPath: path.join(__dirname, '../../js/data.js')
};

// News article structure
class NewsArticle {
    constructor(title, summary, source, url, date, category) {
        this.id = Date.now();
        this.title = title;
        this.summary = summary;
        this.source = source;
        this.url = url;
        this.date = date || new Date().toISOString().split('T')[0];
        this.category = category || 'general';
        this.tag = this.generateTag();
    }

    generateTag() {
        const titleLower = this.title.toLowerCase();
        if (titleLower.includes('solomon')) return 'Solomon Islands';
        if (titleLower.includes('world cup')) return 'World Cup';
        if (titleLower.includes('fifa')) return 'FIFA';
        if (titleLower.includes('ofc')) return 'OFC';
        return 'Football';
    }
}

// News Scout Agent
class NewsScout {
    constructor() {
        this.articles = [];
        this.lastScan = null;
    }

    async fetchPage(url) {
        return new Promise((resolve, reject) => {
            const protocol = url.startsWith('https') ? https : http;
            protocol.get(url, (res) => {
                let data = '';
                res.on('data', (chunk) => data += chunk);
                res.on('end', () => resolve(data));
            }).on('error', reject);
        });
    }

    extractArticles(html, source) {
        // Simple article extraction (would need proper parsing in production)
        const articles = [];
        
        // Pattern matching for common news structures
        const titlePattern = /<h[2-4][^>]*>(.*?)<\/h[2-4]>/gi;
        const matches = html.match(titlePattern) || [];
        
        matches.slice(0, 5).forEach(match => {
            const title = match.replace(/<[^>]*>/g, '').trim();
            if (title.length > 10 && title.length < 200) {
                articles.push(new NewsArticle(
                    title,
                    `Latest update from ${source.name}`,
                    source.name,
                    source.url,
                    new Date().toISOString().split('T')[0],
                    'news'
                ));
            }
        });

        return articles;
    }

    async scanSource(source) {
        try {
            console.log(`Scanning ${source.name}...`);
            const html = await this.fetchPage(source.url);
            const articles = this.extractArticles(html, source);
            console.log(`Found ${articles.length} articles from ${source.name}`);
            return articles;
        } catch (error) {
            console.error(`Error scanning ${source.name}:`, error.message);
            return [];
        }
    }

    async scanAllSources() {
        console.log('Starting news scan...');
        this.articles = [];

        for (const source of CONFIG.sources) {
            const articles = await this.scanSource(source);
            this.articles.push(...articles);
        }

        this.lastScan = new Date().toISOString();
        console.log(`Scan complete. Total articles: ${this.articles.length}`);
        
        return this.articles;
    }

    filterByKeywords(articles) {
        return articles.filter(article => {
            const text = `${article.title} ${article.summary}`.toLowerCase();
            return CONFIG.keywords.some(keyword => 
                text.includes(keyword.toLowerCase())
            );
        });
    }

    saveArticles(articles) {
        if (!fs.existsSync(CONFIG.outputPath)) {
            fs.mkdirSync(CONFIG.outputPath, { recursive: true });
        }

        const filename = `news-${new Date().toISOString().split('T')[0]}.json`;
        const filepath = path.join(CONFIG.outputPath, filename);
        
        fs.writeFileSync(filepath, JSON.stringify(articles, null, 2));
        console.log(`Saved ${articles.length} articles to ${filepath}`);
        
        return filepath;
    }

    updateDataFile(articles) {
        try {
            const dataPath = CONFIG.dataPath;
            let content = fs.readFileSync(dataPath, 'utf8');
            
            // Extract current news array
            const newsMatch = content.match(/news:\s*\[([\s\S]*?)\]/);
            if (!newsMatch) {
                console.log('Could not find news array in data.js');
                return;
            }

            // Create new news items
            const newItems = articles.slice(0, 5).map(article => {
                return `        {
            id: ${article.id},
            title: "${article.title.replace(/"/g, '\\"')}",
            summary: "${article.summary.replace(/"/g, '\\"')}",
            tag: "${article.tag}",
            date: "${article.date}",
            image: "football1.jpg"
        }`;
            });

            // Insert after existing news or replace
            const existingNews = content.match(/news:\s*\[([\s\S]*?)\]/);
            if (existingNews) {
                const updatedNews = `news: [\n${newItems.join(',\n')},\n${existingNews[1]}]`;
                content = content.replace(/news:\s*\[([\s\S]*?)\]/, updatedNews);
            }

            fs.writeFileSync(dataPath, content);
            console.log('Updated data.js with new articles');
        } catch (error) {
            console.error('Error updating data.js:', error.message);
        }
    }

    async run() {
        const articles = await this.scanAllSources();
        const filtered = this.filterByKeywords(articles);
        
        if (filtered.length > 0) {
            this.saveArticles(filtered);
            this.updateDataFile(filtered);
        }

        return {
            total: articles.length,
            filtered: filtered.length,
            lastScan: this.lastScan
        };
    }
}

// Export for use
module.exports = NewsScout;

// Run if executed directly
if (require.main === module) {
    const scout = new NewsScout();
    scout.run().then(result => {
        console.log('Scout Results:', result);
    });
}
