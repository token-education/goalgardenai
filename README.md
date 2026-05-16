# GoalGardenAI — Deployment Guide

AI-powered career, college, essay, and interview guidance for high school students.
Built with Next.js · Anthropic Claude · Stripe · Vercel

---

## File Structure

```
goalgardenai/
├── pages/
│   ├── index.js          ← Full bilingual app (4 modes, streaming chat, paywall)
│   ├── _app.js           ← App wrapper
│   └── api/
│       └── chat.js       ← Streaming API (8 system prompts: 4 modes × 2 languages)
├── styles/
│   └── globals.css       ← Complete design system
├── package.json
├── .env.local.example    ← Copy → .env.local and fill in secrets
├── .gitignore
└── README.md
```

---

## The 4 Modes

| Mode | What it does |
|------|-------------|
| 🌱 Career Exploration | Match interests/strengths to careers, salary data, trade school vs college |
| 🎓 College Planning | School search, admissions, financial aid, FAFSA, scholarships |
| ✍️ Essay Coach | Brainstorm, draft feedback, Common App, supplements, scholarship essays |
| 🎤 Interview Prep | Resume help, mock interviews, job and college interview coaching |

---

## Step 1 — Get your Anthropic API key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create an account or log in
3. **API Keys** → **Create Key**
4. Copy it — you'll add it to Vercel later

---

## Step 2 — Set up Stripe

1. Go to [stripe.com](https://stripe.com) → create account (Sole Proprietor + SSN, no LLC needed)
2. Complete identity verification
3. **Payment Links** → **Create link**

Create two links:

| Plan | Amount | Billing |
|------|--------|---------|
| Monthly | $4.99 | Monthly recurring |
| Annual | $39.00 | Yearly recurring |

Copy both URLs — you'll add them to Vercel.

**School/Classroom tier — manual process (no code needed):**
1. Student or counselor clicks "Contact us" in the paywall → emails you
2. You send a Stripe invoice manually (Dashboard → Invoices → Create)
3. Suggested pricing:
   - Classroom: $149/year (up to 35 students)
   - School-wide: $499/year (unlimited classrooms)
4. On payment, email them an access code

---

## Step 3 — Create GitHub repo

1. [github.com](https://github.com) → **New repository** → name it `goalgardenai` (private)
2. Don't initialize with README
3. Drag and drop ALL project files into the browser
4. **Commit changes**

---

## Step 4 — Deploy to Vercel

1. [vercel.com](https://vercel.com) → **Add New Project** → import your GitHub repo
2. Framework preset: **Next.js** (auto-detected)
3. **Deploy**

---

## Step 5 — Add environment variables

Vercel → Project → **Settings** → **Environment Variables**:

| Key | Value |
|-----|-------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key |
| `NEXT_PUBLIC_STRIPE_MONTHLY_LINK` | Monthly Stripe payment link URL |
| `NEXT_PUBLIC_STRIPE_ANNUAL_LINK` | Annual Stripe payment link URL |

Then: **Deployments** → **Redeploy** latest deployment.

---

## Step 6 — Buy a domain

1. [porkbun.com](https://porkbun.com) → search `goalgardenai.com` (~$10/year)
2. Buy it

Connect to Vercel:
1. Vercel → Project → **Settings** → **Domains** → add your domain
2. In Porkbun → **DNS**:
   - **A record**: `@` → `76.76.21.21`
   - **CNAME**: `www` → `cname.vercel-dns.com`
3. Wait 5–30 min for DNS propagation

---

## Pricing

| Tier | Price | Method |
|------|-------|--------|
| Free | $0 | 2 questions/session |
| Monthly | $4.99/mo | Stripe payment link |
| Annual | $39/yr | Stripe payment link |
| Classroom | $149/yr | Email → manual invoice → access code |
| School-wide | $499/yr | Same manual process |

---

## Customization

- **Your email**: search `hello@goalgardenai.com` in `pages/index.js` → replace
- **Colors**: CSS variables at top of `styles/globals.css`
- **System prompts**: `SYSTEM_PROMPTS` object in `pages/api/chat.js`
- **Pricing**: search `$4.99` and `$39` in `pages/index.js`
- **Free question limit**: change `FREE_LIMIT` in `pages/index.js` (currently 2)

---

## Updating

1. Edit files locally
2. Drag updated files to GitHub (or `git push`)
3. Vercel auto-redeploys in ~2 minutes

---

## Tech Stack

- **Next.js 14** (pages router)
- **Anthropic SDK** — claude-sonnet-4-20250514 with web search
- **Stripe Payment Links** — no Stripe code, just URLs
- **Vercel** — free Hobby plan
- **GitHub** — free
- **Porkbun** — ~$10/year

---

## Safety

This product serves minors (ages 14–18). System prompts include:
- Crisis Text Line referral (text HOME to 741741) if any student shows distress
- No collection of personal information
- Always constructive — never discouraging
- Essay Coach never ghost-writes — only guides
- Age-appropriate content only

Do not remove these guardrails.

---

## LinkedIn Launch Post

> Every student deserves a counselor in their corner. I built one.
>
> After years working in education, I kept seeing the same gap: the students who need the most guidance have the least access to it. Private college counselors cost thousands. School counselors are stretched impossibly thin. First-gen students are figuring it out alone.
>
> So I built GoalGardenAI — free AI guidance for any high school student:
>
> 🌱 Career Exploration — find careers that actually fit who you are
> 🎓 College Planning — navigate applications, financial aid, and scholarships
> ✍️ Essay Coach — get real feedback on college essays and personal statements
> 🎤 Interview Prep — practice interviews and build a resume from scratch
>
> Fully bilingual — English and Spanish.
> Free to start. No account. No friction.
>
> 👉 goalgardenai.com
>
> School counselors and administrators — there's a classroom license option built in. Just reply or DM me.
>
> #Education #EdTech #CollegePlanning #CareerGuidance #FirstGen #HighSchool #EduTwitter
