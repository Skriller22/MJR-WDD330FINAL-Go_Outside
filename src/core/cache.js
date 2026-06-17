import { loading } from './loading.js';
import { DEBUG_CONFIG } from './debug.js';
import { fetchWeather } from '../modules/weatherEvents/WeatherWatch.js';
import { fetchAirQuality } from '../modules/weatherEvents/AirQuality.js';
import { fetchStargazing } from '../modules/astronomy/StargazingConditions.js';
import { fetchBirdSightings } from '../modules/animalWatcher/BirdSightings.js';
import { fetchBirdImages } from '../modules/animalWatcher/BirdImages.js';

// Cache for storing metadata
const cacheMeta = {
    lastFetched: null,
    location: null,
    loadedManually: false
}

// Cache for storing fetched data
const cache = {
    weather: null,
    airQuality: null,
    stargazing: null,
    birdSightings: null,
    birdImages: {}
};

// Check if cache is valud
function isCacheValid(lat, lon) {
    if (!cacheMeta.lastFetched) return false;
    if (cacheMeta.loadedManually) return false;

    const sameLocation =
        cacheMeta.location.lat === lat &&
        cacheMeta.location.lon === lon;

    const fresh =
        Date.now() - cacheMeta.lastFetched < 12 * 60 * 60 * 1000;

    return sameLocation && fresh;
}

async function getWeather(lat, lon) {
    if (isCacheValid(lat, lon) && cache.weather) {
        console.log('Using cached weather data');
        return cache.weather;
    }
    const data = await fetchWeather(lat, lon);
    cache.weather = data;
    return data;
}

async function getAirQuality(lat, lon) {
    if (isCacheValid(lat, lon) && cache.airQuality) {
        console.log('Using cached air quality data');
        return cache.airQuality;
    }
    const data = await fetchAirQuality(lat, lon);
    cache.airQuality = data;
    return data;
}

async function getStargazing(lat, lon) {
    if (isCacheValid(lat, lon) && cache.stargazing) {
        console.log('Using cached stargazing data');
        return cache.stargazing;
    }
    const data = await fetchStargazing(lat, lon);
    cache.stargazing = data;
    return data;
}

async function getBirdSightings(lat, lon) {
    if (isCacheValid(lat, lon) && cache.birdSightings) {
        console.log('Using cached bird sightings data');
        return cache.birdSightings;
    }
    const data = await fetchBirdSightings(lat, lon);
    cache.birdSightings = data;
    return data;
}

async function getBirdImage(scientificName) {
    if (!scientificName) return null;

    // If cached, return instantly
    if (cache.birdImages[scientificName]) {
        return cache.birdImages[scientificName];
    }

    // Otherwise fetch from iNaturalist
    const url = await fetchBirdImages(scientificName);

    // Store in cache
    cache.birdImages[scientificName] = url;
    saveCache();

    return url;
}

async function refreshCache(lat, lon) {
    loading.show();
    try {
        cache.weather = await fetchWeather(lat, lon);
        cache.airQuality = await fetchAirQuality(lat, lon);
        cache.stargazing = await fetchStargazing(lat, lon);
        cache.birdSightings = await fetchBirdSightings(lat, lon);

        cacheMeta.lastFetched = Date.now();
        cacheMeta.location = { lat, lon };
        cacheMeta.loadedManually = false;

        console.log('Cache refreshed successfully');
    } catch (error) {
        console.error('Error refreshing cache:', error);
    }

    saveCache();
    loading.hide();
}

// Load cache data from localStorage - if manuallyLoaded is true, it means the user has triggered a manual refresh, so we won't rely on cached data until the next fetch cycle
function loadCache(manuallyLoaded = false) {
    const cachedData = localStorage.getItem('goOutsideCache');
    if (cachedData) {
        Object.assign(cache, JSON.parse(cachedData));
    }
    if (manuallyLoaded) {
        cacheMeta.loadedManually = true;
    }
}

// Save cache data to localStorage
function saveCache() {
    localStorage.setItem('goOutsideCache', JSON.stringify(cache));
}

export { loadCache, saveCache, refreshCache, getWeather, getAirQuality, getStargazing, getBirdSightings, getBirdImage, cache };