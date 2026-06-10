// Component imports
import { initMenu } from './components/menu.js';

// Core Module imports
import { getUserLocation } from './core/Geolocation.js';
import {loadCache, fetchWithCache, cache} from './core/cache.js';

// Module imports
import { fetchWeather } from './modules/weatherEvents/WeatherWatch.js';
import { fetchAirQuality } from './modules/weatherEvents/AirQuality.js';
import { fetchStargazing } from './modules/astronomy/StargazingConditions.js';

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
    await loadPartial('/src/public/partials/header.html', 'partial-header');
    await loadPartial('/src/public/partials/footer.html', 'partial-footer');
    
    initMenu();  // Initialize menu after partials load
    
    console.log('All partials loaded');
});

// Initialize application
async function initializeApp() {
    try {
        console.log('Getting user location...');
        const location = await getUserLocation();
        console.log('Location:', location);
        
        console.log('Checking cache...');
        // fetchWithCache will handle cache validation and fetching new data if needed. Ensures we don't make unnecessary API calls.
        const { weather, airQuality, stargazing, birdSightings } = await fetchWithCache(null, location.lat, location.lon);
        console.log('Weather:', weather);
        console.log('Air Quality:', airQuality);
        console.log('Stargazing conditions:', stargazing);
        console.log('Bird sightings:', birdSightings);

        // Display last updated time
        displaylastUpdated();

        // Display location data
        displayLocation(location);

        // Display weather data
        displayWeatherData(weather);

        // Display air quality data
        displayAirQuality(airQuality);

        // Fetch and display stargazing conditions
        displayStargazing(stargazing);

        // Fetch and display bird sightings
        displayBirdSightings(birdSightings);

    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

function displaylastUpdated() {
    const mainContent = document.getElementById('home-content');
    const lastUpdated = new Date(cache.lastFetched).toLocaleString();
    const html = `
        <div class="last-updated">
            <p class="bold">Last Updated: ${lastUpdated}</p>
        </div>
    `;
    mainContent.innerHTML += html;
    console.log('Last updated displayed');
}

function displayLocation(location) {
    if (!location) {
        console.warn('No location data to display');
        return;
    }
    const mainContent = document.getElementById('home-content');
    const html = `
        <div class="location-display">
            <h2>Your Location</h2>
            <p>Latitude: ${location.lat}</p>
            <p>Longitude: ${location.lon}</p>
        </div>
    `;
    mainContent.innerHTML += html;
    console.log('Location displayed');
}


function displayWeatherData(weather) {
    if (!weather) {
        console.warn('No weather data to display');
        return;
    }
    const mainContent = document.getElementById('home-content');
    
    const html = `
        <div class="weather-display">
            <h2>Current Weather</h2>
            <p>Temperature: ${weather.temperature_2m}°C</p>
            <p>Weather Code: ${weather.weather_code}</p>
        </div>
    `;
    
    mainContent.innerHTML += html;
    console.log('Weather displayed');
}

function displayAirQuality(airQuality) {
    if (!airQuality) {
        console.warn('No air quality data to display');
        return;
    }
    const mainContent = document.getElementById('home-content');
    const html = `
        <div class="air-quality-display">
            <h2>Air Quality</h2>
            <p>PM2.5: ${airQuality.pm2_5}</p>
            <p>PM10: ${airQuality.pm10}</p>
            <p>AQI: ${airQuality.european_aqi}</p>
        </div>
    `;
    
    mainContent.innerHTML += html;
    console.log('Air quality displayed');
}

function displayStargazing(stargazing) {
    if (!stargazing) {
        console.warn('No stargazing data to display');
        return;
    }
    const mainContent = document.getElementById('home-content');
    const html = `
        <div class="stargazing-display">
            <h2>Stargazing Conditions</h2>
            <p>Cloud Cover: ${stargazing.cloud_cover[0]}%</p>
            <p>Visibility: ${stargazing.visibility[0]}m</p>
        </div>
    `;
    mainContent.innerHTML += html;
}

function displayBirdSightings(birdSightings) {
    if (!birdSightings || birdSightings.length === 0) {
        console.warn('No bird sightings data to display');
        return;
    }
    const mainContent = document.getElementById('home-content');
    
    // Extract common names from each bird object
    const birdCards = birdSightings.slice(0, 8).map(bird => `
        <div class="bird-card">
            <h3>${bird.comName}</h3>
            <p><em>${bird.sciName}</em></p>
            <p>${bird.locName}</p>
            <p>${bird.obsDt}</p>
        </div>
    `).join('');
    const html = `
        <div class="bird-sightings-display">
            <h2>Recent Bird Sightings <span class="italic">Within 30 Miles</span></h2>
            ${birdCards}
        </div>
    `;
    mainContent.innerHTML += html;
}


initializeApp();