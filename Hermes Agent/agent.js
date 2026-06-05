// Hermes Agent - Free AI Model Connector
// Connects to Groq, OpenRouter, Google Gemini, and Ollama

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Load configuration
const configPath = path.join(__dirname, '../config/ai-config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// AI Provider Connector
class AIConnector {
    constructor() {
        this.providers = config.providers;
        this.currentProvider = 'primary';
    }

    // Make API request to provider
    async request(provider, messages, options = {}) {
        const providerConfig = this.providers[provider];
        if (!providerConfig) {
            throw new Error(`Provider ${provider} not found`);
        }

        const baseUrl = new URL(providerConfig.baseUrl);
        const isHttps = baseUrl.protocol === 'https:';
        const client = isHttps ? https : http;

        const model = options.model || providerConfig.models.chat;
        const maxTokens = options.maxTokens || 1000;
        const temperature = options.temperature || 0.7;

        const requestBody = JSON.stringify({
            model: model,
            messages: messages,
            max_tokens: maxTokens,
            temperature: temperature
        });

        return new Promise((resolve, reject) => {
            const req = client.request({
                hostname: baseUrl.hostname,
                port: baseUrl.port || (isHttps ? 443 : 80),
                path: baseUrl.pathname + '/chat/completions',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${providerConfig.apiKey}`,
                    'HTTP-Referer': 'https://ht-worldcup-hub.com',
                    'X-Title': 'HT World Cup Hub'
                }
            }, (res) => {
                let data = '';
                res.on('data', (chunk) => data += chunk);
                res.on('end', () => {
                    try {
                        const parsed = JSON.parse(data);
                        if (parsed.error) {
                            reject(new Error(parsed.error.message));
                        } else {
                            resolve(parsed.choices[0].message.content);
                        }
                    } catch (e) {
                        reject(new Error(`Parse error: ${e.message}`));
                    }
                });
            });

            req.on('error', reject);
            req.write(requestBody);
            req.end();
        });
    }

    // Auto-select best available provider
    async autoSelect() {
        const providers = ['primary', 'secondary', 'tertiary'];
        
        for (const provider of providers) {
            try {
                const test = await this.request(provider, [
                    { role: 'user', content: 'Say "ok"' }
                ], { maxTokens: 10 });
                
                console.log(`✓ ${this.providers[provider].name} is available`);
                this.currentProvider = provider;
                return provider;
            } catch (error) {
                console.log(`✗ ${this.providers[provider].name}: ${error.message}`);
            }
        }
        
        console.log('No cloud providers available, checking local Ollama...');
        this.currentProvider = 'local';
        return 'local';
    }

    // Generate content
    async generate(prompt, options = {}) {
        const provider = options.provider || this.currentProvider;
        
        const messages = [
            {
                role: 'system',
                content: `You are Hermes, the AI assistant for Honiara Today's World Cup 2026 Hub. 
                You create engaging football content for Solomon Islands fans.
                Always be enthusiastic, community-focused, and use emojis.
                Include hashtags: #WorldCup2026 #HoniaraToday`
            },
            {
                role: 'user',
                content: prompt
            }
        ];

        return await this.request(provider, messages, options);
    }
}

// Content Generator Agent
class ContentAgent {
    constructor(ai) {
        this.ai = ai;
        this.outputPath = path.join(__dirname, '../output');
    }

    // Generate Facebook post
    async generateFacebookPost(type, data = {}) {
        const prompts = {
            breaking: `Write a breaking news Facebook post about: ${data.headline}. 
                Keep it under 100 words. Use emojis. Include hashtags.`,
            
            matchPreview: `Write a match preview post for ${data.teamA} vs ${data.teamB}.
                Date: ${data.date}, Time: ${data.time}, Venue: ${data.venue}.
                Ask fans for predictions. Use emojis.`,
            
            poll: `Create a fan poll about: ${data.question}.
                Give 4 options. Make it engaging. Use emojis.`,
            
            countdown: `Write a countdown post. ${data.days} days until World Cup 2026.
                Build excitement. Use emojis.`,
            
            download: `Promote a free download: ${data.product}.
                Tell fans they can get it for free. Use emojis.`,
            
            solomon: `Write about Solomon Islands football: ${data.topic}.
                Support the Bonitos. Use Solomon Islands flag emoji 🇸🇧.`
        };

        const prompt = prompts[type] || prompts.breaking;
        
        try {
            const content = await this.ai.generate(prompt, { maxTokens: 400 });
            return {
                id: Date.now(),
                type: type,
                content: content,
                createdAt: new Date().toISOString(),
                posted: false
            };
        } catch (error) {
            console.error(`Error generating ${type} post:`, error.message);
            return null;
        }
    }

    // Generate multiple posts
    async generateDailyContent() {
        const posts = [];
        
        // Morning post
        const morning = await this.generateFacebookPost('countdown', { days: 7 });
        if (morning) posts.push(morning);

        // Poll
        const poll = await this.generateFacebookPost('poll', { 
            question: 'Who will win World Cup 2026?' 
        });
        if (poll) posts.push(poll);

        // Solomon focus
        const solomon = await this.generateFacebookPost('solomon', { 
            topic: 'Solomon Islands Bonitos preparing for FIFA Series' 
        });
        if (solomon) posts.push(solomon);

        // Download promotion
        const download = await this.generateFacebookPost('download', { 
            product: 'World Cup 2026 Printable Schedule' 
        });
        if (download) posts.push(download);

        return posts;
    }

    // Save posts
    savePosts(posts) {
        if (!fs.existsSync(this.outputPath)) {
            fs.mkdirSync(this.outputPath, { recursive: true });
        }

        const filename = `posts-${new Date().toISOString().split('T')[0]}.json`;
        const filepath = path.join(this.outputPath, filename);
        
        fs.writeFileSync(filepath, JSON.stringify(posts, null, 2));
        console.log(`Saved ${posts.length} posts to ${filepath}`);
        
        return filepath;
    }
}

// News Scout Agent
class NewsAgent {
    constructor(ai) {
        this.ai = ai;
    }

    async searchNews(topic = 'World Cup 2026') {
        const prompt = `Search for the latest ${topic} news. 
            Give me 5 headlines with brief summaries.
            Focus on Solomon Islands and Pacific region if relevant.
            Format as a numbered list.`;

        try {
            const result = await this.ai.generate(prompt, { maxTokens: 600 });
            return result;
        } catch (error) {
            console.error('News search error:', error.message);
            return null;
        }
    }

    async generateArticle(headline) {
        const prompt = `Write a short news article (200 words) about: ${headline}.
            Include facts, quotes if relevant, and end with a call to action.
            Target audience: Solomon Islands football fans.`;

        try {
            const article = await this.ai.generate(prompt, { maxTokens: 500 });
            return article;
        } catch (error) {
            console.error('Article generation error:', error.message);
            return null;
        }
    }
}

// Main Hermes Agent
class HermesAgent {
    constructor() {
        this.ai = new AIConnector();
        this.content = new ContentAgent(this.ai);
        this.news = new NewsAgent(this.ai);
        this.status = 'initialized';
    }

    async init() {
        console.log('🔧 Initializing Hermes Agent...');
        console.log('🔍 Checking available AI providers...');
        
        const provider = await this.ai.autoSelect();
        console.log(`✅ Connected to: ${this.ai.providers[provider].name}`);
        
        this.status = 'ready';
        return this;
    }

    async runTask(task) {
        console.log(`\n📋 Running task: ${task}`);
        
        switch (task) {
            case 'daily-content':
                return await this.content.generateDailyContent();
            
            case 'news':
                return await this.news.searchNews();
            
            case 'status':
                return this.getStatus();
            
            default:
                console.log('Unknown task');
                return null;
        }
    }

    getStatus() {
        return {
            agent: 'Hermes',
            status: this.status,
            provider: this.ai.currentProvider,
            providerName: this.ai.providers[this.ai.currentProvider]?.name,
            capabilities: [
                'Facebook post generation',
                'News research',
                'Content creation',
                'Poll creation',
                'Match previews'
            ]
        };
    }
}

// Export
module.exports = { HermesAgent, AIConnector, ContentAgent, NewsAgent };

// Run if executed directly
if (require.main === module) {
    const hermes = new HermesAgent();
    
    hermes.init().then(async () => {
        const task = process.argv[2] || 'status';
        
        if (task === 'setup') {
            console.log('\n📝 Setup Instructions:');
            console.log('1. Get free API key from https://console.groq.com/keys');
            console.log('2. Edit config/ai-config.json and add your key');
            console.log('3. Run: node agent.js daily-content');
            return;
        }

        const result = await hermes.runTask(task);
        
        if (result) {
            console.log('\n📄 Result:');
            console.log(typeof result === 'string' ? result : JSON.stringify(result, null, 2));
        }
    }).catch(console.error);
}
