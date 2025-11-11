# AdComSys 2026 - International Conference Website

<div align="center">

![AdComSys 2026](public/logo.png)

**Third International Conference on Advanced Computing and Systems**

Organized by Department of CST & CSIT  
University of Engineering and Management, Kolkata

📅 **June 25-26, 2026** | 📍 **UEM Kolkata, India**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF.svg)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)

[Live Demo](https://adcomsys2026.uem.edu.in) | [Paper Submission](https://cmt3.research.microsoft.com/AdComSys2025) | [Contact](mailto:adcomsys@uem.edu.in)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Build](#build)
  - [Preview](#preview)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [Known Issues](#known-issues)
- [Roadmap](#roadmap)
- [License](#license)
- [Contact](#contact)

---

## 🎯 About

AdComSys 2026 is the third edition of the International Conference on Advanced Computing and Systems. This website serves as the official conference portal providing information about:

- Conference overview and objectives
- Paper submission guidelines
- Registration details
- Committee members
- Keynote speakers
- Technical programs and schedules
- Conference events and activities

**Publication**: All accepted papers will be published in SCOPUS Indexed **Lecture Notes in Networks and Systems** by Springer.

---

## ✨ Features

### Public Features
- 🏠 **Home Page** - Hero section with conference highlights
- 📚 **About UEM** - University information and achievements
- 👥 **Committee Pages** - Organizing, Technical, and Advisory committees
- 📝 **Paper Submission** - Guidelines and submission portal links
- 📢 **Call for Papers** - Research tracks and topics
- 📅 **Important Dates** - Key conference milestones
- 🎤 **Keynote Speakers** - Featured speakers information
- 📊 **Technical Programs** - Paper schedules and accepted papers
- 💰 **Registration** - Fee structure and payment details
- 🎉 **Events** - Conference activities and workshops
- 📧 **Contact** - Contact information and location map

### Technical Features
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- ♿ **Accessibility** - WCAG compliant components
- 🎨 **Modern UI** - shadcn/ui component library
- 🧭 **Client-side Routing** - React Router v6
- 🎭 **Animation Support** - Smooth transitions and animations
- 🔍 **SEO Optimized** - Meta tags and Open Graph support

---

## 🛠️ Tech Stack

### Core
- **Framework**: [React 18.3.1](https://reactjs.org/)
- **Build Tool**: [Vite 5.4.19](https://vitejs.dev/)
- **Language**: [TypeScript 5.8.3](https://www.typescriptlang.org/)
- **Routing**: [React Router DOM 6.30.1](https://reactrouter.com/)

### Styling
- **CSS Framework**: [Tailwind CSS 3.4.17](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- **Icons**: [Lucide React 0.462.0](https://lucide.dev/)
- **Animations**: [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)

### Additional Libraries
- **State Management**: React useState/useContext
- **Form Handling**: React Hook Form 7.61.1 (installed, not yet implemented)
- **Validation**: Zod 3.25.76 (installed, not yet implemented)
- **Data Fetching**: TanStack Query 5.83.0 (installed, not yet implemented)
- **Date Utilities**: date-fns 3.6.0
- **Toast Notifications**: Sonner 1.7.4

### Development Tools
- **Linting**: ESLint 9.32.0
- **TypeScript ESLint**: typescript-eslint 8.38.0
- **PostCSS**: 8.5.6
- **Autoprefixer**: 10.4.21

---

## 📁 Project Structure

```
adcomsys-2026/
├── public/                      # Static assets
│   └── robots.txt              # SEO robots file
│
├── src/
│   ├── assets/                 # Media assets
│   │   ├── docs/              # Document files
│   │   ├── events/            # Event images
│   │   ├── fonts/             # Custom fonts
│   │   ├── icons/             # Icon files
│   │   ├── images/            # Image files
│   │   ├── hero-video.mp4     # Homepage hero video
│   │   └── *.png              # Logo files
│   │
│   ├── components/             # React components
│   │   ├── ui/                # shadcn/ui components
│   │   │   ├── accordion.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── table.tsx
│   │   │   └── ... (50+ components)
│   │   ├── Header.jsx         # Main navigation header
│   │   ├── Header.css
│   │   ├── Footer.jsx         # Site footer
│   │   └── Footer.css
│   │
│   ├── pages/                  # Page components
│   │   ├── Dashboard.jsx      # Homepage
│   │   ├── AboutUEM.jsx       # About university
│   │   ├── CommitteeOrganizing.jsx
│   │   ├── CommitteeTechnical.jsx
│   │   ├── CommitteeAdvisory.jsx
│   │   ├── Submissions.jsx    # Submission guidelines
│   │   ├── CallForPapers.jsx  # CFP and tracks
│   │   ├── ImportantDates.jsx # Timeline
│   │   ├── KeynoteSpeakers.jsx
│   │   ├── TechnicalSchedule.jsx
│   │   ├── AcceptedPapers.jsx
│   │   ├── BestPapers.jsx
│   │   ├── Registration.jsx   # Registration & fees
│   │   ├── Events.jsx         # Conference events
│   │   ├── Contact.jsx        # Contact page
│   │   ├── NotFound.tsx       # 404 page
│   │   └── *.css              # Page-specific styles
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   │
│   ├── lib/                    # Utility functions
│   │   └── utils.ts           # Helper functions
│   │
│   ├── App.tsx                 # Main app component
│   ├── App.css
│   ├── main.tsx               # Entry point
│   ├── index.css              # Global styles
│   └── vite-env.d.ts          # Vite type definitions
│
├── .gitignore                  # Git ignore rules
├── bun.lockb                   # Bun lock file
├── components.json             # shadcn/ui config
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML template
├── package.json               # Dependencies
├── package-lock.json          # NPM lock file
├── postcss.config.js          # PostCSS config
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript config
├── tsconfig.app.json          # App TypeScript config
├── tsconfig.node.json         # Node TypeScript config
├── vite.config.ts             # Vite configuration
└── README.md                  # This file
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: v9.0.0 or higher (comes with Node.js)
- **Git**: For version control ([Download](https://git-scm.com/))

Optional:
- **Bun**: Alternative runtime (v1.0.0+) - [Install](https://bun.sh/)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/amishabhagat10/adcomsys-2026.git
cd adcomsys-2026
```

2. **Install dependencies**

Using npm:
```bash
npm install
```

Using bun (faster):
```bash
bun install
```

3. **Verify installation**

```bash
npm list --depth=0
```

### Development

Start the development server:

```bash
npm run dev
```

Or with Bun:
```bash
bun dev
```

The application will open at:
- **Local**: http://localhost:8080
- **Network**: http://[your-ip]:8080

The dev server features:
- ⚡ Hot Module Replacement (HMR)
- 🔄 Fast Refresh for React
- 📦 Automatic dependency pre-bundling
- 🎨 CSS hot reload

### Build

Build for production:

```bash
npm run build
```

This will:
1. Run TypeScript compiler checks
2. Build optimized production bundle
3. Generate static assets in `dist/` folder

Build for development mode:
```bash
npm run build:dev
```

### Preview

Preview the production build locally:

```bash
npm run preview
```

Opens at http://localhost:4173

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server at http://localhost:8080 |
| `npm run build` | Build production bundle |
| `npm run build:dev` | Build with development mode settings |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## 🔐 Environment Variables

Currently, this project doesn't use environment variables as it's a static site. If you need to add them:

1. Create `.env` file in root:
```env
# Example
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=AdComSys 2026
```

2. Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

**Note**: Only variables prefixed with `VITE_` are exposed to client-side code.

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel --prod
```

Or connect your GitHub repository to [Vercel](https://vercel.com) for automatic deployments.

### Deploy to Netlify

1. **Build the project**
```bash
npm run build
```

2. **Deploy `dist` folder**
```bash
npx netlify-cli deploy --prod --dir=dist
```

### Deploy to GitHub Pages

1. **Install gh-pages**
```bash
npm install -D gh-pages
```

2. **Add to package.json**
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. **Deploy**
```bash
npm run deploy
```

### Deploy to any Static Host

Build and upload the `dist/` folder to:
- AWS S3 + CloudFront
- Azure Static Web Apps
- Cloudflare Pages
- Firebase Hosting
- Surge.sh

---

## 🌍 Browser Support

| Browser | Supported Versions |
|---------|-------------------|
| Chrome | Last 2 versions ✅ |
| Firefox | Last 2 versions ✅ |
| Safari | Last 2 versions ✅ |
| Edge | Last 2 versions ✅ |
| Opera | Last 2 versions ✅ |
| Mobile Safari | iOS 12+ ✅ |
| Chrome Mobile | Android 8+ ✅ |

**Note**: Internet Explorer is not supported.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Coding Standards

- Follow existing code style
- Use TypeScript for new files
- Add comments for complex logic
- Ensure responsive design
- Test on multiple browsers
- Run `npm run lint` before committing

---

## ⚠️ Known Issues

1. **TypeScript Strict Mode Disabled**
   - Current: `strict: false` in tsconfig.json
   - Impact: Reduced type safety
   - Fix: Planned for future update

2. **Mixed .jsx and .tsx Files**
   - Current: Pages use .jsx despite TypeScript setup
   - Impact: Inconsistent typing
   - Fix: Migration to .tsx planned

3. **Console Logs in Production**
   - Location: NotFound.tsx line 8
   - Impact: Minor performance
   - Fix: Will be removed

4. **No Testing Suite**
   - Current: No unit/integration tests
   - Impact: Manual testing required
   - Fix: Jest/Vitest setup planned

5. **Empty README**
   - Status: ✅ Fixed in this update

6. **Content Typos**
   - "JUne" in Dashboard.jsx
   - Inconsistent dates (2025 vs 2026)
   - Fix: Content review needed

---

## 🗺️ Roadmap

### Phase 1: Current Improvements (Q4 2025)
- [x] Complete README documentation
- [ ] Fix TypeScript configuration
- [ ] Convert all .jsx to .tsx
- [ ] Fix content typos and date inconsistencies
- [ ] Complete SEO meta tags
- [ ] Add comprehensive testing

### Phase 2: Feature Enhancements (Q1 2026)
- [ ] Add loading states and skeletons
- [ ] Implement form validation
- [ ] Add analytics tracking
- [ ] Optimize images and videos
- [ ] Improve accessibility (WCAG AA)
- [ ] Add search functionality

### Phase 3: Backend Integration (Q2 2026)
- [ ] Migrate to Next.js
- [ ] Implement authentication
- [ ] Add database (PostgreSQL + Prisma)
- [ ] Create admin dashboard
- [ ] Implement paper submission system
- [ ] Add email notifications

### Phase 4: Advanced Features (Q3 2026)
- [ ] Real-time updates
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] AI-powered paper recommendations

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 University of Engineering & Management, Kolkata

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Contact

### Conference Convener

**Prof. (Dr.) Maumita Chakraborty**  
Convenor, AdComSys 2026  
Department of CST & CSIT  
University of Engineering & Management, Kolkata

- 📧 Email: [adcomsys@uem.edu.in](mailto:adcomsys@uem.edu.in)
- 📞 Phone: +91 98765 43210
- 🌐 Website: [https://adcomsys2026.uem.edu.in](https://adcomsys2026.uem.edu.in)
- 📝 Paper Submission: [Microsoft CMT Portal](https://cmt3.research.microsoft.com/AdComSys2025)

### University Location

**University of Engineering & Management, Kolkata**  
University Area, Plot No. III, B/5,  
New Town, Action Area III, Kolkata, West Bengal 700160, India

📍 [View on Google Maps](https://goo.gl/maps/your-map-link)

---

## 🙏 Acknowledgments

- **UEM Kolkata** - For organizing and supporting the conference
- **Springer** - For publication partnership (LNNS Series)
- **Microsoft CMT** - For conference management system
- **shadcn/ui** - For beautiful UI components
- **Vercel** - For hosting and deployment platform
- All contributors and conference participants

---

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/amishabhagat10/adcomsys-2026)
![GitHub language count](https://img.shields.io/github/languages/count/amishabhagat10/adcomsys-2026)
![GitHub top language](https://img.shields.io/github/languages/top/amishabhagat10/adcomsys-2026)
![GitHub last commit](https://img.shields.io/github/last-commit/amishabhagat10/adcomsys-2026)

---

<div align="center">

**Made with ❤️ by the AdComSys 2026 Team**

⭐ Star this repo if you find it useful!

[Report Bug](https://github.com/amishabhagat10/adcomsys-2026/issues) · [Request Feature](https://github.com/amishabhagat10/adcomsys-2026/issues) · [Documentation](https://github.com/amishabhagat10/adcomsys-2026/wiki)

</div>
