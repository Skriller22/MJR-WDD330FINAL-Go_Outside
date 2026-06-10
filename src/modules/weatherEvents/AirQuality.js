// Air Quality & Pollen Module
async function fetchAirQuality(lat, lon) {
    try {
        const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=pm2_5,pm10,european_aqi,alder_pollen,birch_pollen,grass_pollen,ragweed_pollen`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Air quality fetch failed');
        
        const data = await response.json();
        console.log(data.current);
        return data.current;
        
    } catch (error) {
        console.error('Error:', error);
    }
}

export { fetchAirQuality };