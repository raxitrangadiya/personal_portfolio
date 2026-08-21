# Graph Report - personal_portfolio  (2026-06-24)

## Corpus Check
- 34 files · ~38,900 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 268 nodes · 269 edges · 20 communities (17 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e4630157`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]

## God Nodes (most connected - your core abstractions)
1. `dependencies` - 26 edges
2. `/graphify` - 15 edges
3. `What You Must Do When Invoked` - 14 edges
4. `devDependencies` - 12 edges
5. `dependencies` - 11 edges
6. `scripts` - 8 edges
7. `Part B - Semantic extraction (parallel subagents)` - 7 edges
8. `resumeData` - 6 edges
9. `For --update (incremental re-extraction)` - 5 edges
10. `Step 3 - Extract entities and relationships` - 4 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities (20 total, 3 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (33): Admin, adminSchema, Message, messageSchema, Profile, profileSchema, Project, projectSchema (+25 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (35): code:block1 (/graphify                                             # full), code:powershell (@'), code:powershell (@'), code:powershell (@'), code:powershell (@'), code:powershell (@'), code:powershell (@'), code:powershell (@') (+27 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (30): code:powershell (New-Item -ItemType Directory -Force -Path graphify-out | Out), code:powershell (@'), code:powershell (@'), code:powershell (@'), code:powershell (@'), code:powershell (@'), code:powershell (# Detect Python with graphify — uv/pipx-aware (fixes #831)), code:powershell (@') (+22 more)

### Community 4 - "Community 4"
Cohesion: 0.08
Nodes (26): dependencies, autoprefixer, bcryptjs, cors, dotenv, @emailjs/browser, express, express-rate-limit (+18 more)

### Community 5 - "Community 5"
Cohesion: 0.1
Nodes (20): dependencies, bcryptjs, cors, dotenv, express, express-rate-limit, express-validator, helmet (+12 more)

### Community 6 - "Community 6"
Cohesion: 0.12
Nodes (15): aboutLink, closeBtn, dashboardHeader, firstProjectCard, loginHeader, messagesTab, modal, nameHeader (+7 more)

### Community 7 - "Community 7"
Cohesion: 0.14
Nodes (13): homepage, name, private, scripts, build, deploy, dev, lint (+5 more)

### Community 8 - "Community 8"
Cohesion: 0.17
Nodes (12): code:powershell (& (Get-Content graphify-out\.graphify_python) -c "), code:powershell (@'), code:powershell (@'), code:powershell (@'), code:powershell (@'), code:powershell (@'), code:block8 ([Agent tool call 1: files 1-15]), code:block9 (You are a graphify extraction subagent. Read the files liste) (+4 more)

### Community 9 - "Community 9"
Cohesion: 0.17
Nodes (12): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, gh-pages, globals, @playwright/test (+4 more)

### Community 10 - "Community 10"
Cohesion: 0.38
Nodes (4): CategoryGroup(), getCategoryColor(), getIconComponent(), HexCard()

### Community 12 - "Community 12"
Cohesion: 0.5
Nodes (3): Expanding the ESLint configuration, React Compiler, React + Vite

### Community 13 - "Community 13"
Cohesion: 0.5
Nodes (3): builds, routes, version

## Knowledge Gaps
- **170 isolated node(s):** `name`, `homepage`, `private`, `version`, `type` (+165 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `What You Must Do When Invoked` connect `Community 3` to `Community 8`, `Community 1`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Why does `/graphify` connect `Community 1` to `Community 3`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Community 4` to `Community 7`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **What connects `name`, `homepage`, `private` to the rest of the system?**
  _170 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.09 - nodes in this community are weakly interconnected._