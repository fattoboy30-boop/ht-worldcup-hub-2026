// HT World Cup Hub - Main Automation Script
// Hermes Agent - Full Workflow Automation

const NewsScout = require('./news-scout');
const ContentGenerator = require('./content-generator');
const PrintableGenerator = require('./printable-generator');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    paths: {
        root: path.join(__dirname, '../..'),
        data: path.join(__dirname, '../../js/data.js'),
        downloads: path.join(__dirname, '../../downloads'),
        output: path.join(__dirname, '../output'),
        logs: path.join(__dirname, '../output/logs')
    },
    schedule: {
        morning: '06:00',
        midday: '12:00',
        evening: '18:00',
        night: '21:00'
    },
    timezone: 'Pacific/Guadalcanal'
};

// Main Hermes Agent Class
class HermesAgent {
    constructor() {
        this.newsScout = new NewsScout();
        this.contentGenerator = new ContentGenerator();
        this.printableGenerator = new PrintableGenerator();
        this.logFile = null;
    }

    // Logging
    log(message, level = 'INFO') {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] [${level}] ${message}`;
        
        console.log(logMessage);
        
        if (this.logFile) {
            fs.appendFileSync(this.logFile, logMessage + '\n');
        }
    }

    // Initialize
    async init() {
        this.log('Initializing Hermes Agent...');
        
        // Create output directories
        const dirs = [
            CONFIG.paths.output,
            CONFIG.paths.logs,
            path.join(CONFIG.paths.output, 'content'),
            path.join(CONFIG.paths.output, 'news'),
            path.join(CONFIG.paths.output, 'images')
        ];
        
        dirs.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });

        // Set up log file
        this.logFile = path.join(CONFIG.paths.logs, `hermes-${new Date().toISOString().split('T')[0]}.log`);
        
        this.log('Hermes Agent initialized successfully');
    }

    // Run News Scout
    async runNewsScout() {
        this.log('Running News Scout...');
        try {
            const result = await this.newsScout.run();
            this.log(`News Scout completed: ${result.filtered} articles found`);
            return result;
        } catch (error) {
            this.log(`News Scout error: ${error.message}`, 'ERROR');
            return { total: 0, filtered: 0, error: error.message };
        }
    }

    // Run Content Generator
    async runContentGenerator(news = []) {
        this.log('Running Content Generator...');
        try {
            const result = await this.contentGenerator.run(news);
            this.log(`Content Generator completed: ${result.total} posts generated`);
            return result;
        } catch (error) {
            this.log(`Content Generator error: ${error.message}`, 'ERROR');
            return { total: 0, error: error.message };
        }
    }

    // Run Printable Generator
    async runPrintableGenerator() {
        this.log('Running Printable Generator...');
        try {
            const result = await this.printableGenerator.run();
            this.log(`Printable Generator completed: ${result.length} products generated`);
            return result;
        } catch (error) {
            this.log(`Printable Generator error: ${error.message}`, 'ERROR');
            return [];
        }
    }

    // Update Website Data
    updateWebsiteData(news, posts) {
        this.log('Updating website data...');
        try {
            let content = fs.readFileSync(CONFIG.paths.data, 'utf8');
            
            // Add last updated timestamp
            const timestamp = new Date().toISOString();
            if (!content.includes('lastUpdated:')) {
                content = content.replace(
                    'const DATA = {',
                    `const DATA = {\n    // Last Updated\n    lastUpdated: "${timestamp}",`
                );
            } else {
                content = content.replace(
                    /lastUpdated: "[^"]*"/,
                    `lastUpdated: "${timestamp}"`
                );
            }

            fs.writeFileSync(CONFIG.paths.data, content);
            this.log('Website data updated successfully');
        } catch (error) {
            this.log(`Error updating website data: ${error.message}`, 'ERROR');
        }
    }

    // Generate Facebook Posts
    generateFacebookPosts() {
        this.log('Generating Facebook posts...');
        
        const posts = [
            {
                type: 'morning',
                content: `🌅 Good Morning Football Fans! 🌍⚽

Here's your daily World Cup update from HT World Cup Hub!

🗓️ Days until World Cup 2026: ${this.getDaysUntilWorldCup()}

What match are you most excited for? Comment below! 👇

#WorldCup2026 #HoniaraToday #SolomonIslands #Football`
            },
            {
                type: 'engagement',
                content: `🗳️ FAN POLL 🗳️

Who will be the top scorer at World Cup 2026?

🅰️ Kylian Mbappé (France)
🅱️ Erling Haaland (Norway)
🅲 Vinícius Jr (Brazil)
🅳 Lautaro Martínez (Argentina)

Vote in comments! 🗳️

#WorldCup2026 #HoniaraToday`
            },
            {
                type: 'download',
                content: `📥 FREE DOWNLOAD! 📥

Get your printable World Cup 2026 Schedule!
Print it, stick it on your wall, never miss a match!

➡️ Download here: https://fattoboy30-boop.github.io/ht-worldcup-hub-2026/downloads/world-cup-2026-schedule.html

Share with your football crew! 🏆

#WorldCup2026 #HoniaraToday #FreeDownload`
            },
            {
                type: 'solomon',
                content: `🇸🇧 SOLOMON ISLANDS FOCUS 🇸🇧

Did you know? The Solomon Islands Bonitos will face Bulgaria in their first ever match against European opposition!

📅 March 27, 2026
⏰ 19:30 SIT
📍 Gelora Bung Karno Stadium, Jakarta

Go Bonitos! 🇸🇧⚽

#SolomonIslands #Bonitos #WorldCup2026 #HoniaraToday`
            }
        ];

        return posts;
    }

    // Get days until World Cup
    getDaysUntilWorldCup() {
        const worldCupStart = new Date('2026-06-11');
        const today = new Date();
        const diffTime = worldCupStart - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    // Save Facebook Posts
    saveFacebookPosts(posts) {
        const outputPath = path.join(CONFIG.paths.output, 'facebook-posts.json');
        fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));
        this.log(`Saved ${posts.length} Facebook posts to ${outputPath}`);
    }

    // Full Update Run
    async runFullUpdate() {
        this.log('=== Starting Full Update ===');
        
        // 1. Scout news
        const news = await this.runNewsScout();
        
        // 2. Generate content
        const content = await this.runContentGenerator(news.articles || []);
        
        // 3. Generate printables (only if not exists)
        const printablesDir = CONFIG.paths.downloads;
        if (!fs.existsSync(path.join(printablesDir, 'prediction-bracket.html'))) {
            await this.runPrintableGenerator();
        }
        
        // 4. Generate Facebook posts
        const fbPosts = this.generateFacebookPosts();
        this.saveFacebookPosts(fbPosts);
        
        // 5. Update website data
        this.updateWebsiteData(news.articles || [], fbPosts);
        
        this.log('=== Full Update Complete ===');
        
        return {
            news: news.filtered || 0,
            content: content.total || 0,
            facebookPosts: fbPosts.length,
            timestamp: new Date().toISOString()
        };
    }

    // Run Scheduled Task
    async runScheduledTask(task) {
        this.log(`Running scheduled task: ${task}`);
        
        switch (task) {
            case 'morning':
                return await this.runFullUpdate();
            case 'midday':
                return await this.runContentGenerator();
            case 'evening':
                const posts = this.generateFacebookPosts();
                this.saveFacebookPosts(posts);
                return { posts: posts.length };
            case 'night':
                return await this.runNewsScout();
            default:
                this.log(`Unknown task: ${task}`, 'WARN');
                return null;
        }
    }

    // Get Status
    getStatus() {
        return {
            agent: 'Hermes',
            version: '1.0.0',
            uptime: process.uptime(),
            lastUpdate: new Date().toISOString(),
            daysUntilWorldCup: this.getDaysUntilWorldCup(),
            components: {
                newsScout: 'Ready',
                contentGenerator: 'Ready',
                printableGenerator: 'Ready'
            }
        };
    }
}

// Export for use
module.exports = HermesAgent;

// Run if executed directly
if (require.main === module) {
    const agent = new HermesAgent();
    
    const args = process.argv.slice(2);
    const command = args[0] || 'full';
    
    agent.init().then(() => {
        switch (command) {
            case 'full':
                return agent.runFullUpdate();
            case 'scout':
                return agent.runNewsScout();
            case 'content':
                return agent.runContentGenerator();
            case 'printables':
                return agent.runPrintableGenerator();
            case 'status':
                return agent.getStatus();
            default:
                console.log('Usage: node hermes.js [full|scout|content|printables|status]');
                return null;
        }
    }).then(result => {
        if (result) {
            console.log('\nResult:', JSON.stringify(result, null, 2));
        }
    }).catch(error => {
        console.error('Error:', error);
    });
}
