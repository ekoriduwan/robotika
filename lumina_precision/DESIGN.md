---
name: Lumina Precision
colors:
  surface: '#f7f9fc'
  surface-dim: '#d8dadd'
  surface-bright: '#f7f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f7'
  surface-container: '#eceef1'
  surface-container-high: '#e6e8eb'
  surface-container-highest: '#e0e3e6'
  on-surface: '#191c1e'
  on-surface-variant: '#424656'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f4'
  outline: '#727687'
  outline-variant: '#c2c6d8'
  surface-tint: '#0054d6'
  primary: '#0050cb'
  on-primary: '#ffffff'
  primary-container: '#0066ff'
  on-primary-container: '#f8f7ff'
  inverse-primary: '#b3c5ff'
  secondary: '#006e1c'
  on-secondary: '#ffffff'
  secondary-container: '#60fe6c'
  on-secondary-container: '#00731d'
  tertiary: '#006278'
  on-tertiary: '#ffffff'
  tertiary-container: '#007c98'
  on-tertiary-container: '#effaff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae1ff'
  primary-fixed-dim: '#b3c5ff'
  on-primary-fixed: '#001849'
  on-primary-fixed-variant: '#003fa4'
  secondary-fixed: '#70ff76'
  secondary-fixed-dim: '#42e355'
  on-secondary-fixed: '#002204'
  on-secondary-fixed-variant: '#005313'
  tertiary-fixed: '#b7eaff'
  tertiary-fixed-dim: '#4cd6ff'
  on-tertiary-fixed: '#001f28'
  on-tertiary-fixed-variant: '#004e60'
  background: '#f7f9fc'
  on-background: '#191c1e'
  surface-variant: '#e0e3e6'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
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
  base: 8px
  container-margin: 24px
  gutter: 16px
  stack-sm: 4px
  stack-md: 12px
  stack-lg: 24px
---

## Brand & Style
The design system moves away from traditional, heavy industrial aesthetics toward a "Pro-Gamified" experience. It balances high-stakes engineering precision with the dopamine-driven feedback loops of modern performance software. The goal is to make complex data entry and monitoring feel light, rewarding, and high-energy without sacrificing professional utility.

The style is a hybrid of **Corporate Modern** and **Glassmorphism**, utilizing high-saturation interactive states against a pristine, airy background. The UI should evoke a sense of "Advanced Clarity"—where every engineering tolerance is exact, but the interface itself feels as fluid and responsive as a premium flight simulator or performance tracking app.

## Colors
The palette is anchored by a high-frequency **Electric Blue** (#0066FF) for primary actions and brand presence. To achieve the "gamified" feel, **Lime Green** (#32D74B) is used for "Optimal" or "Success" states, while **Cyan** (#00D1FF) serves as a secondary accent for data visualization and progress indicators.

The background uses a tiered system of crisp whites and very cool light grays to maintain a "laboratory-clean" environment. Interactive elements use highly saturated versions of these colors to stand out against the neutral canvas.

## Typography
The system utilizes **Inter** exclusively to maintain an engineering-grade legibility. To lean into the gamified aesthetic, the weight distribution is pushed to extremes: Headlines and Display levels use **ExtraBold (800)** and **Bold (700)** weights with tight letter-spacing to create a "dashboard" impact. 

Labels and small data points use **SemiBold (600)** or **Bold (700)** to ensure visibility even when placed over vibrant accent colors. Body text remains at a standard weight for long-form technical documentation reading.

## Layout & Spacing
The layout follows a **12-column fluid grid** for desktop, optimized for dense engineering data. However, the system uses generous "Safe Zones" (margins) of 24px to prevent the UI from feeling cramped. 

A strict **8px base unit** governs all spacing. For gamified elements like "Achievement Cards" or "Real-time Gauges," use more aggressive internal padding (24px+) to create a sense of importance and "breathability" around critical metrics.

## Elevation & Depth
In alignment with the gamified, light-mode directive, depth is achieved through **Tonal Layers** and **Soft Shadows** rather than borders. 

- **Level 0 (Base):** #F2F4F7 (Cool Gray)
- **Level 1 (Cards/Panels):** #FFFFFF (Pure White) with a soft, 15% opacity primary-tinted shadow (0px 4px 20px).
- **Level 2 (Modals/Popovers):** Glassmorphic effect using `backdrop-filter: blur(12px)` and a 60% transparent white fill.

Avoid pure black shadows. Shadows should always be tinted with the Primary color (Electric Blue) at a very low alpha to maintain the "bright" feel of the system.

## Shapes
The system utilizes the **Rounded** (Level 2) logic but applies a specific 12px (0.75rem) radius to most standard components to achieve the requested "app-like" feel. 

Large containers and cards should use `rounded-xl` (1.5rem / 24px) to emphasize the soft, modern geometry. Success indicators and status badges should use a "Pill" shape (full radius) to distinguish them as dynamic, status-driven elements.

## Components
- **Buttons:** Use high-saturation Electric Blue. Primary buttons should have a subtle 2px bottom-weighted shadow to feel "pressable" (gamified).
- **Inputs:** Pure white fills with a soft 1px #D1D5DB border that transforms into a 2px Electric Blue glow on focus.
- **Progress Bars:** Use thick, 12px tracks with rounded ends. The "fill" should utilize a subtle gradient from Tertiary (Cyan) to Secondary (Lime Green) to indicate completion progress.
- **Status Chips:** High-contrast backgrounds (e.g., solid Lime Green with white text) using the "Pill" shape for maximum visibility.
- **Cards:** White background, 24px corner radius, and no border. Depth is provided exclusively by the primary-tinted soft shadow.
- **Data Gauges:** Circular or semi-circular layouts with bold typography in the center, utilizing the primary and accent colors for high-readability engineering metrics.