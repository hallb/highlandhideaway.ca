
# ✅ Highland Hideaway Site To-Do Checklist (DoIt Theme Upgrade)

---

## 🚧 Site Configuration

- [ ] Add avatar image to `params.avatar`
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

## 💡 CTA Integration

- [ ] Create `layouts/shortcodes/booknow.html`
- [ ] Add `{{< booknow >}}` at the end of each post/page

---

## 🎨 Branding & Design

- [ ] Add `static/images/avatar.png` for avatar
- [ ] Add favicon (`static/favicon.ico`)
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
