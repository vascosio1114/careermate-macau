# 🎨 CareerMate Macau — Frontend Contributor Guide

> Welcome！呢份 guide 係寫俾**負責 UI / UX / 前端視覺**嘅 contributor。
> 你唔需要 backend 或 Supabase 嘅權限，跟住做就可以喺自己機 run 個 site，喺 sandbox area 設計 UI。

---

## 📌 Project Overview

**CareerMate Macau** 係一個 career networking + coffee chat 平台，target 澳門學生、fresh grad、mentor、startup founder、HR。

**Tech Stack：**
- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase（你唔使掂）
- **Deploy**: Vercel

---

## ✅ Prerequisites — 你部機要有以下嘢

| Tool | Version | 點裝 |
|---|---|---|
| **Node.js** | 22.x LTS | 用 [Homebrew](https://brew.sh)：`brew install node@22` |
| **Git** | 2.x | Mac 預載；或 `brew install git` |
| **VS Code** | latest | https://code.visualstudio.com |
| **GitHub CLI** | 2.x | `brew install gh` |

裝完之後 verify：
```bash
node --version    # 期望 v22.x.x
npm --version     # 期望 10.x.x 或 11.x.x
git --version     # 期望 2.x.x
gh --version      # 期望 2.x.x
```

### VS Code Extensions（必裝）

開 VS Code → Extensions（左 sidebar 第 5 個 icon）→ search + install：

- **Tailwind CSS IntelliSense** (Tailwind Labs) — Tailwind class autocomplete
- **Prettier - Code formatter** — 自動 format
- **ES7+ React/Redux/React-Native snippets** (dsznajder)
- **GitLens** (GitKraken)

設定 format on save：
1. `Cmd + ,` → search `format on save` → 剔 ☑️
2. Search `default formatter` → 揀 **Prettier**

---

## 🚀 Setup（一次性 setup，之後唔使再做）

### Step 1 — Login GitHub CLI

```bash
gh auth login
```

跟提示：
- GitHub.com → HTTPS → Y → Login with web browser
- Browser 會彈，paste 個 8-digit code，授權

### Step 2 — Clone Repo

```bash
mkdir -p ~/Projects && cd ~/Projects
git clone https://github.com/vascosio1114/careermate-macau.git
cd careermate-macau
```

### Step 3 — Install Dependencies

```bash
npm install
```

（約 1-2 分鐘）

### Step 4 — Set Up Dummy Environment

```bash
cp .env.local.example .env.local
```

呢個 dummy `.env.local` 唔會連到真 Supabase，但會令個 site 跑得起。**唔好搵 owner 攞真 keys**，你 UI work 用 dummy 已經足夠。

### Step 5 — Run Dev Server

```bash
npm run dev
```

開 browser 去 **http://localhost:3000/sandbox**（直接去 sandbox，跳過會撞 Supabase 嘅首頁）。

> ⚠️ 你訪問 `/`、`/profile/...` 會見到 page render 但個別 component 出 error message — 因為 dummy env 連唔到 DB。**呢個係正常**。**你做嘢嘅地方喺 `/sandbox`**。

---

## 📂 你應該喺邊度做嘢

### ✅ 可以改 / 加嘅地方

| Folder / File | 用途 |
|---|---|
| `app/sandbox/*` | UI mockup pages — hardcoded data，自由設計 |
| `components/*` | Shared UI components (Button, Card, etc.) — 之後 backend 同你 reuse |
| 任何 `*.tsx` file 入面嘅 **Tailwind className** | 純 styling 改動 |
| 任何 `.css` file | Global / module CSS |
| `app/globals.css` | Tailwind config / global styles |

### ❌ 唔好 touch 嘅地方

| Folder / File | 點解 |
|---|---|
| `app/profile/actions.ts` | Server actions（連 Supabase）— backend 負責 |
| `app/(auth)/actions.ts` | Auth server actions |
| `lib/supabase/*` | Supabase client setup |
| `proxy.ts` (project root) | Auth middleware |
| 任何有 `"use server"` 標記嘅 file | Server-only logic |
| 任何有 `await supabase.from(...)` 嘅 line | DB query — backend 負責 |
| `.env.local`、`.env.local.example` | Environment config |

> 💡 **唔肯定？** 喺 PR description 講「我改咗 X 同 Y，請 review」，owner 會話你知有冇問題。

---

## 🎨 Design System / Style Guide

### Colors（Tailwind）

| 用途 | Token | Hex |
|---|---|---|
| **Primary**（主橙色） | `amber-600` | `#d97706` |
| Primary hover | `amber-700` | `#b45309` |
| Primary light bg | `amber-100` | `#fef3c7` |
| Primary lighter bg | `amber-50` | `#fffbeb` |
| **Text dark** | `stone-800` | `#292524` |
| Text default | `stone-700` | `#44403c` |
| Text muted | `stone-600` | `#57534e` |
| Text subtle | `stone-500` | `#78716c` |
| Text placeholder | `stone-400` | `#a8a29e` |
| Border | `stone-200` | `#e7e5e4` |
| Border focus | `amber-500` | `#f59e0b` |
| Background | `white` / `stone-50` | |
| Error bg | `red-50` | |
| Error text | `red-700` | |
| Success bg | `green-50` | |
| Success text | `green-700` | |

### Typography

- **Default font**: Geist Sans（已喺 `layout.tsx` setup）
- Heading H1: `text-3xl` 或 `text-5xl`，`font-bold`，`text-stone-800`
- Heading H2: `text-lg`，`font-semibold`，`text-stone-800`
- Body: `text-stone-700`
- Subtle: `text-sm`，`text-stone-600`

### Components（建議模式）

#### Button — Primary
```tsx
<button className="rounded-full bg-amber-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-amber-700">
  動作
</button>
```

#### Button — Secondary
```tsx
<button className="rounded-full border border-stone-300 bg-white px-6 py-3 font-semibold text-stone-700 transition hover:bg-stone-50">
  動作
</button>
```

#### Input
```tsx
<input className="w-full rounded-lg border border-stone-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500" />
```

#### Card
```tsx
<section className="rounded-xl border border-stone-200 bg-white p-6">
  <h2 className="text-lg font-semibold text-stone-800">標題</h2>
  ...
</section>
```

#### Tag
```tsx
<span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
  標籤
</span>
```

### Layout

- 主 content `max-w-3xl` 或 `max-w-6xl`，`mx-auto`，`p-6 sm:p-10`
- 全 page background: 白色 或 `from-amber-50 to-white` gradient
- 圓角: 一律 `rounded-lg`（細）/ `rounded-xl`（卡片）/ `rounded-full`（button、avatar）

### Icons / Emoji

MVP 階段用 emoji 表達 icon（簡單、一致、唔使裝 library）：
- ☕ Coffee chat
- 🎓 學校 / 學生
- 💼 Professional
- 🌟 Mentor
- 🚀 Founder
- 📍 Location
- ↗ External link

---

## 🌿 Branch / PR Workflow

### 開新 task

```bash
# 1. 確保由最新 main 開始
git checkout main
git pull origin main

# 2. 開 feature branch（命名規則：見下）
git checkout -b ui/redesign-discover-page
```

### Branch naming convention

| Prefix | 用途 | 例子 |
|---|---|---|
| `ui/` | UI / styling 改動 | `ui/redesign-discover-page` |
| `design/` | 大規模 layout / mockup | `design/coffee-chat-modal` |
| `fix/` | Bug fix | `fix/header-mobile-overflow` |
| `refactor/` | Code 重構（無 visual change） | `refactor/extract-button-component` |

### Commit message convention

格式：`<type>: <短 description>`

- `ui:` — UI changes
- `design:` — Layout / mockup
- `fix:` — Bug fix
- `refactor:` — Code restructure
- `docs:` — Documentation only
- `chore:` — Misc (dependencies, config)

例子：
```
ui: add hover state to user card
fix: header overflow on mobile (≤ 375px)
design: coffee chat invite modal v1
```

### Push + Open PR

```bash
git add .
git commit -m "ui: add hover state to user card"
git push -u origin ui/your-branch-name
```

跟住開 https://github.com/vascosio1114/careermate-macau → 應該見到黃色 banner 提你開 PR。撳 **Compare & pull request**。

PR description template：
```md
## What changed
- Discover page card 加咗 hover effect（lift + ring）
- Avatar 圓角由 `rounded-lg` 改 `rounded-full`

## Screenshots
Before: <screenshot>
After: <screenshot>

## Tested on
- [x] Desktop (1440px)
- [x] Tablet (768px)
- [x] Mobile (375px)
```

Owner review → approve → merge → 你個 branch 可以刪。

---

## 🧰 Common Commands Cheat Sheet

| Command | 用途 |
|---|---|
| `npm run dev` | Start dev server (localhost:3000) |
| `npm run build` | Production build (check 有冇 TS error) |
| `npm run lint` | Run ESLint |
| `git status` | 睇有咩 file 改咗 |
| `git diff` | 睇具體點改 |
| `git checkout main && git pull` | Sync 返最新 main |
| `git checkout -b ui/xxx` | 開新 branch |
| `git add . && git commit -m "..."` | Stage + commit |
| `git push -u origin <branch>` | Push 新 branch |
| `gh pr create` | Open PR via CLI |

---

## 🐛 Common Issues

### 「Cannot find module '@/...'」

```bash
# Restart TS server
# VS Code: Cmd + Shift + P → "TypeScript: Restart TS Server"
```

### 「ECONNREFUSED ... supabase.co」

呢個係正常 — 你個 dummy `.env.local` 連唔到 Supabase。如果你做緊 sandbox page 唔關事；如果係其他 page 嘅 backend code，唔係你負責處理。

### Page 顯示空白 / red error

開 DevTools (`Cmd + Opt + I`) → Console — 通常係 query failed。**Sandbox page 唔會有呢個問題**。

### `npm install` 慢

```bash
npm config set registry https://registry.npmjs.org/
npm install
```

### Branch 出唔到 PR

確保你已經 push 咗 branch：
```bash
git push -u origin <your-branch>
```

---

## 📣 Where to Ask for Help

| 問題類型 | 揾邊個 |
|---|---|
| Tailwind / CSS 點寫 | Tailwind docs：https://tailwindcss.com/docs |
| Next.js routing / component | Next.js docs：https://nextjs.org/docs |
| Project-specific（design decision、whether to touch X file） | Owner（chat / Slack / WhatsApp） |
| Setup 問題（npm install fail 之類） | Paste error message 俾 owner |

---

## 🔐 Important Reminders

1. **唔好 commit `.env.local`** — 已被 `.gitignore` 排除
2. **唔好 search 真 Supabase keys** — 你嘅 dummy env 已經夠用
3. **唔好直接 push 上 main** — 一律經 PR
4. **PR 之前自己 test** — 至少 desktop + mobile (375px) 都 check 過

---

🎨 **Happy designing！**
有任何問題隨時問 owner。Welcome aboard 🚀
