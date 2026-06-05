// Weather Watch Module
async function fetchWeather(lat, lon) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Weather fetch failed');
        
        const data = await response.json();
        console.log(data.current);
        return data.current;
        
    } catch (error) {
        console.error('Error:', error);
    }
}

export { fetchWeather };