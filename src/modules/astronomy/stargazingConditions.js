// Stargazing Conditions Module
async function fetchStargazing(lat, lon) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=cloud_cover,visibility&timezone=auto`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Stargazing conditions fetch failed');
        
        const data = await response.json();
        console.log('Stargazing conditions:', data.hourly);
        return data.hourly;
        
    } catch (error) {
        console.error('Error:', error);
        return null; // Return null if there's an error to prevent app crashes
    }
}

export { fetchStargazing };