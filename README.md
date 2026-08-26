<div align="center">

⚡ Full-Stack Social Media Downloader

A modern, multilingual media-downloading platform built with Next.js and Python.

Download supported public media through a clean, responsive interface designed for speed, simplicity, and a polished user experience.

<br />






Built & designed by Azizullah

</div>

✦ Overview

Full-Stack Social Media Downloader is a web application that combines a modern Next.js frontend with a Python-based media processing backend.

The project focuses on three things:

Simple interaction — paste a supported media URL and start processing.

Modern engineering — a separated frontend/backend architecture that is easier to maintain and extend.

Global accessibility — internationalization support for users across different languages and regions.

The interface is intentionally lightweight: no unnecessary visual clutter, no distracting elements, and no complicated workflow between the user and the download action.

Note: Media availability depends on the source platform, URL accessibility, content visibility, and the capabilities of the backend extraction layer.

✨ Highlights

Capability

Description

⚡ Fast Processing

Asynchronous Python processing for efficient media extraction.

🌐 Internationalization

Multi-language routing and localized interface support.

📱 Responsive UI

Designed to provide a consistent experience across desktop and mobile screens.

🔎 SEO Ready

Sitemap generation, metadata configuration, and Open Graph assets.

🧩 Separated Architecture

Frontend and backend can be developed, tested, and deployed independently.

🎨 Optimized Assets

SVG icons and WebP-compatible assets help keep the interface lightweight.

🛠️ Developer Friendly

Straightforward project structure with familiar Node.js and Python tooling.

🏗️ Architecture

The application follows a simple decoupled architecture:

┌───────────────────────┐
│      User / Browser   │
└───────────┬───────────┘
            │
            │ HTTPS / API Request
            ▼
┌───────────────────────┐
│   Next.js Frontend    │
│                       │
│ • UI / UX             │
│ • Routing             │
│ • i18n                │
│ • SEO                 │
└───────────┬───────────┘
            │
            │ REST API
            ▼
┌───────────────────────┐
│    Python Backend     │
│                       │
│ • URL Processing      │
│ • Media Extraction    │
│ • Async Operations    │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│ Supported Source URLs │
└───────────────────────┘

Why this architecture?

Keeping the frontend and backend separate makes the application easier to:

develop locally

maintain over time

deploy independently

scale individual components

replace or improve the extraction layer without rebuilding the UI

🛠️ Technology Stack

Frontend

Next.js

React

TypeScript / JavaScript

PostCSS

next-i18next

next-sitemap

Backend

Python 3.11+

Asynchronous processing

REST-style API layer

downloading_APIs.py media-processing engine

Assets & SEO

SVG icons

WebP-compatible media assets

Open Graph image

Automated sitemap generation

Search-engine-friendly metadata configuration

Development

npm

ESLint

Python virtual environments

Git

📁 Project Structure

.
├── Backend_APIs/
│   └── downloading_APIs.py
│
└── Frontend/
    ├── public/
    │   ├── facebookicon.svg
    │   ├── instagramicon.svg
    │   ├── headerlogo.png
    │   └── ogimage.png
    │
    ├── .eslintrc.json
    ├── next-env.d.ts
    ├── next-i18next.config.js
    ├── next-sitemap.config.js
    ├── next.config.mjs
    ├── package.json
    └── postcss.config.mjs

Directory responsibilities

Backend_APIs/
Contains the Python API and media extraction logic.

Frontend/
Contains the Next.js application, UI, routing, localization, SEO configuration, and static assets.

Frontend/public/
Stores public-facing icons, branding assets, Open Graph artwork, and other static resources.

🚀 Getting Started

Prerequisites

Before running the project, make sure you have:

Node.js 18+

npm 9+

Python 3.11+

Git

You can verify your installations with:

node --version
npm --version
python --version

1. Clone the Repository

git clone <YOUR_REPOSITORY_URL>
cd <YOUR_REPOSITORY_FOLDER>

Replace the placeholders with your actual GitHub repository URL and folder name.

2. Configure the Backend

Open a terminal and move into the backend directory:

cd Backend_APIs

Create a virtual environment

Windows

python -m venv venv
.\venv\Scripts\activate

macOS / Linux

python3 -m venv venv
source venv/bin/activate

Install dependencies

If the repository contains a requirements.txt file:

pip install -r requirements.txt

Then start the backend:

python downloading_APIs.py

Keep the backend terminal running while developing the frontend.

3. Configure the Frontend

Open a second terminal:

cd Frontend

Install the Node.js dependencies:

npm install

Start the development server:

npm run dev

Open the local application in your browser:

http://localhost:3000

🔧 Production Build

Before deploying the frontend, create an optimized production build:

npm run build

Generate the sitemap when next-sitemap is configured in the project:

npx next-sitemap

Start the production server:

npm start

Recommended deployment model

             Internet
                 │
                 ▼
        ┌─────────────────┐
        │  Next.js App    │
        │   Frontend      │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │  Python API     │
        │    Backend      │
        └─────────────────┘

The frontend and backend may be hosted independently as long as the frontend is configured to communicate with the correct backend API endpoint.

🌐 Internationalization

The project includes internationalization support through next-i18next.

The localization configuration is maintained in:

Frontend/next-i18next.config.js

When adding a new language, keep translations organized consistently and avoid hard-coding user-facing text directly inside components whenever possible.

A scalable localization structure should follow the same naming conventions across all supported languages.

🔍 SEO

SEO-related configuration is included as part of the frontend architecture.

The project uses:

dynamic metadata

Open Graph assets

sitemap generation

localized routes

semantic page structure

The sitemap configuration is located at:

Frontend/next-sitemap.config.js

The Open Graph artwork is stored in:

Frontend/public/ogimage.png

SEO best practices

When extending the project:

Give every important page a meaningful title.

Add a useful meta description.

Keep canonical URLs consistent.

Use descriptive Open Graph metadata.

Avoid duplicate localized content.

Keep sitemap entries limited to indexable pages.

Optimize images before adding them to public/.

🎨 Design Philosophy

The UI follows a clean, conversion-focused design philosophy.

Instead of filling the interface with unnecessary cards, gradients, animations, or decorative elements, the experience prioritizes:

Clarity → Trust → Action

Design principles

Strong visual hierarchy

Generous whitespace

Clear primary action

Responsive layouts

Minimal distractions

Consistent typography

Lightweight visual assets

Accessible contrast

Predictable interactions

The goal is not simply to make the application look attractive — it is to make the next action obvious to the visitor.

🔐 Security & Responsible Use

This project should be used responsibly.

Users are responsible for ensuring that the media they process or download is content they are legally permitted to access, reproduce, or download.

When deploying the application publicly, consider implementing:

rate limiting

request validation

abuse prevention

request logging

API authentication where appropriate

timeout and resource limits

server-side error handling

protection against excessive concurrent requests

Do not expose sensitive credentials, private API keys, internal server details, or environment-specific configuration in the frontend or Git repository.

⚙️ Environment Configuration

If your deployment requires environment variables, keep them outside source control.

For example:

Frontend/
├── .env.local
├── .env.example
└── ...

Never commit secrets such as:

API keys
Database passwords
Private tokens
Authentication secrets
Server credentials

A safe practice is to provide a .env.example containing variable names without real credentials.

🧪 Development Workflow

A clean development workflow can follow:

1. Create a feature branch
        ↓
2. Implement the change
        ↓
3. Test locally
        ↓
4. Run lint / validation
        ↓
5. Build the frontend
        ↓
6. Commit with a clear message
        ↓
7. Open a pull request

Before pushing changes:

npm run build

and verify that the backend starts correctly.

🐛 Troubleshooting

Backend does not start

Check:

python --version

Make sure the virtual environment is active and dependencies are installed:

pip install -r requirements.txt

Frontend dependencies fail

Remove the local dependency directory and reinstall:

rm -rf node_modules
npm install

On Windows PowerShell:

Remove-Item -Recurse -Force node_modules
npm install

Frontend cannot communicate with the backend

Check:

backend process is running

API endpoint is correct

frontend environment configuration is correct

CORS configuration permits the frontend origin

firewall / reverse proxy rules are not blocking the request

Production build fails

Run:

npm run build

and inspect the first meaningful error in the terminal rather than only the final summary.

📌 Important Notes

The availability and quality of extracted media depend on the source URL and platform behavior.

Third-party platforms can change their page structures or access policies without notice.

Public deployment should include appropriate rate limiting and abuse protection.

This project does not imply affiliation with or endorsement by the platforms whose URLs it processes.

Always respect applicable laws, platform terms, and intellectual-property rights.

🤝 Contributing

Contributions are welcome.

A good contribution should:

solve a clearly defined problem

follow the existing project structure

avoid unnecessary dependencies

preserve the existing UI/UX quality

include appropriate testing or validation

keep documentation updated when behavior changes

Suggested contribution flow

git checkout -b feature/your-feature

Make your changes, test them, then commit:

git add .
git commit -m "feat: add your feature"
git push origin feature/your-feature

Open a pull request with a concise explanation of what changed and why.

📄 License

This project is distributed under the MIT License.

See the LICENSE file for the complete license text.

👨‍💻 Author

<div align="center">

Azizullah

Full-Stack Developer · Software Engineer · Designer

Building modern web applications with a focus on clean architecture, practical engineering, and thoughtful user experience.

</div>

<div align="center">

Built with precision. Designed for simplicity.

⭐ If you find the project useful, consider giving it a star.

</div>
