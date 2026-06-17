// Main application entry point
import { loadRoute } from './router.js';

// Component imports
import { initMenu } from './components/menu.js';

// Core Module imports
import { getUserLocation } from './core/Geolocation.js';
import {loadCache, refreshCache, cache} from './core/cache.js';
import { setDebug } from './core/debug.js';
import { loading } from './core/loading.js';
import { orchestrateData } from './core/DataOrchestration.js';
import { setupAlerts } from './core/alertController.js';

// Module imports - empty for now

// Enable double-click to dismiss loading screen (safety feature)
loading.addEventListener('click', () => {
  console.log('Loading dismissed by user');
});

// Load header and footer partials
async function loadPartial(partialPath, elementId) {
    console.log(`Loading ${partialPath} into #${elementId}`);
    try {
        const response = await fetch(partialPath);
        if (!response.ok) throw new Error(`Failed to load ${partialPath}`);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        console.log(`Loaded ${partialPath}`);
    } catch (error) {
        console.error(`Error loading partial:`, error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOMContentLoaded fired');
    loadCache();  // Load cache on app start
    
    console.log('All partials loaded');
});

document.addEventListener('click', e => {
    if (e.target.matches('[data-link]')) {
        e.preventDefault();
        navigate(e.target.href);
    }
});


window.addEventListener('DOMContentLoaded', () => {
    loadRoute(window.location.pathname);
    loadCache();
});

window.onpopstate = () => loadRoute(window.location.pathname);

// Initialize application
async function initializeApp() {
    const params = new URLSearchParams(window.location.search);

    const debug = params.get('debug') === 'true';
    const skipApis = params.get('skipApis') === 'true';

    setDebug({ enabled: debug, skipApis });

    // Determine which APIs to call based on route
    const page = window.location.pathname;

    let apiCalls = {};

    if (page.includes('animal-watch')) {
        apiCalls = {
            birdSightings: true,
            birdImages: true
        };
    }

    if (page.includes('weather')) {
        apiCalls = {
            weather: true,
            airQuality: true
        };
    }

    if (page.includes('stargazing')) {
        apiCalls = {
            stargazing: true
        };
    }

    try {
        setupAlerts();
        const location = await getUserLocation();

        const data = await orchestrateData(debug, skipApis);

        // Route-based rendering
        if (window.location.pathname.includes('bird-sightings')) {
            loadBirdSightingsPage(data);
        }

    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

initializeApp();