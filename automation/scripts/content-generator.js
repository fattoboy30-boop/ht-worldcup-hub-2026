// HT World Cup Hub - Content Generator Script
// Hermes Agent - Automated Content Creation

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    templates: {
        breakingNews: {
            pattern: '🔴 BREAKING: {headline}\n\n{summary}\n\nWhat do you think? Comment below! 👇\n\n#WorldCup2026 #HoniaraToday #{hashtag}',
            maxLength: 500
        },
        matchPreview: {
            pattern: '⚽ MATCH DAY! ⚽\n\n{teamA} 🆚 {teamB}\n\n📅 {date}\n⏰ {time} SIT\n📍 {venue}\n\nWho\'s your prediction? Drop your score! 👇\n\n#WorldCup2026 #HoniaraToday',
            maxLength: 400
        },
        matchResult: {
            pattern: '🏆 FULL TIME 🏆\n\n{teamA} {scoreA} - {scoreB} {teamB}\n\n{summary}\n\nWho was your man of the match? 👇\n\n#WorldCup2026 #HoniaraToday',
            maxLength: 400
        },
        download: {
            pattern: '📥 FREE DOWNLOAD! 📥\n\nGet your {productName}!\n{description}\n\n➡️ Download here: {link}\n\nShare with your football crew! 🏆\n\n#WorldCup2026 #HoniaraToday #FreeDownload',
            maxLength: 400
        },
        poll: {
            pattern: '🗳️ FAN POLL 🗳️\n\n{question}\n\n🅰️ {optionA}\n🅱️ {optionB}\n🅲 {optionC}\n🅳 {optionD}\n\nVote in comments! Most votes wins!\n\n#WorldCup2026 #HoniaraToday',
            maxLength: 400
        },
        countdown: {
            pattern: '🗓️ {days} DAYS TO GO! 🗓️\n\nThe World Cup is almost here!\n\n{message}\n\nWhich match are you most excited for? 👇\n\n#WorldCup2026 #HoniaraToday',
            maxLength: 350
        },
        solomonFocus: {
            pattern: '🇸🇧 SOLOMON ISLANDS FOCUS 🇸🇧\n\n{headline}\n\n{summary}\n\nGo Bonitos! 🇸🇧⚽\n\n#SolomonIslands #Bonitos #WorldCup2026 #HoniaraToday',
            maxLength: 400
        },
        blogPost: {
            title: '',
            content: '',
            tags: [],
            category: ''
        }
    },
    outputPath: path.join(__dirname, '../output/content'),
    dataPath: path.join(__dirname, '../../js/data.js')
};

// Content Generator Agent
class ContentGenerator {
    constructor() {
        this.generatedContent = [];
    }

    generatePost(type, data) {
        const template = CONFIG.templates[type];
        if (!template) {
            console.error(`Template ${type} not found`);
            return null;
        }

        let content = template.pattern;
        
        // Replace placeholders
        for (const [key, value] of Object.entries(data)) {
            content = content.replace(new RegExp(`\\{${key}\\}`, 'g'), value || '');
        }

        // Ensure max length
        if (content.length > template.maxLength) {
            content = content.substring(0, template.maxLength - 3) + '...';
        }

        const post = {
            id: Date.now(),
            type: type,
            content: content,
            createdAt: new Date().toISOString(),
            scheduled: false,
            posted: false
        };

        this.generatedContent.push(post);
        return post;
    }

    generateBreakingNews(headline, summary, hashtag = 'Football') {
        return this.generatePost('breakingNews', {
            headline,
            summary,
            hashtag
        });
    }

    generateMatchPreview(teamA, teamB, date, time, venue) {
        return this.generatePost('matchPreview', {
            teamA,
            teamB,
            date,
            time,
            venue
        });
    }

    generateMatchResult(teamA, scoreA, teamB, scoreB, summary) {
        return this.generatePost('matchResult', {
            teamA,
            scoreA: scoreA.toString(),
            teamB,
            scoreB: scoreB.toString(),
            summary
        });
    }

    generateDownloadPost(productName, description, link) {
        return this.generatePost('download', {
            productName,
            description,
            link
        });
    }

    generatePoll(question, optionA, optionB, optionC, optionD) {
        return this.generatePost('poll', {
            question,
            optionA,
            optionB,
            optionC,
            optionD
        });
    }

    generateCountdown(days, message = 'Get ready for the beautiful game!') {
        return this.generatePost('countdown', {
            days: days.toString(),
            message
        });
    }

    generateSolomonFocus(headline, summary) {
        return this.generatePost('solomonFocus', {
            headline,
            summary
        });
    }

    generateBlogPost(title, content, tags = [], category = 'World Cup') {
        return {
            id: Date.now(),
            type: 'blog',
            title,
            content,
            tags,
            category,
            createdAt: new Date().toISOString(),
            published: false
        };
    }

    saveContent(content, filename) {
        if (!fs.existsSync(CONFIG.outputPath)) {
            fs.mkdirSync(CONFIG.outputPath, { recursive: true });
        }

        const filepath = path.join(CONFIG.outputPath, filename);
        fs.writeFileSync(filepath, JSON.stringify(content, null, 2));
        console.log(`Saved content to ${filepath}`);
        
        return filepath;
    }

    generateDailyContent(news = []) {
        const today = new Date();
        const posts = [];

        // Generate countdown post
        const worldCupStart = new Date('2026-06-11');
        const daysUntil = Math.ceil((worldCupStart - today) / (1000 * 60 * 60 * 24));
        
        if (daysUntil > 0) {
            posts.push(this.generateCountdown(
                daysUntil,
                'The biggest World Cup in history is coming to USA, Mexico & Canada!'
            ));
        }

        // Generate poll
        posts.push(this.generatePoll(
            'Who will win World Cup 2026?',
            '🇧🇷 Brazil',
            '🇫🇷 France',
            '🇦🇷 Argentina',
            '🇩🇪 Germany'
        ));

        // Generate Solomon focus
        posts.push(this.generateSolomonFocus(
            'Solomon Islands Bonitos in Action!',
            'The Bonitos are preparing for their FIFA Series matches. Stay tuned for updates!'
        ));

        // Generate download post
        posts.push(this.generateDownloadPost(
            'World Cup 2026 Schedule',
            'Printable schedule of all 104 matches!',
            'https://fattoboy30-boop.github.io/ht-worldcup-hub-2026/downloads/world-cup-2026-schedule.html'
        ));

        return posts;
    }

    generateMatchDayContent(match) {
        const posts = [];
        const now = new Date();
        const matchTime = new Date(match.date + 'T' + match.time);

        // Pre-match post (2 hours before)
        posts.push(this.generateMatchPreview(
            match.team1.name,
            match.team2.name,
            match.date,
            match.time,
            match.venue
        ));

        // During match (score update)
        if (now > matchTime && now < new Date(matchTime.getTime() + 2 * 60 * 60 * 1000)) {
            posts.push(this.generateBreakingNews(
                'LIVE: Match in progress!',
                `${match.team1.name} vs ${match.team2.name} is underway!`,
                match.team1.name.replace(/\s/g, '')
            ));
        }

        return posts;
    }

    saveAllContent() {
        const filename = `content-${new Date().toISOString().split('T')[0]}.json`;
        this.saveContent(this.generatedContent, filename);
        
        // Update data.js with new posts
        this.updateDataFile(this.generatedContent);
        
        return this.generatedContent.length;
    }

    updateDataFile(posts) {
        try {
            const dataPath = CONFIG.dataPath;
            let content = fs.readFileSync(dataPath, 'utf8');
            
            // Add social posts section if not exists
            if (!content.includes('socialPosts:')) {
                const socialPostsSection = `
    // Social Media Posts (Auto-generated)
    socialPosts: ${JSON.stringify(posts.slice(0, 10), null, 8)},
`;
                content = content.replace('// HT World Cup Hub - Data', '// HT World Cup Hub - Data' + socialPostsSection);
            }

            fs.writeFileSync(dataPath, content);
            console.log('Updated data.js with social posts');
        } catch (error) {
            console.error('Error updating data.js:', error.message);
        }
    }

    async run(news = []) {
        console.log('Generating daily content...');
        
        const posts = this.generateDailyContent(news);
        
        posts.forEach(post => {
            console.log(`Generated ${post.type} post:`);
            console.log(post.content);
            console.log('---');
        });

        this.saveAllContent();
        
        return {
            total: posts.length,
            types: [...new Set(posts.map(p => p.type))]
        };
    }
}

// Export for use
module.exports = ContentGenerator;

// Run if executed directly
if (require.main === module) {
    const generator = new ContentGenerator();
    generator.run().then(result => {
        console.log('Content Generation Results:', result);
    });
}
