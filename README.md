# TechniFuse - Premium Development Agency Website

A modern, high-performance Next.js website for a development agency featuring stunning 3D animations, smooth transitions, and a dark theme with gradient accents.

## Features

- 🎨 **Dark Theme Design** - Beautiful dark color scheme with gradient accents
- ✨ **3D Animations** - Smooth animations and transitions using Framer Motion
- 📱 **Fully Responsive** - Optimized for all screen sizes
- ⚡ **High Performance** - Optimized for speed and performance
- 🎯 **Modern UI/UX** - Unique display methods beyond ordinary cards
- 🌈 **Gradient Effects** - Beautiful gradient backgrounds and text effects

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Three Fiber** - 3D graphics (optional)
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
TechniFuse/
├── app/
│   ├── about/          # About page
│   ├── services/       # Services pages
│   ├── portfolio/      # Portfolio page
│   ├── contact/        # Contact page
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx     # Footer component
│   ├── Hero.tsx       # Hero section
│   ├── ServicesPreview.tsx
│   ├── Companies.tsx
│   ├── Stats.tsx
│   ├── Blogs.tsx
│   ├── Quote.tsx
│   ├── Showcase.tsx
│   ├── Reviews.tsx
│   └── ContactForm.tsx
└── public/             # Static assets
```

## Pages

- **Home** (`/`) - Hero, services, stats, showcase, reviews, blogs, quote, contact form
- **About** (`/about`) - Company information and timeline
- **Services** (`/services`) - Services list with dropdown details
- **Service Detail** (`/services/[slug]`) - Individual service details
- **Portfolio** (`/portfolio`) - Filterable project gallery
- **Contact** (`/contact`) - Contact form and information

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme:
- `dark-*` - Dark theme colors
- `accent-*` - Accent colors (primary, secondary, tertiary)

### Content

Update content in respective component files:
- Services: `app/services/page.tsx`
- Portfolio: `app/portfolio/page.tsx`
- About: `app/about/page.tsx`

## Performance Optimizations

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- GPU-accelerated animations
- Optimized bundle size
- Efficient re-renders

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

