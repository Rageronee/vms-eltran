---
name: Secure Connect VMS
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#424750'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#737781'
  outline-variant: '#c2c6d2'
  surface-tint: '#2c5fa1'
  primary: '#003a71'
  on-primary: '#ffffff'
  primary-container: '#195192'
  on-primary-container: '#a2c5ff'
  inverse-primary: '#a7c8ff'
  secondary: '#bb0014'
  on-secondary: '#ffffff'
  secondary-container: '#e61822'
  on-secondary-container: '#fffbff'
  tertiary: '#323b42'
  on-tertiary: '#ffffff'
  tertiary-container: '#495259'
  on-tertiary-container: '#bcc5ce'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#a7c8ff'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#044787'
  secondary-fixed: '#ffdad6'
  secondary-fixed-dim: '#ffb4ab'
  on-secondary-fixed: '#410002'
  on-secondary-fixed-variant: '#93000d'
  tertiary-fixed: '#dbe4ed'
  tertiary-fixed-dim: '#bfc8d0'
  on-tertiary-fixed: '#141d23'
  on-tertiary-fixed-variant: '#3f484f'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
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
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  button-text:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system is engineered for **PT Eltran Indonesia** to facilitate a secure, authoritative, and highly efficient Vendor Management System (VMS). The brand personality is rooted in institutional trust and industrial precision, reflecting its role in managing critical vendor infrastructure.

The visual style follows a **Corporate / Modern** aesthetic with a distinctive **Geometric / Industrial** influence. This is characterized by high-contrast primary actions against a sterile white background, punctuated by a mathematical red geometric grid pattern that suggests technological surveillance and radar-like precision. The UI evokes a sense of "secure transparency"—where processes are clearly outlined, professional, and uncompromising in their structural integrity.

Key visual pillars include:
- **Professionalism:** Using heavy-weight Corporate Blue for core navigational elements.
- **Efficiency:** A logic-first layout that prioritizes form completion and data clarity.
- **Security:** Clean, expansive whitespace and deliberate, structured containers.

## Colors

The color palette is restricted and functional to minimize cognitive load during complex data entry.

- **Corporate Blue (#195192):** Used for primary buttons, active stepper states, headers, and key branding elements. This shade represents authority and stability while ensuring accessibility.
- **Signal Red (#EC1E25):** Reserved exclusively for the background geometric radar pattern and critical error states/required field asterisks. It provides a technical, industrial accent with high urgency.
- **Neutral Gray (#EEEEEE):** Used for inactive states, input field backgrounds, and subtle borders. 
- **Pure White (#FFFFFF):** The primary surface color for all cards and page backgrounds to ensure maximum legibility and a clean, institutional feel.

## Typography

This design system utilizes **Inter** for its exceptional legibility in data-dense environments. 

The type hierarchy is systematic:
- **Headlines** utilize bold weights and slight negative letter spacing to command attention in a corporate setting.
- **Labels** are semi-bold and positioned directly above input fields for immediate scanning.
- **Instructional text** uses the body-md scale in a neutral gray to provide context without distracting from primary tasks.
- **Stepper Titles** use the title-md scale with uppercase styling to denote progress milestones clearly.

## Layout & Spacing

The layout employs a **Fixed Grid** system centered within the viewport to maintain a sense of order and focus.

- **Main Container:** Max-width of 1200px for desktop, providing ample whitespace (safe margins) to reduce eye strain.
- **Form Columns:** Forms are typically structured in a 2-column grid for desktop, reflowing to a single column for mobile.
- **Vertical Rhythm:** A strict 8px-based spacing system is used. Labels are 8px from inputs, and input groups are separated by 24px or 32px of vertical space.
- **Background Pattern:** A red geometric grid/radar structure is fixed to the background, subtly visible behind the semi-opaque or pure white main content cards.

## Elevation & Depth

To maintain an "Official and Secure" aesthetic, this design system avoids heavy shadows, opting for **Tonal Layers** and **Low-Contrast Outlines**.

- **Primary Container:** The main multi-step form sits on a large white card with a very soft, diffused shadow (0px 4px 20px rgba(0,0,0,0.05)) to separate it from the patterned background.
- **Input Fields:** These are inset or flat with a subtle #EEEEEE background, creating a "hollowed out" effect rather than an elevated one, which feels more stable and grounded.
- **Buttons:** Primary buttons appear solid and flat, indicating firm action.

## Shapes

The shape language is **Rounded**, striking a balance between modern software friendliness and corporate rigidity.

- **Buttons & Inputs:** Use a 0.5rem (8px) corner radius. This is soft enough to feel contemporary but sharp enough to maintain a professional, architectural feel.
- **Main Content Cards:** Utilize 1rem (16px) corner radius to enclose the entire registration process, creating a distinct "application space."
- **Steppers:** The container for the 4-step process uses a consistent 8px radius to match form elements.

## Components

### 4-Step Horizontal Stepper
The stepper is a central navigation element. 
- **Active State:** Corporate Blue background with white text and a bold label.
- **Completed State:** A darker shade of gray or Corporate Blue with a check icon.
- **Inactive State:** Mid-gray background with white text, indicating steps yet to be taken.

### Form Fields
- **Labels:** Bold Inter, positioned above the field. Required fields marked with a signal red asterisk (*).
- **Inputs:** #EEEEEE background, no border (or very light gray border), 8px radius. Placeholder text in a light gray.
- **Selects:** Include a chevron-down icon on the right for clarity.

### Buttons
- **Primary:** Corporate Blue (#195192) background, white text, 8px radius. Centered or right-aligned for "Next" actions.
- **Secondary/Back:** Outline or ghost style with a "Kembali" (Back) icon to the left.
- **Upload:** Corporate Blue button with a cloud/file icon, paired with a gray label showing the selected filename.

### Background Pattern
A decorative but structured background element inspired by radar/geometric grids. It uses the Secondary Signal Red at low opacity (5-10%) to provide a high-tech, industrial backdrop without interfering with form legibility.