# CLAUDE.md

Guidance for Claude Code working in this repo.

## What this is

Skye Grossman's portfolio site, built for a job search. The repo is public, so code,
commit messages, and PR descriptions are held to the same bar as the site.

Planning and process live **outside** the repo, in the parent directory:

| File | What |
|---|---|
| `../DEVOPS.md` | The work process, end to end. **Follow it for every task.** |
| `../TASKS.md` | Build plan — task order, branch names, and the current base branch |
| `../DECISIONS.md` | Why the project is built this way |

## Status

**Rebuild in progress.** `main` still holds the 2024 site (Next 14, npm). New work
merges into a `rebuild` integration branch, not `main`; `../TASKS.md` names the current
base. Everything below describes the target, not what is on `main` today.

## Stack

Next.js 16 (App Router), TypeScript, Tailwind 4. Deployed on Vercel.

**Package manager is `bun`.** Never run `npm`/`pnpm`/`yarn` here — it creates a
competing lockfile. Use `bun install`, `bun add`, `bun run dev`, `bun run build`, and
`bunx` instead of `npx`.

Tailwind 4 is configured in CSS (`@theme` in `app/globals.css`); there is no
`tailwind.config`.

## Content

All copy and project data live in `content/` as typed TypeScript: `projects.ts`,
`skills.ts`, `bio.ts`, and `site.ts` for site-wide copy (name, title line, nav labels,
contact and social links). Adding a project is one object in one file; components
render whatever is there. Don't put copy in JSX.

The bio, project descriptions, and skills list are Skye's to write. Until one is
supplied, its field holds an obvious placeholder — don't draft it or port the 2024
site's. Once it's in, don't edit or formalize it.

## Assets

- No image over 300 KB committed. Photos and screenshots are WebP, resized to 2× the
  widest the layout displays them, for high-density screens. The OG image and favicon
  keep the formats their consumers need.
- No video in the repo.
- Project screenshots show the app only — no browser chrome, tabs, or bookmarks bar.
- Every meaningful image has alt text that says what's in it; purely decorative ones
  get `alt=""`. `alt="image"` is a bug.

## Secrets

Service IDs and keys come from env, never the source. Real values go in `.env.local`,
which is gitignored; `.env.example` lists every variable with placeholders only. Never
commit a filled-in env file or print a real key into a commit, comment, or PR body.
Preview and production read the Vercel project's environment variables, not
`.env.local` — a new variable has to be added there before the preview build can use
it.

## Code style

Match surrounding code. Don't introduce a second way to do something that already has
one. Don't add a dependency for something a few lines would do.

### Comments

A comment is what the code cannot say. Four things earn one:

1. **Why this shape** — the constraint that rules out the simpler version.
2. **How it works** — the mechanism, only when it spans more than the reader can see.
3. **What's true but not visible** — an invariant or accepted cost, stated as fact.
4. **What else must change with it** — a coupling nothing enforces. Name the symbol.

Cut history, provenance (task IDs, PR numbers), restatement, and reassurance. The
`../` planning files aren't in the repo, so comments never cite them — state the
reason itself. Before writing a claim about anything outside the file, open that
thing and check it — don't recall it.
