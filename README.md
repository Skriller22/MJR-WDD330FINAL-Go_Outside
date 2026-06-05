# Go Outside - Outdoor Events Tracker

A web application designed to reconnect people with nature by providing real-time data about outdoor events and activities in their local area.

## 🎯 Project Overview

**Target Audience:** Families and individuals interested in nature, particularly those in high-stress environments seeking outdoor connection.

**Core Mission:** Show users what's happening in nature around them to combat tech-centric disconnection from the outdoors.

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp .env.example .env.local
   ```

   Then add your API keys to `.env.local`:
   - Get eBird API key: https://ebird.org/api/keygen
   - (Optional) Get NASA APOD API key: https://api.nasa.gov

3. **Start development server:**

   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:3000`

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── core/                      # Core application modules
│   ├── Geolocation.js        # User location detection
│   ├── DataOrchestration.js  # Coordinates data from all sources
│   └── InsightEngine.js      # Analyzes data for insights
│
├── modules/                   # Feature-specific modules
│   ├── animalWatcher/
│   │   └── BirdData.js       # Bird sightings & migration
│   ├── weatherEvents/
│   │   ├── WeatherWatch.js   # Current & forecasted weather
│   │   └── AirQuality.js     # Air quality & pollen data
│   ├── astronomy/
│   │   └── StargazingConditions.js  # Sky conditions & astronomy
│   └── adventurePlanner/
│       └── (Packing, resources, printables)
│
├── components/                # React UI components
│   ├── Header.jsx
│   ├── WeatherCard.jsx
│   ├── BirdSightings.jsx
│   ├── LocalInsights.jsx
│   └── AdventurePlanner.jsx
│
├── styles/                    # CSS stylesheets
│   ├── index.css             # Global styles & variables
│   ├── App.css
│   ├── Header.css
│   ├── WeatherCard.css
│   ├── BirdSightings.css
│   ├── LocalInsights.css
│   └── AdventurePlanner.css
│
├── App.jsx                    # Main app component
└── main.jsx                   # React entry point
```

## 🎨 Design System

### Color Palette

- **Wood:** `#8c6545` - Primary dark color
- **Greenery:** `#a3a380` - Secondary color
- **Greenery Accent:** `#c8d694` - Interactive elements
- **Primary Light:** `#ebe7c9` - Background
- **Secondary Light:** `#e2c6ac` - Accents
- **Highlight:** `#bb8588` - Alerts & emphasis

### Typography

- **Headings:** Quicksand
- **Body:** Quicksand
- **Card Headings:** Roboto Condensed
- **Card Text:** Merriweather

## 🔌 API Integrations

### Currently Implemented

- **eBird API** - Real-time bird sightings (requires API key)
- **Open-Meteo APIs** - Free weather, air quality, astronomy data
  - Weather forecasts
  - Air quality & pollen
  - Stargazing conditions

### Planned Integrations

- **iNaturalist API** - Wildlife observations
- **BirdCast** - Migration forecasts
- **NOAA** - Advanced weather alerts
- **NASA APOD** - Astronomy images & events
- **Google Places** - Local parks & trails
- **USGS National Map** - Topography & land data

## 📊 Key Features

1. **Real-time Weather** - Current conditions with pollen & air quality
2. **Bird Tracking** - Recent sightings and migration patterns
3. **Stargazing** - Cloud cover and astronomy conditions
4. **Insights Engine** - Actionable recommendations based on data
5. **Adventure Planner** - Packing lists and local resources
6. **Printable Content** - No account required, offline-friendly
7. **Responsive Design** - Works on all devices
8. **Accessible** - Designed for all ages and abilities

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint (when configured)
```

### Code Structure

- **Modular architecture** - Features are self-contained
- **Separation of concerns** - Core logic, modules, components clearly separated
- **Easy API integration** - Each data source has its own module
- **Responsive CSS** - Mobile-first approach with breakpoints at 768px and 480px

## 🌱 Next Steps

1. Add API keys to `.env.local`
2. Implement remaining API integrations
3. Build out Adventure Planner features
4. Add print functionality
5. Implement caching & offline support
6. Add unit & integration tests

## 📝 Notes

- The app uses Geolocation API to detect user location (with permission)
- No authentication required - data is public
- Consider adding a backend proxy later if you hit CORS issues
- All external APIs are documented in `.env.example`

## 📄 License

Part of WDD330 course work.

---

**Start contributing:**

1. Create a feature branch
2. Make your changes
3. Test locally with `npm run dev`
4. Commit with clear messages
5. Push to your branch
