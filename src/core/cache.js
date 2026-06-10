import { fetchWeather } from '../modules/weatherEvents/WeatherWatch.js';
import { fetchAirQuality } from '../modules/weatherEvents/AirQuality.js';
import { fetchStargazing } from '../modules/astronomy/StargazingConditions.js';
import { fetchBirdSightings } from '../modules/animalWatcher/BirdSightings.js';

// Cache for storing fetched data
const cache = {
    lastFetched: null,
    location: null,
    weather: null,
    airQuality: null,
    stargazing: null,
    birdSightings: null
};

// Load cache data from localStorage - if manuallyLoaded is true, it means the user has triggered a manual refresh, so we won't rely on cached data until the next fetch cycle
function loadCache(manuallyLoaded = false) {
    const cachedData = localStorage.getItem('goOutsideCache');
    if (cachedData) {
        Object.assign(cache, JSON.parse(cachedData));
    }
    if (manuallyLoaded) {
        cache.loadedManually = true;
    }
}

// Save cache data to localStorage
function saveCache() {
    localStorage.setItem('goOutsideCache', JSON.stringify(cache));
}

// Fetch limiter to prevent excessive API calls
async function fetchWithCache(fetchFunction, lat, lon) {
    const now = Date.now();
    // Check if we have valid cached data (within 12 hours) and it wasn't loaded manually
    if (cache.lastFetched && cache.location && cache.weather && cache.airQuality && cache.stargazing && cache.birdSightings && !cache.loadedManually) {
        const isSameLocation = cache.location.lat === lat && cache.location.lon === lon;
        const isCacheValid = (now - cache.lastFetched) < 12 * 60 * 60 * 1000; // 12 hours
        if (isSameLocation && isCacheValid) {
            console.log('Using cached data');
            return {
                weather: cache.weather,
                airQuality: cache.airQuality,
                stargazing: cache.stargazing,
                birdSightings: cache.birdSightings
            };
        }
    }
    
    // If no valid cache, or cache is loaded manually, fetch new data
    console.log('Fetching new data');
    const weather = await fetchWeather(lat, lon);
    const airQuality = await fetchAirQuality(lat, lon);
    const stargazing = await fetchStargazing(lat, lon);
    const birdSightings = await fetchBirdSightings(lat, lon);
    
    // Update cache with new data
    cache.lastFetched = now;
    cache.location = { lat, lon };
    cache.weather = weather;
    cache.airQuality = airQuality;
    cache.stargazing = stargazing;
    cache.birdSightings = birdSightings;
    cache.loadedManually = false; // Reset manual load flag after fetching new data
    saveCache();

    return { weather, airQuality, stargazing, birdSightings };
}

export { loadCache, saveCache, fetchWithCache, cache };