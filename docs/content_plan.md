
# ✅ Highland Hideaway Site To-Do Checklist (DoIt Theme Upgrade)

---

## 🚧 Site Configuration

- [X] Add avatar image to `params.avatar`
- [ ] Set up social media links in `params.social`
- [ ] Add top navigation menu in `config/_default/menu.toml`  
  - [ ] Posts
  - [ ] About
  - [ ] Book Now (link to Airbnb)

---

## 🏠 Homepage Redesign (`layouts/index.html` or `content/_index.md`)

- [ ] Replace blogroll with custom welcome content
- [ ] Add short intro to Highland Hideaway
- [ ] Include clear side navigation or button links:
  - [ ] About the Cottage
  - [ ] Things to Do Nearby
  - [ ] Guest Tips & How-Tos
- [ ] Add Call-to-Action (CTA):  
  _**"Book your stay now on Airbnb"** → [https://airbnb.ca/h/hideaway-near-haliburton](https://airbnb.ca/h/hideaway-near-haliburton)_

---

## ✍️ Pages (`content/`)

Each of these should be in a separate Markdown file with appropriate front matter.

- [ ] `content/about.md` – Overview of the cottage and its charm
- [ ] `content/location.md` – Map, directions, and getting there info
- [ ] `content/things-to-do.md` – Local attractions & activities
- [ ] `content/amenities.md` – Amenities, layout, and features
- [ ] `content/guest-guide.md` – How-to guides (fireplace, garbage, water, etc.)
- [ ] `content/eating-in.md` – Cooking at the cottage, local grocery tips
- [ ] `content/eating-out.md` – Local restaurant picks and food highlights

---

## 📝 Posts (`content/posts/`)

Each post should include `summary`, `tags`, `categories`, optional `series`, `description`, and `featuredImage`.

- [ ] `welcome.md` – Welcome to Highland Hideaway
- [ ] `cozy-night-in.md` – Board games, books, fireplace
- [ ] `launch-guide.md` – Canoe launch instructions
- [ ] `campfire-night.md` – Campfire tips and safety
- [ ] `rainy-day.md` – What to do on rainy days
- [ ] `local-hikes.md` – Best hiking trails nearby
- [ ] `winter-weekend.md` – Planning a winter getaway
- [ ] `kids-activities.md` – Fun with kids at the cottage
- [ ] `local-events.md` – Guide to annual events
- [ ] `grocery-stores.md` – Where to stock up on essentials
- [ ] `packing-guide.md` – What to bring to the Hideaway
- [ ] `seasonal-highlights.md` – Year-round seasonal experiences

---

## 🍁 Upcoming Posts — Autumn 2026

Full brief: [`fall_2026_content_brief.md`](fall_2026_content_brief.md). All four
posts exist in `content/posts/` as drafts (`draft: true`) with TODOs in the
files. Read the brief before touching any of them.

**Verified dates (per brief, Aug 2026):**

| Item | Date |
|---|---|
| Studio Tour, weekend 1 | Sat 3 – Sun 4 Oct 2026, 10am–5pm |
| Studio Tour, weekend 2 | Sat 10 – Sun 11 Oct 2026, 10am–5pm |
| Canadian Thanksgiving | Mon 12 Oct 2026 (long weekend Sat 10 – Mon 12) |
| American Thanksgiving | Thu 26 Nov 2026 |
| Artist Exhibition, The Space | 18 Sept – 18 Oct 2026 |

The second tour weekend *is* the Thanksgiving long weekend. That overlap is the
weekend worth selling.

**Rules from the brief:** first person and genuinely lived — invent nothing,
including shop names and meals. Re-verify every fact at draft time; several
figures come from sources that disagree. CTA is narrative, not a banner.

- [ ] `haliburton-studio-tour.md` – bottom of funnel, highest intent
  - Opens on the glass blowing studio Ben visited last year. **Ben has to write that opening** — the draft leaves it deliberately thin.
  - Hedged school history is in the draft (1967 start, Royal View Lodge, Fleming extension division 1967 *or* 1969, Glebe Park in 2004). Resolve or keep the hedge.
  - Verify studio and artist counts against thestudiotour.ca; link the map rather than restating stops.
  - Publish: mid-September, before the first weekend.

- [ ] `canadian-thanksgiving.md` – middle of funnel
  - Opens on the Turkish platter found thrifting. **Ben to fill in the story and photograph the platter.**
  - Angle is Thanksgiving without the hosting, not a recipe post.
  - Name the thrift shops only if Ben can supply real ones.
  - Publish: late September.

- [ ] `fall-colours.md` – top of funnel, **backlog and not properly briefed**
  - Light science, a stated peak projection, an outbound link to the Ontario Parks colour tracker, and heavy original photography.
  - Silvics section is scaffolded but unwritten. Verify species behaviour before publishing rather than writing from memory.
  - Does not work without photographs.
  - Publish: mid-September, before peak.

- [ ] `american-thanksgiving.md` – **not in the brief at all**
  - The brief confirms the date and nothing else. Decide whether this post is wanted before writing it.
  - Publish: early November, if it goes ahead.

**Do not merge the Studio Tour and Thanksgiving posts.** Different search
intent is the whole reason they're separate. They cross-link instead — that's
already wired up in both drafts.

Open question: `haliburton-gallery-tour.md` is a separate empty stub with a
"Studio tours" TODO that the studio tour post now covers. Point it at the new
post, or drop it.

Out of scope: Haliburton Forest Trail Race (12 Sept) — that weekend is booked.

## 💡 CTA Integration

- [ ] Create `layouts/shortcodes/booknow.html`
- [ ] Add `{{< booknow >}}` at the end of each post/page

---

## 🎨 Branding & Design

- [X] Add `static/images/avatar.png` for avatar
- [X] Add favicon (`static/favicon.ico`)
- [ ] Customize site title and description
- [ ] Add footer content:
  - [ ] Airbnb link
  - [ ] Contact info
  - [ ] (Optional) Newsletter signup or reviews

---

## 📁 Taxonomy Navigation

- [ ] Create `_index.md` for:
  - [ ] `content/posts/`
  - [ ] `content/categories/`
  - [ ] `content/tags/`
  - [ ] `content/series/`
- [ ] Add blurbs to each `_index.md` for SEO and user experience

---

## 🔍 SEO & Metadata

- [ ] Add `description` in front matter for each page/post
- [ ] Set global `[params.seo]` in `config.toml`
- [ ] Enable open graph and Twitter cards

---

## 🔧 Optional Enhancements

- [ ] Add analytics (Plausible, GoatCounter, or GA)
- [ ] Add sitemap and robots.txt
- [ ] Add site search (e.g., Algolia or Fuse.js)
- [ ] Consider dark/light toggle styling improvements
