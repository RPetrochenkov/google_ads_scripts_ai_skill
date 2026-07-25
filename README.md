# Google Ads Scripts — Claude Skill

A [Claude skill](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills)
that helps Claude write, review, and debug **Google Ads Scripts** — the `AdsApp`
JavaScript that runs inside the Google Ads *Scripts* environment.

Out of the box, LLMs often generate Google Ads Scripts with outdated syntax
(legacy AWQL filters, invalid fields like `metrics.cost`, pre-ES5 patterns). This
skill gives Claude a compact, up-to-date reference for the current ("new") scripts
experience so the code it produces actually runs.

## What it does

When this skill is active, Claude will:

- Use **current GAQL syntax** — API field names in `withCondition()`/`orderBy()`
  (e.g. `campaign.status = ENABLED`), `metrics.cost_micros` (not `metrics.cost`),
  and modern ES6.
- Know the real objects and features — campaigns, ad groups, keywords, budgets,
  bid strategies, audiences, labels, reporting, Performance Max, MCC (manager)
  scripts, bulk uploads, and Google Sheets export.
- Follow safe operating habits — filter at the API level, respect execution-time
  limits, batch writes and logging on large accounts, and confirm scope (naming
  conventions or labels) before touching live campaigns.

It ships with an offline documentation set and two worked example scripts.

## Add it to Claude

**On claude.ai (web/desktop):**

1. Download `google-ads-scripts.zip` from the
   [latest release](../../releases/latest).
2. Go to **Settings → Customize → Skills → Create skill** and upload the zip.
3. It appears as **google-ads-scripts** and activates automatically when you ask
   about Google Ads Scripts. (Skills require a paid plan / admin enablement.)

**In Claude Code (local):**

Copy the `google-ads-scripts/` folder into your skills directory:

```bash
cp -r google-ads-scripts ~/.claude/skills/
```

Then just ask Claude to write or fix a Google Ads Script.

## What's inside

```
google-ads-scripts/
├── SKILL.md                 # the skill's instructions
└── reference/
    ├── docs/                # concepts, objects, and features (GAQL, selectors, PMax, MCC, …)
    └── examples/            # worked example scripts
```

---

## About me

I'm Roman — I work in marketing analytics and spend most of my time on paid media
measurement and automation: attribution, cost and conversion pipelines, Google/Meta
API integrations, GTM and server-side tracking (including CAPI).

This skill came out of my own frustration: I used to write a lot of Google Ads Scripts,
and every AI tool was writing rubbish without this skill.

- 🔗 **LinkedIn:** [Roman Petrochenkov](https://www.linkedin.com/in/rpetrochenkov/)
- ▶️ **YouTube:** [Marketing Watch House](https://www.youtube.com/channel/UCGVixrs0am6EoF9O16C5lpQ) — Google Ads, GA4, BigQuery and automating the boring parts

If this saved you time, a ⭐ on the repo helps more people find it. And come say hi on
[LinkedIn](https://www.linkedin.com/in/rpetrochenkov/) — I like meeting people working
on the same problems.
