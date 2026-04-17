```markdown
# Design System Document: The Editorial Precision Framework

## 1. Overview & Creative North Star: "The Digital Curator"
This design system is built upon the North Star of **"The Digital Curator."** In a world of digital noise, this system mimics the experience of a high-end physical gallery or a premium editorial magazine. We are moving beyond the "template" look by treating the screen as a canvas of light and depth rather than a grid of boxes. 

The aesthetic is characterized by **intentional asymmetry**, where large headings are balanced by vast expanses of whitespace, and content is layered to feel like physical sheets of paper or glass. We prioritize clarity through high-contrast typography and focus through the total removal of distracting structural lines.

---

## 2. Colors: Tonal Depth & The "No-Line" Rule
Our palette is a sophisticated spectrum of grays and whites designed to let imagery take center stage while providing a "San Francisco" professional chill.

### The "No-Line" Rule
**Explicit Instruction:** Use of 1px solid borders for sectioning is strictly prohibited. Boundaries must be defined solely through background color shifts.
- To separate the Hero section from a Work section, transition from `surface` (`#f9f9fb`) to `surface-container-low` (`#f2f4f6`). 

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface-container tiers to create "nested" depth:
- **Base Layer:** `surface` (#f9f9fb)
- **Secondary Section:** `surface-container-low` (#f2f4f6)
- **Interactive Cards:** `surface-container-lowest` (#ffffff) for maximum "pop."
- **Overlays/Modals:** `surface-container-highest` (#dde3e9) to signal temporary elevation.

### The "Glass & Gradient" Rule
To achieve that signature premium feel, use **Glassmorphism** for navigation bars and floating action buttons. Use `surface-container-lowest` with a 70% opacity and a `20px` backdrop-blur. 
- **Signature Textures:** Apply a subtle linear gradient from `primary` (#5e5e5e) to `primary-dim` (#525252) on main CTAs to give them a tactile, metallic density.

---

## 3. Typography: Editorial Authority
Typography is the primary architecture of this system. We use **Inter** (as the web-safe equivalent to San Francisco) to convey a modern, neutral, and highly readable tone.

- **Display-LG (3.5rem):** Reserved for hero impact. Use negative letter-spacing (-0.02em) to create a tight, professional lockup.
- **Headline-MD (1.75rem):** Used for case study titles. These should feel like magazine headers.
- **Body-LG (1rem):** Our standard for readability. Ensure a line-height of 1.6 to maintain the "breathable" feel.
- **Label-SM (0.6875rem):** Used for metadata (e.g., "MARKETING STRATEGY / 2023"). Always set in All-Caps with +0.1em letter spacing for a refined, technical look.

---

## 4. Elevation & Depth: Tonal Layering
We avoid the "floating card" look of 2010s design. Depth is achieved through light and layering, not heavy shadows.

### The Layering Principle
Stacking containers creates natural lift. Place a `surface-container-lowest` (#ffffff) card on a `surface-container-low` (#f2f4f6) background. The subtle 2% difference in luminosity creates a sophisticated boundary that feels integrated.

### Ambient Shadows
When a floating effect is required (e.g., a hovered card), use **Ambient Shadows**:
- `box-shadow: 0 20px 40px rgba(45, 51, 56, 0.04);` 
- The shadow color is a low-opacity version of `on-surface` (#2d3338), mimicking how light behaves in a clean, white room.

### The "Ghost Border" Fallback
If a border is required for accessibility, it must be a **Ghost Border**:
- Use `outline-variant` (#acb3b8) at 15% opacity. Never use 100% opaque borders.

---

## 5. Components: Precision Elements

### Buttons
- **Primary:** Background: `primary` (#5e5e5e); Text: `on-primary` (#f8f8f8). Shape: `md` (0.75rem). Use a subtle scale-down interaction (0.98) on click.
- **Secondary:** Background: `surface-container-high` (#e4e9ee); Text: `on-surface` (#2d3338). For less critical actions.

### Cards & Lists
- **Forbid Dividers:** Do not use lines between list items. Use 24px of vertical whitespace or a subtle background hover state change to `surface-container`.
- **Media Containers:** Use `lg` (1rem) corner radius for imagery. Photos should feel like they are "inset" into the page.

### Input Fields
- **Styling:** Use a `surface-container-low` background with a `none` border. On focus, transition to `surface-container-lowest` with a Ghost Border.
- **Text:** Input text uses `body-md` in `on-surface`.

### Signature Component: The "Perspective Project Card"
A large-format card using `surface-container-lowest` that features a 50/50 split between a high-quality image and editorial text. No borders, just a soft ambient shadow on hover and a transition that slightly lifts the image.

---

## 6. Do’s and Don’ts

### Do:
- **Use Ample Whitespace:** If you think there's enough space, add 20% more. Space is a luxury indicator.
- **Focus on Micro-interactions:** Use `cubic-bezier(0.2, 0, 0, 1)` for all transitions (the standard for smooth, Apple-like motion).
- **Prioritize Alignment:** Use a strict 12-column grid, but feel free to let images "break" the grid to create visual interest.

### Don’t:
- **No Pure Black:** Never use #000000. Use `inverse_surface` (#0c0e10) for deep tones to keep the look organic.
- **No Rigid Boxes:** Avoid 1px borders and heavy shadows. They create "visual friction" that breaks the premium feel.
- **No Generic Icons:** Use ultra-thin stroke icons (24px size, 1px or 1.5px stroke weight) to match the refinement of the typography.

---

**Director's Final Note:** This system succeeds when the user doesn't notice the "UI," but rather the content. Every movement should feel like a soft glide, and every layout should feel like a deliberate choice by a master typographer.```