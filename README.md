# Riflebird Documentation

Documentation website for [Riflebird](https://riflebird.dev), built with [VitePress](https://vitepress.dev/).

## Project Structure

This repository contains the source code for the documentation site.

- **`index.md`**: The landing page.
- **`.vitepress/config.mts`**: Main configuration file (theme, sidebar, search, etc.).
- **`public/`**: Static assets like images and logos.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

Install the dependencies:

```bash
npm install
```

### Running Locally

Start the local development server:

```bash
npm run docs:dev
```

The site will be available at `http://localhost:5173` (or similar).

### Building for Production

Build the static site:

```bash
npm run docs:build
```

You can preview the production build locally:

```bash
npm run docs:preview
```

## Deployment

This project is configured to deploy automatically to a **Coolify** instance.

### CI/CD Pipeline

The deployment is handled via GitHub Actions in `.github/workflows/deploy.yml`:

1.  **On Pull Request / Push**: The pipeline runs `npm run docs:build` to ensure the site builds correctly.
2.  **On Merge to `master`**: The pipeline triggers a Coolify Webhook to redeploy the site.

**Note**: To make the deployment work, ensuring the `COOLIFY_WEBHOOK` secret is added to the GitHub Repository settings is required.

## Contributing

1.  Edit the markdown files in the root directory.
2.  Update the sidebar in `.vitepress/config.mts` if adding new pages.
3.  Commit and push your changes.
