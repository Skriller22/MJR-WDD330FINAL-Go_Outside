import { getUserLocation } from '../core/Geolocation.js';
import { 
    getWeather,
    getAirQuality,
    getStargazing,
    getBirdSightings,
    getBirdImage
} from '../core/cache.js';

export async function orchestrateData(apiCalls) {
    const location = await getUserLocation();
    const { lat, lon } = location;

    const data = {};

    if (apiCalls.weather) data.weather = await getWeather(lat, lon);
    if (apiCalls.airQuality) data.airQuality = await getAirQuality(lat, lon);
    if (apiCalls.stargazing) data.stargazing = await getStargazing(lat, lon);
    if (apiCalls.birdSightings) data.birdSightings = await getBirdSightings(lat, lon);

    return data;
}

