
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

Four seasonal posts to draft next. An outline for these exists in a Claude AI
chat transcript; fold it in here when it's to hand.

- [ ] `haliburton-studio-tour.md` – Haliburton County Studio Tour
  - Runs Thanksgiving weekend; confirm the 2026 dates and link the official map/schedule rather than restating stops.
  - Angle: what a guest can realistically fit into one day from the cottage.
  - Cross-link and de-duplicate with the existing `haliburton-gallery-tour.md` draft, which has an empty "Studio tours" TODO — decide whether that post absorbs this one or points to it.
  - Publish: late September, ahead of the weekend.

- [ ] `canadian-thanksgiving.md` – Thanksgiving at the Hideaway (Mon 12 Oct 2026)
  - **Mention the thrifting platter** — the serving platter picked up thrifting, and how it ends up on the table.
  - Cooking for a group in the cottage kitchen; link [cooking at the cottage](/posts/cooking-at-the-cottage/) and the [one-week meal plan](/posts/one-week-cottage-meal-plan/).
  - Overlaps the studio tour weekend and near-peak colour — cross-link both.
  - Publish: mid/late September.

- [ ] `american-thanksgiving.md` – For US guests (Thu 26 Nov 2026)
  - Late-November reality check: leaves down, cold, early dark, wood stove season. Link [lighting the wood stove](/posts/lighting-the-wood-stove/) and [cozy night in](/posts/cozy-night-in/).
  - Practical notes for cross-border guests — driving up, the steep driveway, snow tires/AWD, grocery stops before arrival.
  - Publish: early November.

- [ ] `fall-colours.md` – Fall colours on the property
  - **Include some silvics** — the species doing the colouring (sugar maple, red maple, birch, aspen, oak) and why each turns when and what colour it does; how aspect, elevation, and soil moisture on the 23 acres stagger the turn.
  - Peak timing in the Highlands and how much it moves year to year; where to look from — the grounds, the tracks into the forest, the lake.
  - Needs photographs before it publishes.
  - Publish: mid-September, before peak.

---

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
