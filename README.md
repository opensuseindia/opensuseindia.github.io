# openSUSE India Bengaluru Connect 2027
### *Learn. Build. Contribute.*

> **Flagship Full-Stack Digital Event Platform** for the two-day open-source gathering and 20-hour Geeko Buildathon at Newton School of Technology, Bengaluru (January 2027).

---

## 🌟 Executive Overview & Proposal Alignment

This platform is engineered as a **production-ready full-stack digital experience** adhering strictly to the **18-page official planning proposal** (`Planning proposal · Revised 08 Nov 2026`).

### Key Event Parameters (Single Source of Truth)
- **Event Name**: openSUSE India – Bengaluru Connect 2027
- **Date**: Two consecutive days in January 2027 (Exact dates TBA, decision-ready planning basis).
- **Venue**: Newton School of Technology, Bengaluru (College collaboration; venue, Wi-Fi for 350+ devices, and basic facilities provided free/in-kind).
- **Capacity**: Strict single pool of **250 participants**; all 250 may stay overnight. Working site headcount: **280** (250 builders + 30 support crew/mentors/organizers). Max **83 teams** of 3–4 members.
- **Signature Event**: **Geeko Buildathon** — exactly 20 hours (Day 1 14:30 IST First Commit Ceremony to Day 2 10:30 IST Commit Freeze).
- **Core Organizing Team (Page 11)**:
  - **Divyanshu Prakash**: Event coordination, community/funder liaison, website and budget register.
  - **Dushyant Acharya**: Program, speaker/mentor scheduling, Buildathon rules and judging.
  - **Rithull Raj Kallat**: Venue liaison, volunteer rosters, catering, logistics and safety readiness.
- **Base Planning Budget Envelope (Pages 14–16)**:
  - Total Planning Envelope: **₹2,57,840**
  - Catering Subtotal (280 servings): **₹1,20,400** (Day 1 welcome refreshments, lunch, evening tea/snacks, overnight dinner, late-night snacks, Day 2 breakfast).
  - Operations Subtotal: **₹64,000** (Security guard allowances, first aid cover, badges, signage, rest supplies, side rewards, trophies, certificates).
  - Conditional Top-Three Cash Prizes: **₹50,000** (Subject to sponsor funding; ₹25k / ₹15k / ₹10k).
  - 10% Direct Cost Contingency Reserve: **₹23,440**.
  - Current Confirmed Cash: **₹0** (Funding gap: ₹2,57,840).
- **Crucial Policy Enforcements**:
  - **Day 2 Lunch Notice**: Day 2 lunch is **not provided** by the catering envelope. Staggered breaks during the Demo Arena allow attendees to arrange lunch from nearby college cafes.
  - **T-Shirt Policy (Page 10)**: **No blanket free T-shirt distribution to attendees**. Exactly **25 printed shirts** are budgeted exclusively as earned competition rewards (12 for Top 3 teams, 2 for Bug Hunt, 4 for Arcade, 2 for Quest, 5 size buffer). Attendees who want official shirts can purchase them through the integrated Merch Preorder Shop.
  - **Overnight Stay (Page 13)**: Strictly **18+** with mandatory emergency contact collection and safety briefings.

---


## 🗺️ Complete Page Architecture

1. **`/` (Home)**: High-impact hero, 3D Canvas, live countdown to January 2027, live 250 capacity counter, 6 tracks snapshot, 20h buildathon journey preview, side events teaser, and sponsor wall.
2. **`/tracks` (Tracks & Rubric)**: Dedicated breakdown of all 6 Geeko Buildathon tracks (Terminal Titans, Root Access, GeekoOps, Desktop Reboot, Upstream Heroes, What Does Linux Need Next?), difficulty tiers, starter ideas, and official 5-point rubric (25% usefulness, 25% technical execution, 20% Linux relevance, 15% creativity, 15% documentation).
3. **`/schedule` (Schedule & Agenda)**: Interactive, filterable Day 1 and Day 2 timeline with calendar export (`.ics`), workshop tracks, and clear Day 2 lunch boundary disclosure.
4. **`/speakers` (Speakers & Workshops)**: Overview of Talks 1–3, parallel 45-min hands-on labs (Starter Lab & CI/CD Lab), and Call for Speakers (CFP) form.
5. **`/arcade` (Geeko Arcade)**: **Four fully playable mini-games** directly in the browser:
   - *Terminal Escape* (interactive bash terminal room puzzle)
   - *Linux Trivia Blitz* (60s rapid-fire quiz engine)
   - *Command Match* (interactive command-to-purpose matcher)
   - *Find the Geeko* (QR clue trail decoder)
6. **`/quest` (Geeko Quest Digital Passport)**: Mobile-friendly passport (no app download required) with 4 core missions, real-time XP accumulation, badge unlocks, and opt-in Wall of Fame.
7. **`/bug-hunt` (Midnight Bug Hunt)**: Day 2, 01:00–01:30 IST 30-min debugging sprint. Rookie Challenge (Bash script syntax/space/exit check repair) and Expert Challenge (AppArmor/systemd sandbox diagnosis) with live automated test harness.
8. **`/demo-arena` (Demo Arena & People's Choice)**: 83 exhibition spaces directory, 6 parallel judging lanes, live fraud-prevented People's Choice voting (1 vote per attendee pass), and Top 6 finalist stage leaderboard.
9. **`/prizes` (Prizes & Rewards)**: Transparent breakdown of conditional cash awards (₹25k / ₹15k / ₹10k), trophies, digital certificates, side rewards pool (₹6,000), and exact itemization of the 25 reward T-shirts.
10. **`/sponsors` (Sponsors & Budget)**: Detailed catering & operations budget breakdown, sensitivity analysis (150/200/250 participants), sponsorship tiers, and partner inquiry form.
11. **`/merch` (Merchandise Store)**: Official apparel (T-shirts, hoodies, sticker packs, desk mats) with shopping cart, size selector, and preorder voucher checkout.
12. **`/about` (About & Organizers)**: Community vision, Newton School of Technology collaboration, 3 core organizers, and 30-person support roster breakdown.
13. **`/venue` (Venue & Guide)**: Transit guide (Namma Metro, BMTC, cabs), Wi-Fi (350+ devices), power load testing, and what-to-bring checklist.
14. **`/faq` (FAQ)**: Searchable, categorized accordion addressing all common participant inquiries.
15. **`/register` (Registration)**: Multi-step attendee registration (individual or team of 3–4), dietary needs, 18+ overnight safety consent, and emergency contact collection.
16. **`/login` (Authentication)**: Fast login with 1-click test credential fills for Participant, Judge, and Admin roles.
17. **`/dashboard` (Participant Portal)**: Unique QR Attendee Pass (`GEEKO-2027-BLR-XXX`), team management, project repository & commit freeze form, meal voucher statuses, and verifiable SVG certificate generator.
18. **`/admin` (Admin Operations Console)**: KPI analytics, QR check-in & meal token puncher, 250 attendee roster management with CSV export, judging score input, and live broadcast announcement manager.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite 6, Tailwind CSS 3, Framer Motion 11, Three.js, React Three Fiber, React Three Drei, Lucide React, Canvas Confetti, QRCode.react.
- **Backend**: Node.js v22, Express.js 5, JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, `cors`, `body-parser`.
- **Database & Persistence**: File-backed atomic JSON store (`server/data/db.json`) with pre-seeded data, alongside a complete **Prisma ORM** schema (`prisma/schema.prisma`) ready for PostgreSQL or SQLite production deployments.

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Running Full-Stack in Development
Runs both the Express API backend (`http://localhost:3001`) and Vite frontend (`http://localhost:5173`) concurrently:
```bash
npm run dev
```

### 3. Running Services Individually
- Client only: `npm run dev:client`
- Server only: `npm run dev:server`

### 4. Production Build
```bash
npm run build
npm run preview
```

---

## 🔑 Test Accounts & Demo Access

Instant 1-click test credentials are built right into the `/login` screen:

| Role | Email | Password | Access |
|---|---|---|---|
| **Participant** | `aarav@example.com` | `admin2027` | Participant Pass, Team Hub, Meal Vouchers, Certificate |
| **Organizer / Admin** | `admin@opensuse.org` | `admin2027` | Full Operations Console, QR Scanner, CSV Export, Broadcasts |
| **Judge / Program Lead** | `judge@opensuse.org` | `admin2027` | Judging Console, Lane Moderation, Team Scoring |

---

## 📋 Proposal Review & Sign-Off Record

- **Proposal Version**: Revised 08 November 2026
- **Status**: Decision-ready plan, conditional delivery.
- **Venue**: Newton School of Technology, Bengaluru (In-kind college collaboration).
- **Core Organizers**: Divyanshu Prakash · Dushyant Acharya · Rithull Raj Kallat
- **Target Date**: Two consecutive days in January 2027.
- **Official GitHub Reference**: `https://divyanshuprakas-h.github.io/opensuse-event-blr/`
