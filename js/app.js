// HT World Cup Hub - Enhanced Application
// Based on DESIGN.md semantic design system

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initParticles();
    initCountdown();
    initScrollReveal();
    initTeams();
    initNews();
    initFixtures();
    initGraphicFixtures();
    initDownloads();
    initPolls();
    initMobileMenu();
    initNavigation();
    initTicker();
    initParallax();
    initLiveScores();
    initBackToTop();
    initSearchOverlay();
    initKeyboardShortcuts();
});

// Hero Particles Effect
function initParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    
    const particleCount = 30;
    const colors = ['#7B2FBE', '#00D4AA', '#00BFFF', '#FFD700'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 ${particle.style.width} ${particle.style.background}`;
        container.appendChild(particle);
    }
}

// Countdown Timer with Flip Animation
function initCountdown() {
    const tournamentStart = new Date(DATA.tournament.startDate).getTime();
    const elements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };
    
    let prevValues = { days: '', hours: '', minutes: '', seconds: '' };
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = tournamentStart - now;
        
        if (distance < 0) {
            Object.values(elements).forEach(el => el.textContent = '00');
            return;
        }
        
        const values = {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0'),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0'),
            seconds: Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0')
        };
        
        Object.keys(values).forEach(key => {
            if (values[key] !== prevValues[key]) {
                elements[key].style.transform = 'rotateX(360deg)';
                setTimeout(() => {
                    elements[key].textContent = values[key];
                    elements[key].style.transform = 'rotateX(0deg)';
                }, 150);
            }
        });
        
        prevValues = values;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Scroll Reveal Animation
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.85;
        
        reveals.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerPoint) {
                setTimeout(() => {
                    element.classList.add('active');
                }, index * 50);
            }
        });
    }
    
    // Initial check
    checkReveal();
    
    // Throttled scroll listener
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                checkReveal();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Parallax Effect for Hero
function initParallax() {
    const heroImage = document.querySelector('.hero-image');
    if (!heroImage) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        heroImage.style.transform = `translateY(${rate}px)`;
    });
}

// ===================== TEAMS SECTION =====================
function initTeams() {
    const teamsGrid = document.getElementById('teamsGrid');
    const groupsNav = document.getElementById('groupsNav');
    if (!teamsGrid) return;

    const groups = DATA.groups;

    function renderTeams(filter = 'all') {
        teamsGrid.innerHTML = '';
        Object.keys(groups).forEach(groupLetter => {
            if (filter !== 'all' && filter !== groupLetter) return;
            const group = groups[groupLetter];
            group.teams.forEach(team => {
                const card = document.createElement('div');
                card.className = 'team-card reveal';
                card.setAttribute('data-group', groupLetter);
                const flag = DATA.flags[team.name] || '🏳️';
                card.innerHTML = `
                    <span class="team-flag">${flag}</span>
                    <div class="team-name">${team.name}</div>
                    <div class="team-group">Group ${groupLetter}</div>
                `;
                teamsGrid.appendChild(card);
            });
        });
        if (typeof initScrollReveal === 'function') setTimeout(initScrollReveal, 50);
    }

    renderTeams();

    if (groupsNav) {
        groupsNav.addEventListener('click', e => {
            const tab = e.target.closest('.group-tab');
            if (!tab) return;
            groupsNav.querySelectorAll('.group-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderTeams(tab.dataset.group);
        });
    }
}

// ===================== GRAPHIC FIXTURES =====================
function initGraphicFixtures() {
    const grid = document.getElementById('fixturesGraphicGrid');
    if (!grid) return;

    const fixtures = DATA.fixtures.filter(f => f.stage === 'group').slice(0, 24);

    fixtures.forEach(match => {
        const card = document.createElement('div');
        card.className = 'fixture-graphic-card reveal';
        const flag1 = DATA.flags[match.team1.name] || '🏳️';
        const flag2 = DATA.flags[match.team2.name] || '🏳️';
        const groupLetter = match.group || '';
        card.innerHTML = `
            <div class="fg-team">
                <span class="fg-flag">${flag1}</span>
                <div class="fg-name">${match.team1.name}</div>
            </div>
            <div class="fg-center">
                <div class="fg-vs">VS</div>
                <div class="fg-info">${match.date}<br>${match.time}</div>
                ${groupLetter ? `<span class="fg-group-badge">Group ${groupLetter}</span>` : ''}
            </div>
            <div class="fg-team">
                <span class="fg-flag">${flag2}</span>
                <div class="fg-name">${match.team2.name}</div>
            </div>
        `;
        grid.appendChild(card);
    });
    if (typeof initScrollReveal === 'function') setTimeout(initScrollReveal, 50);
}

// News Section
function initNews() {
    const newsGrid = document.getElementById('newsGrid');
    if (!newsGrid) return;
    
    const gradients = [
        'linear-gradient(135deg, #7B2FBE, #00D4AA)',
        'linear-gradient(135deg, #00BFFF, #7B2FBE)',
        'linear-gradient(135deg, #FFD700, #FF6B6B)',
        'linear-gradient(135deg, #00D4AA, #00BFFF)',
        'linear-gradient(135deg, #7B2FBE, #FFD700)',
        'linear-gradient(135deg, #00BFFF, #00D4AA)'
    ];
    
    DATA.news.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'news-card reveal';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="news-card-image" style="background: ${gradients[index % gradients.length]}">
                <span>⚽</span>
            </div>
            <div class="news-card-content">
                <span class="news-card-tag">${item.tag}</span>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
                <div class="news-card-meta">
                    <span>${item.date}</span>
                    <a href="#">Read More →</a>
                </div>
            </div>
        `;
        
        newsGrid.appendChild(card);
    });
    
    // Re-initialize scroll reveal for new elements
    setTimeout(initScrollReveal, 100);
}

// Fixtures Section
function initFixtures() {
    const fixturesList = document.getElementById('fixturesList');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    if (!fixturesList || !filterBtns.length) return;
    
    function renderFixtures(filter = 'all') {
        fixturesList.innerHTML = '';
        
        let filteredFixtures = DATA.fixtures.filter(f => f.stage !== 'fifa-series');
        
        if (filter === 'solomon') {
            filteredFixtures = DATA.fixtures.filter(f => f.solomon);
        } else if (filter === 'group') {
            filteredFixtures = DATA.fixtures.filter(f => f.stage === 'group');
        } else if (filter === 'knockout') {
            filteredFixtures = DATA.fixtures.filter(f => f.stage === 'knockout');
        } else if (filter === 'opening') {
            filteredFixtures = DATA.fixtures.filter(f => f.id <= 6);
        } else if (filter === 'today') {
            const today = new Date();
            const todayStr = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            filteredFixtures = DATA.fixtures.filter(f => f.date.includes('June 11'));
        }
        
        filteredFixtures.forEach((fixture, index) => {
            const item = document.createElement('div');
            item.className = 'fixture-item reveal';
            item.style.animationDelay = `${index * 0.05}s`;
            if (fixture.solomon) {
                item.style.borderLeft = '4px solid var(--secondary)';
            }
            
            const groupBadge = fixture.group ? `<span style="background: var(--primary); color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 600; margin-left: 8px;">Group ${fixture.group}</span>` : '';
            const roundBadge = fixture.round ? `<span style="background: var(--gold); color: var(--darkest); padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 600; margin-left: 8px;">${fixture.round}</span>` : '';
            
            item.innerHTML = `
                <div class="fixture-team">
                    <span class="flag">${fixture.team1.flag}</span>
                    <span>${fixture.team1.name}</span>
                </div>
                <div class="fixture-score">VS</div>
                <div class="fixture-team">
                    <span class="flag">${fixture.team2.flag}</span>
                    <span>${fixture.team2.name}</span>
                </div>
                <div class="fixture-info">
                    📅 ${fixture.date} | ⏰ ${fixture.time} | 📍 ${fixture.venue} ${groupBadge || roundBadge}
                </div>
            `;
            
            fixturesList.appendChild(item);
        });
        
        // Re-initialize scroll reveal
        setTimeout(initScrollReveal, 50);
    }
    
    // Filter buttons with ripple effect
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.3);
                width: 100px;
                height: 100px;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
            
            renderFixtures(this.dataset.filter);
        });
    });
    
    renderFixtures();
}

// Downloads Section
function initDownloads() {
    const downloadsGrid = document.getElementById('downloadsGrid');
    if (!downloadsGrid) return;
    
    const icons = ['📅', '🏆', '📱', '🎯', '⚽', '🧠'];
    
    DATA.downloads.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'download-card reveal';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="download-icon">
                <span>${item.icon}</span>
            </div>
            <div class="download-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <a href="${item.file}" class="download-btn" download>Download ${item.type}</a>
            </div>
        `;
        
        downloadsGrid.appendChild(card);
    });
    
    setTimeout(initScrollReveal, 100);
}

// Polls Section with Local Storage
function initPolls() {
    const polls = ['poll1', 'poll2'];
    
    polls.forEach(pollId => {
        const pollContainer = document.getElementById(pollId);
        if (!pollContainer) return;
        
        const options = pollContainer.querySelectorAll('.poll-option');
        const totalSpan = document.getElementById(`${pollId}Total`);
        
        // Load saved votes
        let votes = JSON.parse(localStorage.getItem(`poll_${pollId}`)) || {};
        let totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
        
        // Update display
        options.forEach((option, index) => {
            const voteCount = votes[index] || 0;
            option.dataset.votes = voteCount;
            if (voteCount > 0) {
                const emoji = option.textContent.match(/^[\u{1F1E0}-\u{1F1FF}]{2}/u)?.[0] || '';
                const name = option.textContent.replace(/^[\u{1F1E0}-\u{1F1FF}]{2}\s*/u, '').split(' (')[0];
                option.textContent = `${emoji} ${name} (${voteCount} votes)`;
            }
        });
        totalSpan.textContent = totalVotes;
        
        // Handle clicks with animation
        options.forEach((option, index) => {
            option.addEventListener('click', function() {
                if (this.classList.contains('voted')) return;
                
                // Remove previous vote if exists
                const previousVote = localStorage.getItem(`poll_${pollId}_userVote`);
                if (previousVote !== null) {
                    votes[previousVote] = Math.max(0, (votes[previousVote] || 0) - 1);
                }
                
                // Mark as voted
                options.forEach(o => o.classList.remove('voted'));
                this.classList.add('voted');
                
                // Update votes
                votes[index] = (votes[index] || 0) + 1;
                localStorage.setItem(`poll_${pollId}`, JSON.stringify(votes));
                localStorage.setItem(`poll_${pollId}_userVote`, index.toString());
                
                // Animation
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
                // Refresh display
                initPolls();
            });
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('mainNav');
    
    if (!menuBtn || !nav) return;
    
    menuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.textContent = nav.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuBtn.textContent = '☰';
        });
    });
}

// Smooth Scroll Navigation
function initNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Update active state
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Update active state on scroll with throttle
    let lastScrollY = 0;
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        lastScrollY = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// News Ticker
function initTicker() {
    const ticker = document.getElementById('ticker');
    if (!ticker) return;
    
    // Clone content for seamless loop
    const content = ticker.innerHTML;
    ticker.innerHTML = content + content;
}

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Export functions for external use
window.HTWorldCup = {
    refreshNews: initNews,
    refreshFixtures: initFixtures,
    refreshDownloads: initDownloads,
    refreshPolls: initPolls,
    refreshScrollReveal: initScrollReveal,
    refreshLiveScores: initLiveScores
};

// ===================== LIVE SCORES =====================
function initLiveScores() {
    const liveSection = document.getElementById('live-scores');
    const liveGrid = document.getElementById('liveScoresGrid');
    if (!liveSection || !liveGrid) return;
    
    // Sample live match data (would be fetched from API in production)
    const liveMatches = [
        {
            id: 1,
            team1: { name: "Mexico", flag: "🇲🇽", score: 1 },
            team2: { name: "South Africa", flag: "🇿🇦", score: 0 },
            minute: 34,
            status: "1st Half",
            venue: "Mexico City Stadium"
        }
    ];
    
    // Check if any matches are live (simulated)
    const now = new Date();
    const isMatchDay = now.getDay() === 3 || now.getDay() === 6; // Wed or Sat
    
    if (isMatchDay && liveMatches.length > 0) {
        liveSection.style.display = 'block';
        liveGrid.innerHTML = '';
        
        liveMatches.forEach(match => {
            const card = document.createElement('div');
            card.className = 'live-score-card';
            card.innerHTML = `
                <div class="live-score-teams">
                    <div class="live-score-team">
                        <span class="flag">${match.team1.flag}</span>
                        <div class="name">${match.team1.name}</div>
                    </div>
                    <div class="live-score-result">${match.team1.score} - ${match.team2.score}</div>
                    <div class="live-score-team">
                        <span class="flag">${match.team2.flag}</span>
                        <div class="name">${match.team2.name}</div>
                    </div>
                </div>
                <div class="live-score-info">
                    ⏱️ ${match.minute}' - ${match.status} | 📍 ${match.venue}
                </div>
            `;
            liveGrid.appendChild(card);
        });
    }
}

// ===================== BACK TO TOP =====================
function initBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.innerHTML = '↑';
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===================== SEARCH OVERLAY =====================
function initSearchOverlay() {
    // Create search overlay
    const overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.innerHTML = `
        <div class="search-container">
            <input type="text" class="search-input" placeholder="Search news, fixtures, teams..." aria-label="Search">
            <button class="search-close" aria-label="Close search">×</button>
        </div>
    `;
    document.body.appendChild(overlay);
    
    // Open search with Ctrl+K or Cmd+K
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            overlay.classList.add('active');
            overlay.querySelector('.search-input').focus();
        }
        if (e.key === 'Escape') {
            overlay.classList.remove('active');
        }
    });
    
    // Close on click outside
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
        }
    });
    
    overlay.querySelector('.search-close').addEventListener('click', () => {
        overlay.classList.remove('active');
    });
}

// ===================== KEYBOARD SHORTCUTS =====================
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // ? for help
        if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
            const activeElement = document.activeElement;
            const isInput = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA';
            if (!isInput) {
                showNotification('Keyboard shortcuts: Ctrl+K = Search, ↑ = Back to top', 'info');
            }
        }
    });
}

// ===================== PERFORMANCE MONITORING =====================
if ('PerformanceObserver' in window) {
    // Log Core Web Vitals
    try {
        const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {}
    
    try {
        const fidObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        });
        fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {}
}
