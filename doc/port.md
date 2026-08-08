# Design Tokens

## 🎨 Color Palette

### Primary

|Token|Value|
|-|-|
|primary|#FEFFF1|
|primary-container|#BEF264|
|primary-fixed|#BFF365|
|primary-fixed-dim|#A4D64C|
|inverse-primary|#476800|
|on-primary|#233600|
|on-primary-container|#4B6E00|
|on-primary-fixed|#131F00|
|on-primary-fixed-variant|#354E00|

\---

### Secondary

|Token|Value|
|-|-|
|secondary|#BEC6E0|
|secondary-container|#3F465C|
|secondary-fixed|#DAE2FD|
|secondary-fixed-dim|#BEC6E0|
|on-secondary|#283044|
|on-secondary-container|#ADB4CE|
|on-secondary-fixed|#131B2E|
|on-secondary-fixed-variant|#3F465C|

\---

### Tertiary

|Token|Value|
|-|-|
|tertiary|#FFFDFF|
|tertiary-container|#E0DEFF|
|tertiary-fixed|#E1E0FF|
|tertiary-fixed-dim|#C0C1FF|
|on-tertiary|#1000A9|
|on-tertiary-container|#4E50DC|
|on-tertiary-fixed|#07006C|
|on-tertiary-fixed-variant|#2F2EBE|

\---

### Surface

|Token|Value|
|-|-|
|background|#11140C|
|surface|#11140C|
|surface-dim|#11140C|
|surface-bright|#373A30|
|surface-container-lowest|#0C0F07|
|surface-container-low|#1A1D13|
|surface-container|#1E2117|
|surface-container-high|#282B21|
|surface-container-highest|#33362B|
|surface-variant|#33362B|
|surface-tint|#A4D64C|

\---

### Text

|Token|Value|
|-|-|
|on-background|#E2E4D5|
|on-surface|#E2E4D5|
|on-surface-variant|#C3C9B2|
|inverse-surface|#E2E4D5|
|inverse-on-surface|#2E3227|

\---

### Outline

|Token|Value|
|-|-|
|outline|#8D937E|
|outline-variant|#434938|

\---

### Error

|Token|Value|
|-|-|
|error|#FFB4AB|
|error-container|#93000A|
|on-error|#690005|
|on-error-container|#FFDAD6|

\---

# 🔤 Typography

## Font Families

|Token|Font|
|-|-|
|display-lg|Hanken Grotesk|
|headline-xl|Hanken Grotesk|
|headline-xl-mobile|Hanken Grotesk|
|headline-md|Hanken Grotesk|
|body-lg|Geist|
|body-md|Geist|
|label-mono|JetBrains Mono|

\---

## Font Sizes

|Style|Size|Weight|Line Height|Letter Spacing|
|-|-|-|-|-|
|Display Large|72px|800|1.1|-0.04em|
|Headline XL|48px|700|1.2|-0.02em|
|Headline XL Mobile|36px|700|1.2|-|
|Headline Medium|24px|600|1.4|-|
|Body Large|18px|400|1.6|-|
|Body Medium|16px|400|1.6|-|
|Label Mono|14px|500|1.0|0.05em|

\---

# 📐 Spacing Scale

## Global Tokens

|Token|Value|
|-|-|
|unit|8px|
|margin-mobile|20px|
|margin-desktop|64px|
|gutter|32px|
|section-gap|120px|
|container-max|1280px|

\---

# 📦 Component Spacing

## Header

```css
height: 80px;
padding-inline:
  mobile: 20px;
  desktop: 64px;
gap: 32px;
```

\---

## Hero Section

```css
padding-top: 64px;
gap: 24px;
button-group-gap: 16px;
social-gap: 24px;
```

\---

## Section Container

```css
padding-top: 120px;
padding-bottom: 120px;

container:
max-width: 1280px;

padding-inline:
mobile:20px;
desktop:64px;
```

\---

## Card

```css
padding: 32px;

border-radius: 12px;

border:
1px solid outline-variant/10;

backdrop-blur:
24px;

gap:
24px;
```

Used for:

* Tech Stack Cards
* Feature Cards

\---

## Button

### Primary Button

```css
padding:
vertical:16px;
horizontal:32px;

border-radius:8px;

font-size:16px;

gap:
8px;
```

### Secondary Button

```css
padding:
vertical:16px;
horizontal:32px;

border:1px solid outline;

border-radius:8px;

gap:8px;
```

### Icon Button

```css
width:40px;
height:40px;

border-radius:999px;
```

\---

## Badge / Chip

```css
padding:
horizontal:16px;
vertical:8px;

border-radius:999px;

gap:8px;
```

Project tags:

```css
padding:
horizontal:12px;
vertical:4px;

border-radius:999px;
```

\---

## Navigation

```css
item-gap:32px;

logo-gap:8px;

action-gap:24px;
```

\---

## Footer

```css
section-padding:
120px;

column-gap:
32px;

bottom-padding:
32px;
```

\---

## Forms

Email input

```css
padding-top:8px;
padding-bottom:8px;

border-bottom:1px solid outline;
```

\---

## Social Icons

```css
40x40

border-radius:999px
```

\---

## Project Action Buttons

```css
40x40

border-radius:999px;

padding:
center aligned
```

\---

# 🔵 Border Radius

|Token|Value|
|-|-|
|Default|4px|
|Large|8px|
|XL|12px|
|Full|9999px|

Additional usage found:

* 16px (rounded-2xl)
* Circular (9999px)

\---

# 📏 Common Layout Measurements

|Component|Value|
|-|-|
|Header Height|80px|
|Container Width|1280px|
|Standard Card Padding|32px|
|Button Horizontal Padding|32px|
|Button Vertical Padding|16px|
|Section Gap|120px|
|Mobile Margin|20px|
|Desktop Margin|64px|
|Standard Gap|32px|
|Small Gap|24px|
|Compact Gap|16px|
|Tiny Gap|8px|

\---

# 🎯 Design Summary

This design system follows a **Material You-inspired dark theme** with:

* **3 font families**

  * Hanken Grotesk (Display \& Headings)
  * Geist (Body)
  * JetBrains Mono (Labels)
* **8px spacing system**
* **1280px max container**
* **120px vertical section rhythm**
* **32px default component spacing**
* **Rounded corners**

  * 4px
  * 8px
  * 12px
  * Full (9999px)
* **Dark elevated surfaces** using layered surface-container colors.
* **Lime green primary accent** (`#BEF264`) used consistently for emphasis, buttons, active states, and highlights.

