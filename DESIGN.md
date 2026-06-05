# Design System: HT World Cup 2026 Hub
**Project:** Honiara Today World Cup Hub

## 1. Visual Theme & Atmosphere

The HT World Cup Hub embodies an **energetic, celebratory stadium atmosphere** that captures the excitement and passion of global football. The design philosophy is **bold and immersive**, combining dark cinematic backgrounds with vibrant accent colors that evoke the electric energy of match night under floodlights.

The overall mood is **dynamic yet focused**, creating an engaging experience that feels like being inside a World Cup stadium. The interface uses **high-contrast visual hierarchy** with glowing accents that draw attention to key content while maintaining readability. The atmosphere evokes the communal excitement of football fans gathering to celebrate the beautiful game.

**Key Characteristics:**
- Dark cinematic base creating stadium-night ambiance
- Vibrant purple-to-teal gradient accents for energetic visual pops
- Bold typography with strong hierarchy for information density
- Glowing hover effects simulating stadium light interactions
- Animated news ticker for real-time energy
- Mobile-first responsive design for fans on the go

## 2. Color Palette & Roles

### Primary Foundation
- **Deep Stadium Night** (#1a1a2e) – Primary background. Creates the immersive dark canvas reminiscent of a night match under floodlights.
- **Darker Void** (#16162a) – Secondary background for cards, headers, and elevated surfaces. Provides subtle depth layering against the primary dark.

### Accent & Interactive
- **Electric Purple** (#7B2FBE) – Primary brand color. Used for navigation highlights, section borders, primary buttons, and brand identity. Evokes the passion and royalty of football.
- **Deep Purple** (#5A1F8E) – Darker variant for gradients and hover states. Adds depth to the primary purple.
- **Neon Teal** (#00D4AA) – Secondary accent. Used for Solomon Islands focus elements, secondary CTAs, and success states. Represents the Pacific Ocean connection.
- **Sky Blue** (#00BFFF) – Tertiary accent for gradient blends and subtle highlights. Adds coolness to the warm purple palette.
- **Golden Trophy** (#FFD700) – Accent for countdown numbers, VS indicators, and premium highlights. Represents the ultimate prize.

### Typography & Text Hierarchy
- **Pure White** (#ffffff) – Primary text for headlines and critical information. Maximum contrast on dark backgrounds.
- **Light Gray** (#e0e0e0) – Body text and general content. Comfortable readability without harsh contrast.
- **Muted Silver** (#a0a0a0) – Secondary text, metadata, timestamps. Visually recessive but still legible.

### Functional States
- **Victory Green** (#28a745) – Success states, confirmations, positive indicators
- **Danger Red** (#dc3545) – Error states, warnings, critical alerts
- **Caution Amber** (#ffc107) – Warning states, attention needed

## 3. Typography Rules

**Primary Font Family:** Segoe UI, Tahoma, Geneva, Verdana, sans-serif
**Character:** System font stack with humanist warmth. Clean, legible, and universally available across platforms.

### Hierarchy & Weights
- **Hero Headlines (H1):** Bold weight (700), gradient text effect (purple-to-teal), 2.5rem size. Creates maximum visual impact for the tournament title.
- **Section Titles (H2):** Bold weight (700), pure white, 2rem size. Clear section demarcation with decorative underline accent.
- **Card Headers (H3):** Semi-bold weight (600), white, 1.1-1.3rem size. Content hierarchy within cards.
- **Body Text:** Regular weight (400), light gray, 1rem size, 1.6 line-height. Comfortable reading for descriptions and content.
- **Small Text/Meta:** Regular weight (400), muted silver, 0.8-0.9rem size. Timestamps, labels, supporting information.
- **Button Text:** Bold weight (700), uppercase for primary actions, 0.9-1rem size. Strong call-to-action presence.

### Spacing Principles
- Section padding: 60px vertical for generous breathing room
- Card internal padding: 20-25px for comfortable content framing
- Grid gaps: 25px between cards for clear visual separation
- Consistent 8px base unit for micro-spacing

## 4. Component Stylings

### Buttons
- **Shape:** Pill-shaped (30px border-radius) – friendly, approachable, and distinctly clickable
- **Primary CTA:** Gradient background (Neon Teal to Sky Blue), dark text, generous padding (15px vertical, 30px horizontal)
- **Secondary CTA:** Transparent background with Electric Purple border, white text
- **Hover State:** translateY(-3px) lift with glowing box-shadow, smooth 300ms ease transition
- **Small Variant:** Reduced padding (10px vertical, 20px horizontal), 20px border-radius

### Cards & Containers
- **Corner Style:** Moderately rounded corners (15px radius) – balanced between playful and professional
- **Background:** Darker Void (#16162a) with 1px semi-transparent white border
- **Shadow Strategy:** Flat by default. On hover, Electric Purple glow border appears with subtle lift
- **Internal Padding:** 20-25px creating comfortable content breathing room
- **Animation:** fadeIn entrance animation (0.5s ease) with staggered delays for list items

### Navigation
- **Style:** Horizontal layout with generous gap (20px) between items
- **Typography:** Regular weight, light gray text, 16px border-radius pill shapes
- **Default State:** Transparent background, light gray text
- **Active/Hover State:** Electric Purple background with white text
- **Mobile:** Converts to hamburger menu with slide-down overlay
- **Sticky Position:** Fixed at top with 3px Electric Purple bottom border

### Inputs & Forms
- **Stroke Style:** 2px border in Electric Purple
- **Background:** Deep Stadium Night with light text
- **Corner Style:** 8px rounded corners
- **Focus State:** Border color shifts to Neon Teal

### Special Components
- **Countdown Timer:** Glassmorphic containers (rgba white background, backdrop-filter blur) with Golden Trophy numbers
- **News Ticker:** Scrolling horizontal animation (30s linear infinite) with Electric Purple background
- **Match Fixtures:** Grid layout with team flags, VS indicator in gold, info row below

## 5. Layout Principles

### Grid & Structure
- **Max Content Width:** 1200px for optimal readability
- **Grid System:** CSS Grid with auto-fit columns for responsive behavior
- **News Grid:** 3-column desktop, 2-column tablet, 1-column mobile
- **Downloads Grid:** 3-column desktop, 2-column tablet, 1-column mobile
- **Quick Links:** 4-column desktop, 2-column mobile

### Whitespace Strategy
- **Section Vertical Padding:** 60px between major sections
- **Card Internal Padding:** 20-25px
- **Grid Gaps:** 25px between cards
- **Hero Section:** 80px vertical padding for impactful presentation

### Responsive Breakpoints
- **Mobile:** <768px – Single column, stacked layouts, hamburger menu
- **Tablet:** 768-1024px – 2-column grids, adjusted spacing
- **Desktop:** >1024px – Full multi-column layouts, horizontal navigation

### Visual Balance
- **Text Alignment:** Centered for hero and section titles, left-aligned for content
- **Image Treatment:** Object-fit cover for consistent sizing, gradient overlays for text legibility
- **Color Distribution:** Dark backgrounds with strategic vibrant accents drawing eyes to CTAs
- **Reading Flow:** Clear top-to-bottom progression with anchored navigation

## 6. Design System Notes for Enhancement

### Language for Consistent Styling
- **Atmosphere:** "Energetic stadium-night ambiance with cinematic dark foundations"
- **Buttons:** "Friendly pill-shaped with glowing hover lift effects"
- **Shadows:** "Electric Purple glow borders on hover" (not generic box-shadows)
- **Spacing:** "Generous section breathing room with tight card framing"

### Color References for New Components
- Primary brand: "Electric Purple (#7B2FBE)"
- Secondary accent: "Neon Teal (#00D4AA)"
- Premium highlight: "Golden Trophy (#FFD700)"
- Backgrounds: "Deep Stadium Night (#1a1a2e)" and "Darker Void (#16162a)"

### Enhancement Opportunities
1. Add glassmorphism effects to more card components
2. Implement smooth scroll-reveal animations for sections
3. Add particle effects or animated backgrounds for hero
4. Enhance mobile touch interactions
5. Add dark/light theme toggle
6. Implement progressive loading for images
7. Add micro-interactions for poll voting
8. Enhance countdown with flip-clock animation
