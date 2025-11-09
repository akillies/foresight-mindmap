# 🌌 Strategic Foresight Mind Map

**An Interactive 3D Visualization of Futures Thinking Methodologies**

A living archive of strategic foresight knowledge, built with React and Three.js. Navigate through a beautiful 3D space to explore 18+ futures methodologies, connect with historical pioneers through curated media, and transform how you understand and practice foresight.

🔗 **Repository**: [github.com/akillies/foresight-mindmap](https://github.com/akillies/foresight-mindmap)
📝 **Created for**: [The Boundary Layer](https://theboundarylayer.substack.com) by Alexander Kline

---

## ✨ Features

### 🎯 Core Capabilities
- **Interactive 3D Navigation** - Orbit, zoom, and explore a starfield of futures methodologies
- **Three-Level Hierarchy**
  - **Level 0**: Strategic Foresight (center node)
  - **Level 1**: Six Pillars framework (Mapping, Anticipating, Timing, Deepening, Creating, Transforming)
  - **Level 2**: 18+ specific methodologies (CLA, Scenario Planning, Delphi, etc.)
  - **Level 3**: 50+ curated media items (videos, images, articles, documents)

### 📺 Rich Media Integration
- **Historical Videos**: Watch pioneers like Sohail Inayatullah, Pierre Wack, and Igor Ansoff explain their methods
- **Framework Diagrams**: Visual representations of CLA layers, Futures Triangle, scenario matrices
- **Encyclopedia Links**: Deep-dive articles for every methodology
- **Original Documents**: Foundational papers from RAND, Shell, and academic institutions

### 🎨 Star Trek TNG LCARS Aesthetic
- Dark space background with glowing particle starfield
- Color-coded nodes by pillar (Blue, Amber, Purple, Orange, Green, Pink)
- Smooth animations and hover effects
- Professional, futuristic interface

### 🔍 Smart Interaction
- **Real-time Search**: Filter methodologies as you type
- **Click to Expand**: Reveal child nodes and media
- **Hover Tooltips**: Quick previews of content
- **Responsive Design**: Works on desktop, tablet, and mobile

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ (LTS recommended)
- **npm** 9+
- Modern browser with WebGL support

### Installation

```bash
# Clone the repository
git clone https://github.com/akillies/foresight-mindmap.git
cd foresight-mindmap

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The optimized build will be in the `dist/` directory.

---

## 🎮 How to Use

### Navigation
- **Drag** - Orbit around the mind map
- **Scroll** - Zoom in and out
- **Click nodes** - Expand to see methodologies
- **Click media orbs** - View videos, images, articles
- **Search box** - Find specific methodologies

### Exploration Flow
1. **Start at center** - Understand Strategic Foresight
2. **Click a pillar** - Explore one of the Six Pillars
3. **Discover methods** - See specific techniques appear
4. **Engage with media** - Watch videos, view diagrams
5. **Search** - Jump to specific topics

---

## 📚 Content Structure

### Level 1: The Six Pillars

**1. Mapping** (Blue #5C88DA)
- Understanding current views of the future
- Methods: Futures Triangle, Stakeholder Analysis

**2. Anticipating** (Amber #FFCC66)
- Detecting early signs of change
- Methods: Environmental Scanning, Weak Signals, Emerging Issues Analysis

**3. Timing** (Purple #CC99CC)
- Understanding macro-historical patterns
- Methods: Macro-Historical Analysis, Cycle Theory

**4. Deepening** (Orange #FF9966)
- Uncovering worldviews and myths
- Methods: Causal Layered Analysis, Discourse Analysis

**5. Creating Alternatives** (Green #99CC99)
- Developing multiple plausible scenarios
- Methods: Scenario Planning, Wild Cards, Morphological Analysis, Delphi Method

**6. Transforming** (Pink #FF6B9D)
- Creating and achieving preferred futures
- Methods: Visioning, Backcasting, Strategic Issue Management

### Level 2: The Methodologies (18 Total)

Each methodology includes:
- Clear description and overview
- Detailed components breakdown
- Historical context and creators
- Applications and use cases
- Links to encyclopedia entries
- Curated media collection

### Level 3: The Media Archive (50+ Items)

- **📺 Videos (25+)**: Historical lectures, demonstrations, interviews
- **🖼️ Images (15+)**: Framework diagrams, visualizations, charts
- **📚 Articles (20+)**: Encyclopedia entries for deep learning
- **📄 Documents (10+)**: Original papers, institutional reports

---

## 🛠️ Technical Stack

### Core Technologies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "three": "^0.158.0",
  "vite": "^5.0.0"
}
```

### Architecture
- **No additional dependencies** - Vanilla JavaScript for Three.js
- **Manual orbit controls** - Custom implementation
- **Native React hooks** - useState, useEffect, useRef
- **Minimal bundle size** - ~400KB compressed

### File Structure
```
foresight-mindmap/
├── src/
│   ├── ForesightMindMap.jsx    # Main 3D component (900+ lines)
│   ├── mindMapData.js          # Complete data structure (50+ media items)
│   ├── App.jsx                 # App wrapper
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🎨 Design System

### LCARS Color Palette
```javascript
{
  primary:    '#5C88DA',  // LCARS Blue
  secondary:  '#FFCC66',  // LCARS Amber
  accent:     '#CC99CC',  // LCARS Purple
  highlight:  '#FF9966',  // LCARS Orange
  success:    '#99CC99',  // LCARS Green
  pink:       '#FF6B9D',  // Transformative Pink
  background: '#000000',  // Deep Space Black
  panel:      '#1a1a2e',  // Panel Background
  text:       '#E8F1FF'   // Light Blue Text
}
```

### Typography
- **Font**: Inter (Google Fonts)
- **Headers**: 600 weight, letter-spacing: 1px
- **Body**: 400 weight, line-height: 1.6

---

## 🌟 Key Features Explained

### Three.js Scene
- **2000 particle starfield** with LCARS color theming
- **Three-point lighting** (key, fill, rim)
- **Real-time animations** (floating nodes, pulsing glow)
- **60 FPS target** on desktop, 30+ on mobile

### Node System
- **Spherical geometry** with varying sizes by level
- **Emissive materials** for glow effect
- **Curved connections** using CatmullRomCurve3
- **Expand/collapse** for progressive disclosure

### Interaction System
- **Raycasting** for precise mouse detection
- **Hover effects** with scale and intensity changes
- **Click handlers** for expansion and media viewing
- **Search filtering** with real-time opacity adjustment

---

## 📈 Performance

### Optimization Strategies
- Low-poly sphere geometry (16-32 segments)
- Efficient raycasting with bounding boxes
- Particle system optimization (2000 max)
- Shadow map resolution balanced for quality/performance
- Responsive pixel ratio (capped at 2x)

### Browser Compatibility
- ✅ Chrome 90+ (Windows, Mac, Linux)
- ✅ Firefox 88+ (Windows, Mac, Linux)
- ✅ Safari 14+ (Mac, iOS)
- ✅ Edge 90+ (Windows, Mac)
- ❌ Internet Explorer (not supported)

---

## 🚀 Deployment

### Static Hosting (Recommended)
Deploy to any of these platforms:
- **Netlify**: `netlify deploy --prod --dir=dist`
- **Vercel**: `vercel --prod`
- **GitHub Pages**: See [deployment guide](https://vitejs.dev/guide/static-deploy.html#github-pages)
- **AWS S3 + CloudFront**
- **Firebase Hosting**

### Environment Requirements
- Node.js 18+ for build
- Static file hosting for deployment
- HTTPS required for WebGL

---

## 🎓 Educational Use

### Target Audiences
1. **Futures Practitioners** - Quick reference and training
2. **Students** - Systematic curriculum exploration
3. **Executives** - Understanding foresight methodologies
4. **Educators** - Interactive teaching tool
5. **Researchers** - Comprehensive field knowledge

### Learning Pathways
- **Quick Tour** (15 min) - Overview of Six Pillars
- **Deep Dive** (1-2 hrs) - Explore all methodologies
- **Specialist** (3-5 hrs) - Focus on specific methods
- **Researcher** (Ongoing) - Comprehensive field mastery

---

## 🔮 Future Enhancements

### Planned Features
- [ ] Guided tours with narration
- [ ] Timeline view of methodology evolution
- [ ] Network graph mode (2D relationships)
- [ ] Comparison tool for methodologies
- [ ] User accounts and bookmarks
- [ ] VR/AR support (WebXR)
- [ ] Multi-language support
- [ ] Community contributions

---

## 🤝 Contributing

This is a personal project for The Boundary Layer, but suggestions and feedback are welcome!

### How to Suggest Improvements
1. Open an issue describing the enhancement
2. Provide context and examples
3. Link to relevant sources or media

### Content Contributions
Have a great video lecture or foundational paper?
- Must be authoritative and historically significant
- Preferably from original thinkers
- Openly accessible (no paywalls)
- Submit via issue with full details

---

## 📄 License

Created for **The Boundary Layer** by Alexander Kline.

### Content Sources
- Media items link to original sources (YouTube, Wikipedia, institutional sites)
- All content properly attributed
- Educational use under fair use doctrine

---

## 🙏 Acknowledgments

### Methodology Creators
- **Sohail Inayatullah** - Causal Layered Analysis, Futures Triangle
- **Pierre Wack & Peter Schwartz** - Shell Scenario Planning
- **Igor Ansoff** - Weak Signals, Strategic Issue Management
- **Jim Dator** - Four Generic Futures
- **Fernand Braudel** - Longue Durée
- **John Robinson** - Backcasting
- **Fritz Zwicky** - Morphological Analysis
- **RAND Corporation** - Delphi Method

### Institutions
- Shell Group Planning
- RAND Corporation
- Global Business Network
- University of Hawaii Manoa Alternative Futures Center

---

## 📞 Contact

**Alexander Kline**
The Boundary Layer
🌐 [theboundarylayer.substack.com](https://theboundarylayer.substack.com)
💻 [github.com/akillies](https://github.com/akillies)

---

## 🌟 Star This Project

If you find this useful, please star the repository on GitHub!

**"The best way to predict the future is to invent it."** - Alan Kay

---

*Built with React, Three.js, and a vision for making futures thinking accessible to all.*
