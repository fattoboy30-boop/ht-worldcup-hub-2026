// HT World Cup Hub - Printable Products Generator
// Hermes Agent - Automated PDF/Printable Creation

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    outputPath: path.join(__dirname, '../../downloads'),
    imageOutputPath: path.join(__dirname, '../output/images'),
    templates: {
        schedule: {
            name: 'World Cup 2026 Schedule',
            filename: 'world-cup-2026-schedule.html',
            type: 'pdf'
        },
        prediction: {
            name: 'Prediction Bracket',
            filename: 'prediction-bracket.html',
            type: 'pdf'
        },
        bingo: {
            name: 'Match Day Bingo',
            filename: 'matchday-bingo.html',
            type: 'pdf'
        },
        wallpaper: {
            name: 'Team Wallpaper',
            filename: 'wallpaper.html',
            type: 'image'
        },
        trivia: {
            name: 'World Cup Trivia',
            filename: 'world-cup-trivia.html',
            type: 'pdf'
        }
    },
    teams: [
        { name: 'Brazil', flag: '🇧🇷', group: 'A' },
        { name: 'Argentina', flag: '🇦🇷', group: 'A' },
        { name: 'France', flag: '🇫🇷', group: 'A' },
        { name: 'Germany', flag: '🇩🇪', group: 'B' },
        { name: 'Spain', flag: '🇪🇸', group: 'B' },
        { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'B' },
        { name: 'USA', flag: '🇺🇸', group: 'C' },
        { name: 'Mexico', flag: '🇲🇽', group: 'C' },
        { name: 'Canada', flag: '🇨🇦', group: 'C' },
        { name: 'Japan', flag: '🇯🇵', group: 'D' },
        { name: 'South Korea', flag: '🇰🇷', group: 'D' },
        { name: 'Australia', flag: '🇦🇺', group: 'D' },
        { name: 'Solomon Islands', flag: '🇸🇧', group: 'OFC' },
        { name: 'New Zealand', flag: '🇳🇿', group: 'OFC' }
    ]
};

// Printable Products Generator
class PrintableGenerator {
    constructor() {
        this.generated = [];
    }

    generateScheduleHTML() {
        const matches = this.generateSampleMatches();
        
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>World Cup 2026 Schedule - HT World Cup Hub</title>
    <style>
        @page { size: A4; margin: 20mm; }
        body { font-family: 'Segoe UI', sans-serif; max-width: 210mm; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #7B2FBE; padding-bottom: 20px; }
        .logo { width: 80px; height: 80px; border-radius: 50%; margin-bottom: 10px; }
        h1 { color: #7B2FBE; margin: 10px 0; }
        h2 { color: #5A1F8E; border-bottom: 2px solid #00D4AA; padding-bottom: 5px; margin-top: 30px; }
        .match { display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #eee; }
        .match:nth-child(even) { background: #f9f9f9; }
        .team { display: flex; align-items: center; gap: 10px; }
        .flag { font-size: 1.5rem; }
        .info { color: #666; font-size: 0.9rem; }
        .solomon { background: #f0fff8 !important; border-left: 4px solid #00D4AA; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 0.8rem; }
        @media print { .no-print { display: none; } }
    </style>
</head>
<body>
    <div class="header">
        <img src="images/HT LOGO.jpg" alt="HT Logo" class="logo">
        <h1>FIFA World Cup 2026</h1>
        <p>Official Match Schedule | Honiara Today</p>
    </div>
    
    <button class="no-print" onclick="window.print()" style="padding: 10px 30px; background: #7B2FBE; color: white; border: none; border-radius: 20px; cursor: pointer;">🖨️ Print Schedule</button>
    
    <h2>Group Stage</h2>
    ${matches.groupStage.map(m => this.renderMatch(m)).join('\n')}
    
    <h2>Knockout Stage</h2>
    ${matches.knockout.map(m => this.renderMatch(m)).join('\n')}
    
    <div class="footer">
        <p>© 2026 Honiara Today | HT World Cup Hub</p>
        <p>Downloaded from: fattoboy30-boop.github.io/ht-worldcup-hub-2026</p>
    </div>
</body>
</html>`;
    }

    generatePredictionBracketHTML() {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>World Cup 2026 Prediction Bracket - HT World Cup Hub</title>
    <style>
        @page { size: A4 landscape; margin: 15mm; }
        body { font-family: 'Segoe UI', sans-serif; padding: 20px; }
        .header { text-align: center; margin-bottom: 20px; }
        .logo { width: 60px; height: 60px; border-radius: 50%; }
        h1 { color: #7B2FBE; font-size: 1.5rem; }
        .bracket { display: flex; justify-content: space-between; margin-top: 20px; }
        .round { width: 18%; }
        .round h3 { text-align: center; color: #5A1F8E; font-size: 0.9rem; }
        .match { border: 2px solid #7B2FBE; border-radius: 8px; padding: 10px; margin: 10px 0; background: white; }
        .team-input { width: 100%; padding: 8px; margin: 5px 0; border: 1px solid #ddd; border-radius: 4px; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 0.8rem; }
    </style>
</head>
<body>
    <div class="header">
        <img src="images/HT LOGO.jpg" alt="HT Logo" class="logo">
        <h1>World Cup 2026 Prediction Bracket</h1>
        <p>Fill in your predictions! | Honiara Today</p>
    </div>
    
    <div class="bracket">
        <div class="round">
            <h3>Round of 32</h3>
            ${Array(16).fill('').map((_, i) => `
            <div class="match">
                <input type="text" class="team-input" placeholder="Team 1">
                <input type="text" class="team-input" placeholder="Team 2">
            </div>`).join('')}
        </div>
        <div class="round">
            <h3>Round of 16</h3>
            ${Array(8).fill('').map((_, i) => `
            <div class="match">
                <input type="text" class="team-input" placeholder="Winner">
                <input type="text" class="team-input" placeholder="Winner">
            </div>`).join('')}
        </div>
        <div class="round">
            <h3>Quarter Finals</h3>
            ${Array(4).fill('').map((_, i) => `
            <div class="match">
                <input type="text" class="team-input" placeholder="Winner">
                <input type="text" class="team-input" placeholder="Winner">
            </div>`).join('')}
        </div>
        <div class="round">
            <h3>Semi Finals</h3>
            ${Array(2).fill('').map((_, i) => `
            <div class="match">
                <input type="text" class="team-input" placeholder="Winner">
                <input type="text" class="team-input" placeholder="Winner">
            </div>`).join('')}
        </div>
        <div class="round">
            <h3>Final</h3>
            <div class="match">
                <input type="text" class="team-input" placeholder="Champion">
            </div>
        </div>
    </div>
    
    <div class="footer">
        <p>© 2026 Honiara Today | HT World Cup Hub</p>
    </div>
</body>
</html>`;
    }

    generateBingoHTML() {
        const items = [
            'Goal scored', 'Yellow card', 'Red card', 'Penalty',
            'VAR review', 'Corner kick', 'Offside', 'Injury',
            'Substitution', 'Goalkeeper save', 'Free kick', 'Handball',
            'Crossbar hit', 'Own goal', 'Hat-trick', 'Clean sheet',
            'Goal celebration', 'Fan reaction', 'Manager anger', 'Rain delay'
        ];
        
        const shuffled = items.sort(() => Math.random() - 0.5);
        const grid = shuffled.slice(0, 25);
        grid[12] = 'FREE SPACE';

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Match Day Bingo - HT World Cup Hub</title>
    <style>
        @page { size: A4; margin: 20mm; }
        body { font-family: 'Segoe UI', sans-serif; text-align: center; }
        .header { margin-bottom: 20px; }
        .logo { width: 60px; height: 60px; border-radius: 50%; }
        h1 { color: #7B2FBE; }
        .bingo-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; max-width: 400px; margin: 0 auto; }
        .bingo-cell { border: 2px solid #7B2FBE; padding: 10px 5px; font-size: 0.7rem; min-height: 60px; display: flex; align-items: center; justify-content: center; }
        .bingo-cell.header { background: #7B2FBE; color: white; font-weight: bold; }
        .bingo-cell.free { background: #00D4AA; color: white; }
        .footer { margin-top: 30px; color: #666; font-size: 0.8rem; }
    </style>
</head>
<body>
    <div class="header">
        <img src="images/HT LOGO.jpg" alt="HT Logo" class="logo">
        <h1>⚽ Match Day Bingo ⚽</h1>
        <p>Mark off events as they happen!</p>
    </div>
    
    <div class="bingo-grid">
        <div class="bingo-cell header">B</div>
        <div class="bingo-cell header">I</div>
        <div class="bingo-cell header">N</div>
        <div class="bingo-cell header">G</div>
        <div class="bingo-cell header">O</div>
        ${grid.map((item, i) => `
        <div class="bingo-cell ${i === 12 ? 'free' : ''}">${item}</div>`).join('')}
    </div>
    
    <div class="footer">
        <p>© 2026 Honiara Today | HT World Cup Hub</p>
    </div>
</body>
</html>`;
    }

    generateTriviaHTML() {
        const questions = [
            { q: 'How many teams in World Cup 2026?', a: '48' },
            { q: 'Which countries host 2026 World Cup?', a: 'USA, Mexico, Canada' },
            { q: 'When does World Cup 2026 start?', a: 'June 11, 2026' },
            { q: 'How many matches in 2026 World Cup?', a: '104' },
            { q: 'Who won World Cup 2022?', a: 'Argentina' },
            { q: 'Which stadium hosts the final?', a: 'MetLife Stadium' },
            { q: 'Solomon Islands are from which confederation?', a: 'OFC' },
            { q: 'What is Solomon Islands nickname?', a: 'Bonitos' },
            { q: 'How many groups in 2026 World Cup?', a: '12 groups of 4' },
            { q: 'Which team has most World Cup wins?', a: 'Brazil (5)' }
        ];

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>World Cup Trivia Quiz - HT World Cup Hub</title>
    <style>
        @page { size: A4; margin: 20mm; }
        body { font-family: 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { width: 60px; height: 60px; border-radius: 50%; }
        h1 { color: #7B2FBE; }
        .question { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
        .question h3 { color: #5A1F8E; margin-bottom: 10px; }
        .answer-line { border-bottom: 1px dashed #999; height: 30px; }
        .answers { margin-top: 30px; padding: 20px; background: #f5f5f5; border-radius: 8px; }
        .answers h2 { color: #7B2FBE; }
        .answers li { margin: 5px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 0.8rem; }
    </style>
</head>
<body>
    <div class="header">
        <img src="images/HT LOGO.jpg" alt="HT Logo" class="logo">
        <h1>🧠 World Cup Trivia Quiz 🧠</h1>
        <p>Test your football knowledge!</p>
    </div>
    
    ${questions.map((q, i) => `
    <div class="question">
        <h3>${i + 1}. ${q.q}</h3>
        <div class="answer-line"></div>
    </div>`).join('')}
    
    <div class="answers">
        <h2>Answers</h2>
        <ol>
            ${questions.map(q => `<li>${q.a}</li>`).join('\n            ')}
        </ol>
    </div>
    
    <div class="footer">
        <p>© 2026 Honiara Today | HT World Cup Hub</p>
    </div>
</body>
</html>`;
    }

    renderMatch(match) {
        return `<div class="match ${match.solomon ? 'solomon' : ''}">
    <div class="team">
        <span class="flag">${match.team1.flag}</span>
        <span>${match.team1.name}</span>
    </div>
    <div class="info">${match.date} | ${match.time}</div>
    <div class="team">
        <span>${match.team2.name}</span>
        <span class="flag">${match.team2.flag}</span>
    </div>
</div>`;
    }

    generateSampleMatches() {
        return {
            groupStage: [
                { team1: { name: 'USA', flag: '🇺🇸' }, team2: { name: 'TBD', flag: '❓' }, date: 'June 11', time: '16:00', solomon: false },
                { team1: { name: 'Brazil', flag: '🇧🇷' }, team2: { name: 'TBD', flag: '❓' }, date: 'June 13', time: '16:00', solomon: false },
                { team1: { name: 'Argentina', flag: '🇦🇷' }, team2: { name: 'TBD', flag: '❓' }, date: 'June 14', time: '20:00', solomon: false },
                { team1: { name: 'Solomon Islands', flag: '🇸🇧' }, team2: { name: 'Bulgaria', flag: '🇧🇬' }, date: 'March 27', time: '19:30 SIT', solomon: true }
            ],
            knockout: [
                { team1: { name: 'TBD', flag: '❓' }, team2: { name: 'TBD', flag: '❓' }, date: 'June 29', time: 'TBC', solomon: false },
                { team1: { name: 'TBD', flag: '❓' }, team2: { name: 'TBD', flag: '❓' }, date: 'July 4', time: 'TBC', solomon: false }
            ]
        };
    }

    saveProduct(html, filename) {
        if (!fs.existsSync(CONFIG.outputPath)) {
            fs.mkdirSync(CONFIG.outputPath, { recursive: true });
        }

        const filepath = path.join(CONFIG.outputPath, filename);
        fs.writeFileSync(filepath, html);
        console.log(`Generated: ${filename}`);
        
        this.generated.push({
            filename,
            filepath,
            createdAt: new Date().toISOString()
        });
        
        return filepath;
    }

    async run() {
        console.log('Generating printable products...');
        
        // Generate all products
        this.saveProduct(this.generateScheduleHTML(), 'world-cup-2026-schedule.html');
        this.saveProduct(this.generatePredictionBracketHTML(), 'prediction-bracket.html');
        this.saveProduct(this.generateBingoHTML(), 'matchday-bingo.html');
        this.saveProduct(this.generateTriviaHTML(), 'world-cup-trivia.html');
        
        console.log(`Generated ${this.generated.length} products`);
        
        return this.generated;
    }
}

// Export for use
module.exports = PrintableGenerator;

// Run if executed directly
if (require.main === module) {
    const generator = new PrintableGenerator();
    generator.run().then(products => {
        console.log('Generated products:', products.map(p => p.filename));
    });
}
