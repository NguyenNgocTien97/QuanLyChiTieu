---
name: Quản Lý Chi Tiêu Tuần
colors:
  surface: '#faf8ff'
  surface-dim: '#d9d9e5'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fe'
  surface-container: '#ededf9'
  surface-container-high: '#e7e7f3'
  surface-container-highest: '#e1e2ed'
  on-surface: '#191b23'
  on-surface-variant: '#434655'
  inverse-surface: '#2e3039'
  inverse-on-surface: '#f0f0fb'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#516070'
  on-secondary: '#ffffff'
  secondary-container: '#d5e4f8'
  on-secondary-container: '#576676'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d5e4f8'
  secondary-fixed-dim: '#b9c8db'
  on-secondary-fixed: '#0e1d2b'
  on-secondary-fixed-variant: '#3a4858'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#faf8ff'
  on-background: '#191b23'
  surface-variant: '#e1e2ed'
typography:
  display-currency:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-padding: 20px
  stack-gap-lg: 24px
  stack-gap-md: 16px
  stack-gap-sm: 12px
  inline-gap: 8px
  safe-area-bottom: 34px
---

## Brand & Style
The design system is centered on a **Corporate / Modern** aesthetic tailored for personal finance management. The objective is to foster a sense of clarity, precision, and financial empowerment. By leveraging a high-fidelity mobile-first approach, the UI evokes a professional yet accessible atmosphere. 

The style utilizes extensive whitespace, subtle depth through soft shadows, and a structured information hierarchy. It avoids visual clutter to ensure that complex financial data remains legible and actionable for the user on a weekly basis.

## Colors
This design system employs a vibrant and functional palette designed for high legibility and semantic clarity.

- **Primary & Secondary**: The vibrant blue (#2563EB) serves as the main driver for actions and brand presence, while the light indigo (#DBEAFE) provides a soft surface for secondary containers or active states.
- **Surface**: The background uses a slightly off-white gray (#F9FAFB) to reduce eye strain and provide a clean canvas for white cards.
- **Typography**: Two tiers of gray ensure a clear visual hierarchy between primary data points and metadata.
- **Semantic**: Success, Warning, and Danger colors are calibrated for high visibility to indicate budget status and transaction types (Income vs. Expense).

## Typography
The typography system relies exclusively on **Inter** to maintain a systematic and utilitarian feel essential for a finance application. 

- **Display Currency**: Specifically for the main balance or total weekly spend. It uses a tighter letter spacing and bold weight to anchor the screen.
- **Hierarchy**: Use `headline-lg` for screen titles and `headline-md` for card headers. 
- **Labels**: `label-sm` is intended for small overlines or category tags, utilizing uppercase styling to differentiate from body text.
- **Alignment**: All financial figures should ideally be right-aligned in list views to facilitate easy comparison of values.

## Layout & Spacing
The layout is optimized for a **390px width mobile device**, utilizing a fluid internal structure within fixed horizontal margins.

- **Margins**: A standard 20px margin is applied to the left and right of the screen.
- **Vertical Rhythm**: Content blocks (Cards) are separated by a 16px or 24px gap depending on the logical grouping.
- **Touch Targets**: All interactive elements maintain a minimum height of 48px to ensure ease of use on mobile.
- **Grids**: Inside cards, a simple 2-column or 4-column layout is used for displaying summary statistics (e.g., Daily Average, Highest Spend).

## Elevation & Depth
This design system uses **Ambient Shadows** to create a premium, layered feel without the harshness of traditional borders.

- **Level 1 (Cards)**: A very soft, diffused shadow (Y: 4px, Blur: 12px, 5% Opacity Black) is used for primary transaction and summary cards.
- **Level 2 (Floating Action Buttons)**: A more pronounced shadow (Y: 8px, Blur: 16px, 10% Opacity Primary Color) to indicate higher interactivity.
- **Tonal Layers**: The primary background is #F9FAFB, while card surfaces are pure #FFFFFF. This subtle contrast provides depth without needing heavy outlines.

## Shapes
The shape language is a mix of high-radius corners for containers and full-pill shapes for interactive elements.

- **Cards**: Use a **16px (rounded-2xl)** radius. This creates a soft, modern look that feels friendly yet professional.
- **Action Elements**: Buttons, input fields, and category chips use a **full-pill radius**. This serves as a visual affordance, distinguishing "clickable" items from "informational" containers.
- **Icons**: Icons should be enclosed in circular containers when used as category markers to maintain consistency with the pill-shaped buttons.

## Components

- **Buttons**: Primary buttons are full-pill, using the Primary #2563EB background with white text. Secondary buttons use the Light Indigo #DBEAFE background with Primary #2563EB text.
- **Cards**: Pure white background with 16px rounded corners and Level 1 shadow. Cards should contain a 16px internal padding.
- **Input Fields**: Full-pill shape with a 1px border (#E5E7EB) and a height of 52px. On focus, the border transitions to Primary #2563EB.
- **Chips/Pills**: Used for transaction categories (e.g., "Food", "Transport"). These are small, full-pill elements with a light gray or secondary color background.
- **Progress Bars**: Used for budget tracking. The track is Light Indigo #DBEAFE and the filler is Primary #2563EB (or Success/Danger based on budget status).
- **Transaction List**: Items consist of a 40px circular icon, a title and timestamp (left), and the amount (right, bold). Use a subtle divider or simple vertical spacing of 12px between items.
- **Navigation Bar**: A clean, bottom-docked navigation with icon labels using `label-md`. The active state is indicated by the Primary #2563EB color.