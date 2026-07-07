# Visual Design System - Weekly Spending Tracker

This design system defines the visual language, typography, colors, and layout components for the Weekly Spending Tracker mobile web app.

## 1. Colors
- **Primary**: `#2563EB` (Vibrant Blue - main brand color, buttons, accents)
- **Secondary**: `#DBEAFE` (Light blue/indigo - badges, background highlights)
- **Background**: `#FFFFFF` (Clean white - cards, screens)
- **Text Primary**: `#111827` (Dark slate - titles, body copy)
- **Text Secondary**: `#6B7280` (Medium gray - subtitles, captions, helper text)
- **Success**: `#22C55E` (Green - income, positive status)
- **Warning**: `#F59E0B` (Amber - warning status, nearing budget limits)
- **Danger**: `#EF4444` (Red - expenses, budget exceeded)

## 2. Typography (Font: Inter)
- **Hero Title**: `60px Inter Bold` (Used for key landing numbers/headlines)
- **Page Title**: `30px Inter SemiBold`
- **Section/Card Title**: `18px Inter Medium`
- **Body Text**: `16px Inter Regular`
- **Helper/Caption**: `14px Inter Regular`

## 3. UI Tokens
- **Border Radius**: `ROUNDED-2XL` (`16px`) for cards and modals, `ROUNDED-FULL` for buttons.
- **Shadows**: Soft shadows for premium elevation.
- **Icons**: Clean outline icons (e.g. Heroicons or Feather style).

## 4. Mobile Layout Guidelines
- Responsive viewport size: `MOBILE` (width: 390px, height: dynamically scrolling).
- Structured in 3 key sections:
  1. Header (Sticky or top-scrolling, brand + profile)
  2. Scrollable Body Content (Cards, Lists, Charts)
  3. Sticky Bottom Navigation (5 tabs: Home, Transactions, Statistics, Budget, Profile, with a central Floating Action Button `+` for quick transaction entry).

---

## 5. Design System Notes for Stitch Generation
When generating screens, ALWAYS include this specification block:
```markdown
DESIGN SYSTEM REQUIREMENTS:
- Font: Inter (from Google Fonts)
- Target Layout: Mobile Responsive Viewport (390px width)
- Color Palette:
  * Brand Primary: #2563EB (Vibrant Blue)
  * Secondary Accent: #DBEAFE (Light Indigo)
  * Main Background: #FFFFFF (White) or clean subtle background #F9FAFB
  * Dark Text: #111827
  * Gray Text: #6B7280
  * Success Green: #22C55E
  * Warning Amber: #F59E0B
  * Danger Red: #EF4444
- Roundness: rounded-2xl (16px) for cards, rounded-full for pills and action buttons.
- Sticky Bottom Nav: 5 tabs (Home, Transactions, Statistics, Budget, Profile) with a prominent circular Floating Action Button (+) in the center.
- Premium styling: Soft drop shadows, smooth hover scaling, and clean grid alignments. No placeholders; write full realistic copy.
```
