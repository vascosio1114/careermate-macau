# 🏙️ CareerMate Macau

> A personal side project — wanted to see if I could build a full app from scratch.

CareerMate Macau is a career networking platform for Macau students, fresh graduates, mentors, and startups. The idea: connect people for coffee chats, share resumes, and build professional networks in a city where that kind of platform doesn't really exist yet.

This is a learning project. I'm building it phase by phase to figure out how full-stack development actually works in practice.

**🚧 Currently: Phase 3 of 9 — Auth flow complete**

---

## 💡 The Idea

Macau has a lot of talented students and a growing startup scene, but there's no dedicated platform to connect them. CareerMate Macau is an attempt to build something for that gap — in Cantonese, for the local context.

---

## ✅ What's Built So Far

**Phase 1** — Project setup: Next.js bootstrapped, folder structure, tooling

**Phase 2** — Supabase integration: database schema, storage setup, client connection

**Phase 3** *(current)* — Auth flow: signup, login, logout using Supabase Auth + server-side session handling via middleware

---

## 🗺️ Build Plan

| Phase | Focus |
|-------|-------|
| 1 | Project setup |
| 2 | Supabase DB schema + storage |
| 3 | Auth flow (signup / login / logout) ✅ |
| 4 | User profile page |
| 5 | Resume upload & display |
| 6 | Browse & search profiles |
| 7 | Coffee chat request system |
| 8 | Mentor / startup listing |
| 9 | Polish, deploy, test |

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router) · TypeScript
- **Backend & Auth:** Supabase (PostgreSQL + Auth + Storage)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel *(planned)*

---

## 🚀 Run Locally

```bash
git clone https://github.com/vascosio1114/careermate-macau.git
cd careermate-macau
npm install
npm run dev
```

Add a `.env.local` with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

---

## 👤 Author

**Vasco Sio (Kei Chon)** · Year 4 · GIS & Statistics · University of Toronto Mississauga
📫 keichonsio1114@gmail.com
