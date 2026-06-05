// HT World Cup Hub - Data (Updated June 6, 2026)

const DATA = {
    // Last Updated
    lastUpdated: "2026-06-06T04:462026-06-06T16:00:00.000Z",

    // Tournament Info
    tournament: {
        name: "FIFA World Cup 2026",
        host: "USA, Mexico & Canada",
        startDate: "2026-06-11T16:00:00-04:00",
        endDate: "2026-07-19",
        totalTeams: 48,
        totalMatches: 104,
        totalGroups: 12,
        hostCities: 16
    },

    // Latest News (June 2026)
    news: [
        {
            id: 101,
            title: "All 48 Squads Confirmed - 1,248 Players Ready",
            summary: "FIFA confirms final squad lists from all 48 nations. Record 1,248 players representing 449 clubs from 71 countries. Replacements only for serious injury up to 24 hours before first match.",
            tag: "Breaking",
            date: "June 2, 2026",
            image: "football1.jpg"
        },
        {
            id: 102,
            title: "FIFA Bans Water Bottles from Stadiums",
            summary: "Last-minute policy change prohibits fans from bringing reusable water bottles into World Cup venues. FIFA cites safety concerns. Hydration stations will be available at all venues.",
            tag: "FIFA Update",
            date: "June 4, 2026",
            image: "football2.jpg"
        },
        {
            id: 103,
            title: "New Laws of the Game to Debut",
            summary: "IFAB-approved changes to football laws begin with World Cup 2026. Rules designed to improve match pace and player safety. 'We are trying to clean the game,' says FIFA's Pierluigi Collina.",
            tag: "Rules",
            date: "June 4, 2026",
            image: "football3.jpg"
        },
        {
            id: 104,
            title: "Cote d'Ivoire Stuns France 2-1 in Friendly",
            summary: "Amad Diallo's 83rd minute strike seals historic first-ever victory for Les Elephants over France. Major upset signals exciting chaos ahead in World Cup group stage.",
            tag: "Friendly",
            date: "June 5, 2026",
            image: "football4.jpg"
        },
        {
            id: 105,
            title: "Iraq Draws with Spain - Merchas Doski Wonder Goal",
            summary: "Merchas Doski's incredible long-range strike earns Iraq a 1-1 draw against World Cup holders Spain. Pre-tournament friendlies delivering surprises across the board.",
            tag: "Friendly",
            date: "June 5, 2026",
            image: "football5.jpg"
        },
        {
            id: 106,
            title: "Messi Trains Alone - Argentina Monitor Fitness",
            summary: "Lionel Messi working individually during Argentina's first training session in Kansas City. Muscle fatigue in left hamstring being managed. Expected available for June 16 opener vs Algeria.",
            tag: "Injury News",
            date: "June 5, 2026",
            image: "football6.jpg"
        },
        {
            id: 107,
            title: "Lamine Yamal Expected Ready for Spain Opener",
            summary: "Barcelona star recovering from left hamstring injury (April 22). Spain manager De la Fuente: 'If nothing changes, he could be ready to play on June 15 against Cape Verde.'",
            tag: "Injury News",
            date: "June 5, 2026",
            image: "football7.jpg"
        },
        {
            id: 108,
            title: "Switzerland's Breel Embolo Finally Gets US Visa",
            summary: "Two-day delay after being denied boarding in Zurich. US authorities checked 2018 criminal conviction. Switzerland plays Australia Saturday before facing Qatar in opener.",
            tag: "Visa News",
            date: "June 5, 2026",
            image: "football8.jpg"
        },
        {
            id: 109,
            title: "Neymar to Miss Brazil's Warm-up vs Egypt",
            summary: "34-year-old recovering from right calf injury. Will remain in New Jersey as team travels to Cleveland. No official return date set. Brazil opens June 13 vs Morocco.",
            tag: "Injury News",
            date: "June 5, 2026",
            image: "football9.jpg"
        },
        {
            id: 110,
            title: "Iran Visa Crisis Continues - Squad Departs for Mexico",
            summary: "Team departs for Mexico base camp despite US visa delays. Federation chief Taj blames US for uncertainty. Iran to play all group games in US despite training in Mexico.",
            tag: "Visa News",
            date: "June 4, 2026",
            image: "football11.jpg"
        },
        {
            id: 111,
            title: "FIFA Ticket Glitch - Fans Get Free Tickets",
            summary: "About 60 fans purchased World Cup tickets for $0 due to system error. FIFA confirms tickets will be cancelled unless fans pay full price. Most expensive World Cup in history.",
            tag: "FIFA Update",
            date: "June 5, 2026",
            image: "football12.jpg"
        },
        {
            id: 112,
            title: "New Pre-Match Ceremony Announced",
            summary: "FIFA announces all squad members will gather for anthems, not just starting XI. 'Ensuring every individual experiences that symbolic moment of pride when representing their country.'",
            tag: "FIFA Update",
            date: "June 5, 2026",
            image: "football13.jpg"
        },
        {
            id: 113,
            title: "Japan Changes World Cup Training Site in Mexico",
            summary: "Samurai Blue moved from Tigres UANL to Monterrey's El Barrial after finding pitch in poor condition. Team still days away from arriving at Nashville base camp.",
            tag: "Team News",
            date: "June 5, 2026",
            image: "football14.jpg"
        },
        {
            id: 114,
            title: "USMNT Prepares for Germany Friendly",
            summary: "Mauricio Pochettino's squad faces Germany Saturday at 2:30pm ET in final warm-up. Chris Richards ruled out with ankle injury. Ricardo Pepi's playmaking gives US another option.",
            tag: "USMNT",
            date: "June 6, 2026",
            image: "football15.jpg"
        },
        {
            id: 115,
            title: "Iran Beat Mali 2-0 in Final Warm-up",
            summary: "Team departs for Mexico despite US visa delays. Federation chief Taj confident all visas will be issued. Iran plays New Zealand June 15 in Los Angeles.",
            tag: "Friendly",
            date: "June 5, 2026",
            image: "football16.jpg"
        }
    ],

    // World Cup 2026 Groups (Confirmed)
    groups: {
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
        "L": ["England", "Croatia", "Ghana", "Panama"]
    },

    // Complete Group Stage Fixtures
    fixtures: [
        // === GROUP A ===
        { id: 1, stage: "group", group: "A", team1: { name: "Mexico", flag: "🇲🇽" }, team2: { name: "South Africa", flag: "🇿🇦" }, date: "June 11, 2026", time: "15:00 ET", venue: "Mexico City Stadium", solomon: false },
        { id: 2, stage: "group", group: "A", team1: { name: "Korea Republic", flag: "🇰🇷" }, team2: { name: "Czechia", flag: "🇨🇿" }, date: "June 11, 2026", time: "22:00 ET", venue: "Estadio Guadalajara", solomon: false },
        { id: 3, stage: "group", group: "A", team1: { name: "Czechia", flag: "🇨🇿" }, team2: { name: "South Africa", flag: "🇿🇦" }, date: "June 18, 2026", time: "12:00 ET", venue: "Atlanta Stadium", solomon: false },
        { id: 4, stage: "group", group: "A", team1: { name: "Mexico", flag: "🇲🇽" }, team2: { name: "Korea Republic", flag: "🇰🇷" }, date: "June 18, 2026", time: "21:00 ET", venue: "Estadio Guadalajara", solomon: false },
        { id: 5, stage: "group", group: "A", team1: { name: "Czechia", flag: "🇨🇿" }, team2: { name: "Mexico", flag: "🇲🇽" }, date: "June 24, 2026", time: "21:00 ET", venue: "Mexico City Stadium", solomon: false },
        { id: 6, stage: "group", group: "A", team1: { name: "South Africa", flag: "🇿🇦" }, team2: { name: "Korea Republic", flag: "🇰🇷" }, date: "June 24, 2026", time: "21:00 ET", venue: "Estadio Monterrey", solomon: false },

        // === GROUP B ===
        { id: 7, stage: "group", group: "B", team1: { name: "Canada", flag: "🇨🇦" }, team2: { name: "Bosnia and Herzegovina", flag: "🇧🇦" }, date: "June 12, 2026", time: "15:00 ET", venue: "BMO Field, Toronto", solomon: false },
        { id: 8, stage: "group", group: "B", team1: { name: "Qatar", flag: "🇶🇦" }, team2: { name: "Switzerland", flag: "🇨🇭" }, date: "June 13, 2026", time: "15:00 ET", venue: "Levi's Stadium", solomon: false },
        { id: 9, stage: "group", group: "B", team1: { name: "Switzerland", flag: "🇨🇭" }, team2: { name: "Bosnia and Herzegovina", flag: "🇧🇦" }, date: "June 18, 2026", time: "15:00 ET", venue: "SoFi Stadium", solomon: false },
        { id: 10, stage: "group", group: "B", team1: { name: "Canada", flag: "🇨🇦" }, team2: { name: "Qatar", flag: "🇶🇦" }, date: "June 18, 2026", time: "18:00 ET", venue: "BC Place, Vancouver", solomon: false },
        { id: 11, stage: "group", group: "B", team1: { name: "Switzerland", flag: "🇨🇭" }, team2: { name: "Canada", flag: "🇨🇦" }, date: "June 24, 2026", time: "15:00 ET", venue: "BC Place, Vancouver", solomon: false },
        { id: 12, stage: "group", group: "B", team1: { name: "Bosnia and Herzegovina", flag: "🇧🇦" }, team2: { name: "Qatar", flag: "🇶🇦" }, date: "June 24, 2026", time: "15:00 ET", venue: "Lumen Field, Seattle", solomon: false },

        // === GROUP C ===
        { id: 13, stage: "group", group: "C", team1: { name: "Brazil", flag: "🇧🇷" }, team2: { name: "Morocco", flag: "🇲🇦" }, date: "June 13, 2026", time: "18:00 ET", venue: "MetLife Stadium", solomon: false },
        { id: 14, stage: "group", group: "C", team1: { name: "Haiti", flag: "🇭🇹" }, team2: { name: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" }, date: "June 13, 2026", time: "21:00 ET", venue: "Gillette Stadium", solomon: false },
        { id: 15, stage: "group", group: "C", team1: { name: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" }, team2: { name: "Morocco", flag: "🇲🇦" }, date: "June 19, 2026", time: "18:00 ET", venue: "Gillette Stadium", solomon: false },
        { id: 16, stage: "group", group: "C", team1: { name: "Brazil", flag: "🇧🇷" }, team2: { name: "Haiti", flag: "🇭🇹" }, date: "June 19, 2026", time: "20:30 ET", venue: "Lincoln Financial Field", solomon: false },
        { id: 17, stage: "group", group: "C", team1: { name: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" }, team2: { name: "Brazil", flag: "🇧🇷" }, date: "June 24, 2026", time: "18:00 ET", venue: "Hard Rock Stadium", solomon: false },
        { id: 18, stage: "group", group: "C", team1: { name: "Morocco", flag: "🇲🇦" }, team2: { name: "Haiti", flag: "🇭🇹" }, date: "June 24, 2026", time: "18:00 ET", venue: "Atlanta Stadium", solomon: false },

        // === GROUP D ===
        { id: 19, stage: "group", group: "D", team1: { name: "USA", flag: "🇺🇸" }, team2: { name: "Paraguay", flag: "🇵🇾" }, date: "June 12, 2026", time: "21:00 ET", venue: "SoFi Stadium", solomon: false },
        { id: 20, stage: "group", group: "D", team1: { name: "Australia", flag: "🇦🇺" }, team2: { name: "Türkiye", flag: "🇹🇷" }, date: "June 13, 2026", time: "00:00 ET", venue: "BC Place, Vancouver", solomon: false },
        { id: 21, stage: "group", group: "D", team1: { name: "USA", flag: "🇺🇸" }, team2: { name: "Australia", flag: "🇦🇺" }, date: "June 19, 2026", time: "15:00 ET", venue: "Lumen Field, Seattle", solomon: false },
        { id: 22, stage: "group", group: "D", team1: { name: "Türkiye", flag: "🇹🇷" }, team2: { name: "Paraguay", flag: "🇵🇾" }, date: "June 19, 2026", time: "23:00 ET", venue: "Levi's Stadium", solomon: false },
        { id: 23, stage: "group", group: "D", team1: { name: "Türkiye", flag: "🇹🇷" }, team2: { name: "USA", flag: "🇺🇸" }, date: "June 25, 2026", time: "22:00 ET", venue: "SoFi Stadium", solomon: false },
        { id: 24, stage: "group", group: "D", team1: { name: "Paraguay", flag: "🇵🇾" }, team2: { name: "Australia", flag: "🇦🇺" }, date: "June 25, 2026", time: "22:00 ET", venue: "Levi's Stadium", solomon: false },

        // === GROUP E ===
        { id: 25, stage: "group", group: "E", team1: { name: "Germany", flag: "🇩🇪" }, team2: { name: "Curaçao", flag: "🇨🇼" }, date: "June 14, 2026", time: "13:00 ET", venue: "NRG Stadium, Houston", solomon: false },
        { id: 26, stage: "group", group: "E", team1: { name: "Côte d'Ivoire", flag: "🇨🇮" }, team2: { name: "Ecuador", flag: "🇪🇨" }, date: "June 14, 2026", time: "19:00 ET", venue: "Lincoln Financial Field", solomon: false },
        { id: 27, stage: "group", group: "E", team1: { name: "Germany", flag: "🇩🇪" }, team2: { name: "Côte d'Ivoire", flag: "🇨🇮" }, date: "June 20, 2026", time: "16:00 ET", venue: "BMO Field, Toronto", solomon: false },
        { id: 28, stage: "group", group: "E", team1: { name: "Ecuador", flag: "🇪🇨" }, team2: { name: "Curaçao", flag: "🇨🇼" }, date: "June 20, 2026", time: "20:00 ET", venue: "Arrowhead Stadium", solomon: false },
        { id: 29, stage: "group", group: "E", team1: { name: "Curaçao", flag: "🇨🇼" }, team2: { name: "Côte d'Ivoire", flag: "🇨🇮" }, date: "June 25, 2026", time: "16:00 ET", venue: "Lincoln Financial Field", solomon: false },
        { id: 30, stage: "group", group: "E", team1: { name: "Ecuador", flag: "🇪🇨" }, team2: { name: "Germany", flag: "🇩🇪" }, date: "June 25, 2026", time: "16:00 ET", venue: "MetLife Stadium", solomon: false },

        // === GROUP F ===
        { id: 31, stage: "group", group: "F", team1: { name: "Netherlands", flag: "🇳🇱" }, team2: { name: "Japan", flag: "🇯🇵" }, date: "June 14, 2026", time: "16:00 ET", venue: "AT&T Stadium", solomon: false },
        { id: 32, stage: "group", group: "F", team1: { name: "Sweden", flag: "🇸🇪" }, team2: { name: "Tunisia", flag: "🇹🇳" }, date: "June 14, 2026", time: "22:00 ET", venue: "Estadio Monterrey", solomon: false },
        { id: 33, stage: "group", group: "F", team1: { name: "Netherlands", flag: "🇳🇱" }, team2: { name: "Sweden", flag: "🇸🇪" }, date: "June 20, 2026", time: "13:00 ET", venue: "NRG Stadium, Houston", solomon: false },
        { id: 34, stage: "group", group: "F", team1: { name: "Tunisia", flag: "🇹🇳" }, team2: { name: "Japan", flag: "🇯🇵" }, date: "June 20, 2026", time: "00:00 ET", venue: "Estadio Monterrey", solomon: false },
        { id: 35, stage: "group", group: "F", team1: { name: "Japan", flag: "🇯🇵" }, team2: { name: "Sweden", flag: "🇸🇪" }, date: "June 25, 2026", time: "19:00 ET", venue: "AT&T Stadium", solomon: false },
        { id: 36, stage: "group", group: "F", team1: { name: "Tunisia", flag: "🇹🇳" }, team2: { name: "Netherlands", flag: "🇳🇱" }, date: "June 25, 2026", time: "19:00 ET", venue: "Arrowhead Stadium", solomon: false },

        // === GROUP G ===
        { id: 37, stage: "group", group: "G", team1: { name: "Belgium", flag: "🇧🇪" }, team2: { name: "Egypt", flag: "🇪🇬" }, date: "June 15, 2026", time: "15:00 ET", venue: "Lumen Field, Seattle", solomon: false },
        { id: 38, stage: "group", group: "G", team1: { name: "IR Iran", flag: "🇮🇷" }, team2: { name: "New Zealand", flag: "🇳🇿" }, date: "June 15, 2026", time: "21:00 ET", venue: "SoFi Stadium", solomon: false },
        { id: 39, stage: "group", group: "G", team1: { name: "Belgium", flag: "🇧🇪" }, team2: { name: "IR Iran", flag: "🇮🇷" }, date: "June 21, 2026", time: "15:00 ET", venue: "SoFi Stadium", solomon: false },
        { id: 40, stage: "group", group: "G", team1: { name: "New Zealand", flag: "🇳🇿" }, team2: { name: "Egypt", flag: "🇪🇬" }, date: "June 21, 2026", time: "21:00 ET", venue: "BC Place, Vancouver", solomon: false },
        { id: 41, stage: "group", group: "G", team1: { name: "Egypt", flag: "🇪🇬" }, team2: { name: "IR Iran", flag: "🇮🇷" }, date: "June 26, 2026", time: "23:00 ET", venue: "Lumen Field, Seattle", solomon: false },
        { id: 42, stage: "group", group: "G", team1: { name: "New Zealand", flag: "🇳🇿" }, team2: { name: "Belgium", flag: "🇧🇪" }, date: "June 26, 2026", time: "23:00 ET", venue: "BC Place, Vancouver", solomon: false },

        // === GROUP H ===
        { id: 43, stage: "group", group: "H", team1: { name: "Spain", flag: "🇪🇸" }, team2: { name: "Cabo Verde", flag: "🇨🇻" }, date: "June 15, 2026", time: "12:00 ET", venue: "Atlanta Stadium", solomon: false },
        { id: 44, stage: "group", group: "H", team1: { name: "Saudi Arabia", flag: "🇸🇦" }, team2: { name: "Uruguay", flag: "🇺🇾" }, date: "June 15, 2026", time: "18:00 ET", venue: "Hard Rock Stadium", solomon: false },
        { id: 45, stage: "group", group: "H", team1: { name: "Spain", flag: "🇪🇸" }, team2: { name: "Saudi Arabia", flag: "🇸🇦" }, date: "June 21, 2026", time: "12:00 ET", venue: "Atlanta Stadium", solomon: false },
        { id: 46, stage: "group", group: "H", team1: { name: "Uruguay", flag: "🇺🇾" }, team2: { name: "Cabo Verde", flag: "🇨🇻" }, date: "June 21, 2026", time: "18:00 ET", venue: "Hard Rock Stadium", solomon: false },
        { id: 47, stage: "group", group: "H", team1: { name: "Cabo Verde", flag: "🇨🇻" }, team2: { name: "Saudi Arabia", flag: "🇸🇦" }, date: "June 26, 2026", time: "20:00 ET", venue: "NRG Stadium, Houston", solomon: false },
        { id: 48, stage: "group", group: "H", team1: { name: "Uruguay", flag: "🇺🇾" }, team2: { name: "Spain", flag: "🇪🇸" }, date: "June 26, 2026", time: "20:00 ET", venue: "Estadio Guadalajara", solomon: false },

        // === GROUP I ===
        { id: 49, stage: "group", group: "I", team1: { name: "France", flag: "🇫🇷" }, team2: { name: "Senegal", flag: "🇸🇳" }, date: "June 16, 2026", time: "15:00 ET", venue: "MetLife Stadium", solomon: false },
        { id: 50, stage: "group", group: "I", team1: { name: "Iraq", flag: "🇮🇶" }, team2: { name: "Norway", flag: "🇳🇴" }, date: "June 16, 2026", time: "18:00 ET", venue: "Gillette Stadium", solomon: false },
        { id: 51, stage: "group", group: "I", team1: { name: "France", flag: "🇫🇷" }, team2: { name: "Iraq", flag: "🇮🇶" }, date: "June 22, 2026", time: "17:00 ET", venue: "Lincoln Financial Field", solomon: false },
        { id: 52, stage: "group", group: "I", team1: { name: "Norway", flag: "🇳🇴" }, team2: { name: "Senegal", flag: "🇸🇳" }, date: "June 22, 2026", time: "20:00 ET", venue: "MetLife Stadium", solomon: false },
        { id: 53, stage: "group", group: "I", team1: { name: "Norway", flag: "🇳🇴" }, team2: { name: "France", flag: "🇫🇷" }, date: "June 26, 2026", time: "15:00 ET", venue: "Gillette Stadium", solomon: false },
        { id: 54, stage: "group", group: "I", team1: { name: "Senegal", flag: "🇸🇳" }, team2: { name: "Iraq", flag: "🇮🇶" }, date: "June 26, 2026", time: "15:00 ET", venue: "BMO Field, Toronto", solomon: false },

        // === GROUP J ===
        { id: 55, stage: "group", group: "J", team1: { name: "Argentina", flag: "🇦🇷" }, team2: { name: "Algeria", flag: "🇩🇿" }, date: "June 16, 2026", time: "21:00 ET", venue: "Arrowhead Stadium", solomon: false },
        { id: 56, stage: "group", group: "J", team1: { name: "Austria", flag: "🇦🇹" }, team2: { name: "Jordan", flag: "🇯🇴" }, date: "June 16, 2026", time: "00:00 ET", venue: "Levi's Stadium", solomon: false },
        { id: 57, stage: "group", group: "J", team1: { name: "Argentina", flag: "🇦🇷" }, team2: { name: "Austria", flag: "🇦🇹" }, date: "June 22, 2026", time: "13:00 ET", venue: "AT&T Stadium", solomon: false },
        { id: 58, stage: "group", group: "J", team1: { name: "Jordan", flag: "🇯🇴" }, team2: { name: "Algeria", flag: "🇩🇿" }, date: "June 22, 2026", time: "23:00 ET", venue: "Levi's Stadium", solomon: false },
        { id: 59, stage: "group", group: "J", team1: { name: "Jordan", flag: "🇯🇴" }, team2: { name: "Argentina", flag: "🇦🇷" }, date: "June 27, 2026", time: "22:00 ET", venue: "AT&T Stadium", solomon: false },
        { id: 60, stage: "group", group: "J", team1: { name: "Algeria", flag: "🇩🇿" }, team2: { name: "Austria", flag: "🇦🇹" }, date: "June 27, 2026", time: "22:00 ET", venue: "Arrowhead Stadium", solomon: false },

        // === GROUP K ===
        { id: 61, stage: "group", group: "K", team1: { name: "Portugal", flag: "🇵🇹" }, team2: { name: "Congo DR", flag: "🇨🇩" }, date: "June 17, 2026", time: "13:00 ET", venue: "NRG Stadium, Houston", solomon: false },
        { id: 62, stage: "group", group: "K", team1: { name: "Uzbekistan", flag: "🇺🇿" }, team2: { name: "Colombia", flag: "🇨🇴" }, date: "June 17, 2026", time: "22:00 ET", venue: "Mexico City Stadium", solomon: false },
        { id: 63, stage: "group", group: "K", team1: { name: "Portugal", flag: "🇵🇹" }, team2: { name: "Uzbekistan", flag: "🇺🇿" }, date: "June 23, 2026", time: "13:00 ET", venue: "NRG Stadium, Houston", solomon: false },
        { id: 64, stage: "group", group: "K", team1: { name: "Colombia", flag: "🇨🇴" }, team2: { name: "Congo DR", flag: "🇨🇩" }, date: "June 23, 2026", time: "22:00 ET", venue: "Estadio Guadalajara", solomon: false },
        { id: 65, stage: "group", group: "K", team1: { name: "Colombia", flag: "🇨🇴" }, team2: { name: "Portugal", flag: "🇵🇹" }, date: "June 27, 2026", time: "19:30 ET", venue: "Hard Rock Stadium", solomon: false },
        { id: 66, stage: "group", group: "K", team1: { name: "Congo DR", flag: "🇨🇩" }, team2: { name: "Uzbekistan", flag: "🇺🇿" }, date: "June 27, 2026", time: "19:30 ET", venue: "Atlanta Stadium", solomon: false },

        // === GROUP L ===
        { id: 67, stage: "group", group: "L", team1: { name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }, team2: { name: "Croatia", flag: "🇭🇷" }, date: "June 17, 2026", time: "16:00 ET", venue: "AT&T Stadium", solomon: false },
        { id: 68, stage: "group", group: "L", team1: { name: "Ghana", flag: "🇬🇭" }, team2: { name: "Panama", flag: "🇵🇦" }, date: "June 17, 2026", time: "19:00 ET", venue: "BMO Field, Toronto", solomon: false },
        { id: 69, stage: "group", group: "L", team1: { name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }, team2: { name: "Ghana", flag: "🇬🇭" }, date: "June 23, 2026", time: "16:00 ET", venue: "Gillette Stadium", solomon: false },
        { id: 70, stage: "group", group: "L", team1: { name: "Panama", flag: "🇵🇦" }, team2: { name: "Croatia", flag: "🇭🇷" }, date: "June 23, 2026", time: "19:00 ET", venue: "BMO Field, Toronto", solomon: false },
        { id: 71, stage: "group", group: "L", team1: { name: "Panama", flag: "🇵🇦" }, team2: { name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }, date: "June 27, 2026", time: "17:00 ET", venue: "MetLife Stadium", solomon: false },
        { id: 72, stage: "group", group: "L", team1: { name: "Croatia", flag: "🇭🇷" }, team2: { name: "Ghana", flag: "🇬🇭" }, date: "June 27, 2026", time: "17:00 ET", venue: "Lincoln Financial Field", solomon: false },

        // === KNOCKOUT STAGE (Key Matches) ===
        { id: 73, stage: "knockout", round: "Round of 32", team1: { name: "TBD", flag: "❓" }, team2: { name: "TBD", flag: "❓" }, date: "June 29, 2026", time: "TBC", venue: "Various Venues", solomon: false },
        { id: 74, stage: "knockout", round: "Round of 16", team1: { name: "TBD", flag: "❓" }, team2: { name: "TBD", flag: "❓" }, date: "July 3-4, 2026", time: "TBC", venue: "Various Venues", solomon: false },
        { id: 75, stage: "knockout", round: "Quarter-Finals", team1: { name: "TBD", flag: "❓" }, team2: { name: "TBD", flag: "❓" }, date: "July 9-10, 2026", time: "TBC", venue: "Various Venues", solomon: false },
        { id: 76, stage: "knockout", round: "Semi-Finals", team1: { name: "TBD", flag: "❓" }, team2: { name: "TBD", flag: "❓" }, date: "July 14-15, 2026", time: "TBC", venue: "Dallas / Atlanta", solomon: false },
        { id: 77, stage: "knockout", round: "FINAL", team1: { name: "TBD", flag: "❓" }, team2: { name: "TBD", flag: "❓" }, date: "July 19, 2026", time: "TBC", venue: "MetLife Stadium, New Jersey", solomon: false }
    ],

    // Downloads
    downloads: [
        {
            id: 1,
            title: "World Cup 2026 Complete Schedule",
            description: "Full printable schedule of all 104 matches across 16 cities. A4 size, perfect for your wall!",
            icon: "📅",
            file: "downloads/world-cup-2026-schedule.html",
            type: "PDF"
        },
        {
            id: 2,
            title: "Prediction Bracket Template",
            description: "Fill in your predictions for the entire tournament. Share with friends!",
            icon: "🏆",
            file: "downloads/prediction-bracket.html",
            type: "PDF"
        },
        {
            id: 4,
            title: "Match Day Bingo Cards",
            description: "Fun bingo cards for match days. Spot events and win!",
            icon: "🎯",
            file: "downloads/matchday-bingo.html",
            type: "PDF"
        },
        {
            id: 5,
            title: "All 48 Team Profile Cards",
            description: "Every qualified nation with key stats, star players, and fun facts.",
            icon: "⚽",
            file: "downloads/team-profile-cards.html",
            type: "PDF"
        },
        {
            id: 6,
            title: "World Cup Trivia Quiz",
            description: "Test your World Cup knowledge! 50 questions with answers.",
            icon: "🧠",
            file: "downloads/world-cup-trivia.html",
            type: "PDF"
        },
        {
            id: 7,
            title: "World Cup Wallpapers",
            description: "Phone and desktop wallpapers for all 48 teams. Download free!",
            icon: "🖼️",
            file: "downloads/wallpapers.html",
            type: "HTML"
        },
        {
            id: 8,
            title: "Live Score Tracker",
            description: "Real-time scores, standings, and match updates during the tournament.",
            icon: "📡",
            file: "downloads/live-tracker.html",
            type: "HTML"
        }
    ],

    // Team Flags Map
    flags: {
        "Mexico": "🇲🇽", "South Africa": "🇿🇦", "Korea Republic": "🇰🇷", "Czechia": "🇨🇿",
        "Canada": "🇨🇦", "Bosnia and Herzegovina": "🇧🇦", "Qatar": "🇶🇦", "Switzerland": "🇨🇭",
        "Brazil": "🇧🇷", "Morocco": "🇲🇦", "Haiti": "🇭🇹", "Scotland": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
        "USA": "🇺🇸", "Paraguay": "🇵🇾", "Australia": "🇦🇺", "Türkiye": "🇹🇷",
        "Germany": "🇩🇪", "Curaçao": "🇨🇼", "Côte d'Ivoire": "🇨🇮", "Ecuador": "🇪🇨",
        "Netherlands": "🇳🇱", "Japan": "🇯🇵", "Sweden": "🇸🇪", "Tunisia": "🇹🇳",
        "Belgium": "🇧🇪", "Egypt": "🇪🇬", "IR Iran": "🇮🇷", "New Zealand": "🇳🇿",
        "Spain": "🇪🇸", "Cabo Verde": "🇨🇻", "Saudi Arabia": "🇸🇦", "Uruguay": "🇺🇾",
        "France": "🇫🇷", "Senegal": "🇸🇳", "Iraq": "🇮🇶", "Norway": "🇳🇴",
        "Argentina": "🇦🇷", "Algeria": "🇩🇿", "Austria": "🇦🇹", "Jordan": "🇯🇴",
        "Portugal": "🇵🇹", "Congo DR": "🇨🇩", "Uzbekistan": "🇺🇿", "Colombia": "🇨🇴",
        "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "Croatia": "🇭🇷", "Ghana": "🇬🇭", "Panama": "🇵🇦"
    }
};
