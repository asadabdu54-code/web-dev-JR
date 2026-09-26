# Maison Étoile

A luxury e-commerce storefront built with Next.js, TypeScript, Tailwind CSS, and MongoDB-ready backend support.

## Features

- Premium editorial storefront styling
- Responsive product catalog with category filters
- Cart management with add, remove, and quantity controls
- Product API with MongoDB connection support and fallback demo data
- Vercel-ready deployment configuration

## Local Development

1. Copy `.env.example` to `.env.local`
2. Add your MongoDB connection string to `MONGODB_URI`
3. Install dependencies: `npm install`
4. Run the app: `npm run dev`

## Production Build

```bash
npm run build
npm start
```

## Deploy on Vercel

This app is ready to deploy to Vercel. Add the `MONGODB_URI` environment variable in your Vercel project settings.
