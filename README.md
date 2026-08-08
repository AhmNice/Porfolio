# Awwal Codes — Portfolio

The frontend for my personal developer portfolio.

This portfolio is more than a collection of projects. It is a place where I document what I build, the engineering decisions behind those projects, the problems I encounter, and what I learn along the way.

## About

I'm a Computer Science graduate and full-stack developer focused on building reliable web and mobile applications.

My primary focus is backend development with Node.js, TypeScript, Express, PostgreSQL, and Prisma, while also building modern frontend and mobile experiences with React, React Native, and Expo.

I enjoy working on products where I can think beyond individual features and contribute to the architecture, API design, data modeling, authentication, payments, and overall developer experience.

## What You'll Find Here

### Projects

A collection of applications I've built, including:

* Full-stack web applications
* Backend APIs
* Mobile applications
* Dashboards and administrative systems
* Experiments and smaller projects

Each project focuses on the engineering decisions behind the implementation rather than simply showcasing screenshots.

### Technical Writing

I document technical problems and solutions from projects I've worked on.

Topics include:

* Backend architecture
* REST API design
* Authentication and authorization
* Database design
* Prisma and PostgreSQL
* Payment integrations
* React and React Native
* Expo
* API documentation
* Deployment
* Debugging and lessons learned

The goal is to document real problems I've encountered while building software and how I approached solving them.

## Tech Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* React Router
* React Markdown
* Lucide React

### Mobile

* React Native
* Expo
* Expo Router
* NativeWind

### Backend

* Node.js
* Express
* TypeScript
* Zod
* REST APIs

### Database

* PostgreSQL
* Prisma ORM

### Tools & Services

* Git
* GitHub
* Docker
* EAS
* Cloudinary
* Paystack
* Flutterwave

## Architecture

The portfolio frontend is built as a React application with a component-based architecture.

```text
src/
├── components/
│   ├── Navbar/
│   ├── Footer/
│   ├── Markdown/
│   └── ...
│
├── pages/
│   ├── Home/
│   ├── Projects/
│   ├── Blog/
│   └── ...
│
├── content/
│   └── posts/
│
├── assets/
│
├── hooks/
│
├── lib/
│
├── utils/
│
├── App.tsx
└── main.tsx
```

The project is structured to keep reusable UI components separate from page-level composition and content.

## Markdown Content

Technical posts are written in Markdown and rendered through a reusable Markdown viewer.

The viewer supports features such as:

* Headings
* Links
* Blockquotes
* Lists
* Tables
* Inline code
* Fenced code blocks
* Syntax highlighting
* Heading IDs
* GitHub Flavored Markdown

Example:

```tsx
<MarkdownViewer content={post} />
```

This allows technical articles to remain readable and maintainable without embedding large amounts of HTML inside the application.

## Design System

The portfolio uses a custom design system built around CSS variables and Tailwind CSS.

The design system includes:

* Light and dark themes
* Custom color tokens
* Typography tokens
* Spacing tokens
* Surface and container colors
* Code block colors
* Responsive layouts
* Reusable UI components

Typography uses:

* Geist for body text
* Hanken Grotesk for headings
* JetBrains Mono for code and technical content

## Development

Clone the repository:

```bash
git clone <repository-url>

cd portfolio
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite.

## Environment Variables

If environment variables are required, create a `.env` file:

```env
VITE_API_URL=
```

Never commit environment files containing secrets or private credentials.

## Building for Production

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Goals

The portfolio is continuously evolving.

Some of the things I want to improve include:

* Connecting technical posts to a backend
* Building an admin interface for creating and managing posts
* Adding project case studies
* Improving the technical writing experience
* Adding dynamic table-of-contents navigation
* Improving accessibility
* Adding better project filtering and discovery
* Improving performance
* Expanding documentation around my projects

## Philosophy

I believe a good portfolio should demonstrate more than the ability to build interfaces.

It should show how I approach problems.

When I build a project, I try to understand the problem first, design the system around it, make deliberate technical decisions, and document the reasoning behind those decisions.

This portfolio is a record of that process.

## Author

**Muhammed Awwal Musa**

Full-Stack Developer

Focused on building web applications, backend systems, APIs, and mobile applications.

---

This repository contains the frontend of my personal portfolio and is continuously evolving alongside the projects and ideas I work on.
