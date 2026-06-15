# AARSHI Website — Admin Guide
**For anyone managing the website — no coding experience needed for most tasks.**

---

## 📁 File Structure (What's Where)

```
AARSHI_WEBSITE/
├── index.html          ← The entire website (one file)
├── css/style.css       ← All colours, fonts, layout
├── js/main.js          ← Animations, filters, lightbox
├── assets/             ← ALL images go here
│   ├── logo_dark.png           ← Logo (dark bg version)
│   ├── logo_light.jpg          ← Logo (light bg version)
│   ├── ob_*.jpg                ← Current OB (26-27) photos
│   ├── ob2526_*.jpg            ← Previous OB (25-26) photos
│   ├── gal_*.jpg               ← Gallery photos
│   ├── past_*.jpg              ← Past Events photos
│   ├── iicm_*.jpg              ← IICM gallery photos
│   ├── event_*.jpg/png         ← Event posters
│   └── mentor_*.jpg            ← Renowned faces photos
├── .github/workflows/deploy.yml ← Auto-deploy (don't touch)
├── README.md           ← Basic readme
└── ADMIN_GUIDE.md      ← This file
```

---

## 🔧 HOW TO EDIT: Open index.html in any text editor
Use **VS Code** (free, recommended) or even Notepad.  
Use **Ctrl+F** (Find) to locate any text you want to change.  
After editing, **push to GitHub** → site auto-deploys in ~2 minutes.

---

## 👥 CHANGING OFFICE BEARERS (OBs)

### Step 1 — Add the new photo
Copy the photo into the `assets/` folder. Name it clearly, e.g. `ob_newname.jpg`

### Step 2 — Find the Team section
Open `index.html`, press **Ctrl+F**, search for:
```
Current Office Bearers
```

### Step 3 — Update each card
Each OB card looks like this:
```html
<div class="team-card">
  <div class="team-photo-wrap">
    <img src="assets/ob_chhandak.jpg" alt="Chhandak Dutta" class="team-photo" />
  </div>
  <div class="team-role">Secretary</div>
  <h3 class="team-name">Chhandak Dutta</h3>
  <a href="tel:6295076503" class="team-contact">+91 62950 76503</a>
</div>
```

**To update:** Change:
- `assets/ob_chhandak.jpg` → new photo filename
- `alt="Chhandak Dutta"` → new person's name
- `Secretary` → their role
- `Chhandak Dutta` → their name
- `tel:6295076503` and `+91 62950 76503` → their number

### Moving old OBs to "Previous" section
Search for `Tenure 2025–26` to find the previous OB section.  
Copy-paste a card there and update the details.  
Update the historical table further down (search for `All Past Office Bearers`).

---

## 📅 ADDING / REMOVING CURRENT EVENTS

### To ADD a new event poster:
1. Copy the poster image to `assets/`, e.g. `event_newname.jpg`
2. In `index.html`, find the Events section (search for `Flagship Events`)
3. The events use cards. Add a new card by copying this template:
```html
<div class="event-card">
  <div class="event-card-accent"></div>
  <div class="event-tag">Competition</div>
  <h3 class="event-name">YOUR EVENT NAME</h3>
  <p class="event-desc">Description of the event goes here.</p>
</div>
```

### To add a poster with image (like Mrignayanee):
The poster cards are in the **poster-grid** section. Each looks like:
```html
<div class="poster-card">
  <div class="poster-img-wrap">
    <img src="assets/event_mrignayanee.jpg" alt="Event Name" />
    <div class="poster-badge poster-badge--live">Open</div>
  </div>
  <div class="poster-info">
    <div class="event-tag">Category</div>
    <h3 class="event-name">Event Name</h3>
    <p class="event-desc">Details here.</p>
    <div class="poster-meta">
      <span class="poster-meta-item">📅 Deadline: DATE</span>
    </div>
  </div>
</div>
```

**Badge types:**
- `poster-badge--live` → Red "Open" badge (for active events)
- `poster-badge--soon` → Gold "Coming Soon" badge

### To REMOVE an event:
Find the event card in `index.html` and delete from its opening `<div class="event-card">` or `<div class="poster-card">` to its closing `</div>`.

### To mark an event as CLOSED:
Change `poster-badge--live` to `poster-badge--soon` and change "Open" to "Closed".  
Or simply delete the badge line entirely.

---

## 🖼️ ADDING IMAGES TO GALLERY / PAST EVENTS

### Adding to Gallery (current year events):
1. Copy image to `assets/`, name it `gal_12_description.jpg` (continue numbering)
2. Find in `index.html`: search for `id="galleryGrid"`
3. Add a new item inside the grid:
```html
<div class="gal-item" data-category="CATEGORY" data-caption="Caption Text">
  <img src="assets/gal_12_description.jpg" alt="Description" loading="lazy" />
  <div class="gal-overlay"><span>Caption Text</span></div>
</div>
```

**Categories for Gallery:** `rangabhumi`, `abhivyakti`, `lakeer`  
(Add a new category by also adding a filter button — see below)

### Adding to Past Events:
Same process but search for `id="pastGrid"`.  
Use `data-past="CATEGORY"` instead of `data-category`.

**Categories for Past Events:** `abhivyakti`, `nukkad`, `productions`, `rangabhumi`, `iicm25`, `iicm23`, `farewell`

### Wide images (span 2 columns):
Add `gal-item--wide` to the class:
```html
<div class="gal-item gal-item--wide" data-category="...">
```

### Adding a NEW filter category:
1. Add the button in the filter bar:
```html
<button class="gf-btn" data-past-filter="newcategory">New Category</button>
```
2. Tag your images with `data-past="newcategory"`

---

## 🏆 ADDING ACHIEVEMENTS

### To add a new trophy item:
Find `trophy-banner` in `index.html` and add:
```html
<div class="trophy-divider"></div>
<div class="trophy-item">
  <div class="trophy-icon">🥇</div>
  <div class="trophy-info">
    <span class="trophy-year">YEAR</span>
    <h3>Achievement Title</h3>
    <p>Brief description</p>
  </div>
</div>
```

### To add to "Other Accolades":
Find `ach-list` and add:
```html
<div class="ach-item">
  <span class="ach-rank">1<sup>st</sup></span>
  <div>
    <strong>Event Name</strong>
    <span>Fest Name · Year</span>
  </div>
</div>
```

### Updating the stat counters:
Search for `data-target` in `index.html`. Change the number:
```html
<div class="stat-number" data-target="3">0</div>
```
Change `3` to whatever the new number is.

---

## 📸 ACTIVATING THE INSTAGRAM FEED

The Instagram section currently shows a placeholder. To activate a live feed:

**Option 1 — Elfsight (easiest, free tier available):**
1. Go to https://elfsight.com/instagram-feed-widget/
2. Sign up free, connect `@aarshi_iiserk`
3. Customise the feed (grid style, number of posts)
4. Copy the embed code they give you
5. In `index.html`, find the comment that says `PASTE YOUR WIDGET SCRIPT TAG HERE`
6. Replace the `<div class="insta-placeholder">` block with the embed code

**Option 2 — EmbedSocial:**
1. Go to https://embedsocial.com
2. Same process — connect Instagram, get code, paste

---

## 🔗 ADDING VIDEO LINKS TO PRODUCTIONS

Find the productions list (search for `prod-tag`) and change a plain tag to a link:
```html
<!-- Plain tag (no link): -->
<span class="prod-tag">Sab Changa Si <em>2022</em></span>

<!-- Linked tag (with YouTube): -->
<a class="prod-tag prod-tag--link" href="https://youtu.be/YOUR_LINK" target="_blank">
  Sab Changa Si <em>2022</em> <span class="prod-watch">▶ Watch</span>
</a>
```

---

## 🌓 THEME (LIGHT/DARK MODE)

The toggle button is in the top-right of the nav bar (🌙/☀️).  
Users' preference is saved automatically in their browser.  
No action needed from admins — it just works.

---

## 🚀 DEPLOYING CHANGES

After any edit to files in this folder:
1. Open Terminal / Git Bash in the `AARSHI_WEBSITE` folder
2. Run:
```bash
git add .
git commit -m "Brief description of what you changed"
git push
```
3. Go to GitHub → Actions tab → watch the deploy (takes ~2 min)
4. Visit https://berasankhadeep20-lang.github.io/AARSHI_WEBSITE/ to see live site

**GitHub Pages settings:** Settings → Pages → Source: GitHub Actions

---

## ❓ COMMON MISTAKES TO AVOID

| Mistake | Fix |
|---|---|
| Image doesn't show | Check filename matches exactly (case-sensitive). No spaces in filenames. |
| Broke the layout | Undo (Ctrl+Z) or check you closed all `<div>` tags properly |
| Changes not showing | Clear browser cache (Ctrl+Shift+R) or wait 2 min for deploy |
| Filter button not working | Make sure `data-category` on image matches `data-filter` on button exactly |
| Photo looks wrong shape | Add `object-position: center top` to the img in CSS if face is cut off |

---

*Last updated: June 2026 | For help contact: aarshi@iiserkol.ac.in*
