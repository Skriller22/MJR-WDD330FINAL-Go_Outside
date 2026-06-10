// Bird Data Module
async function fetchBirdSightings(lat, lon) {
    try {
        const apiKey = import.meta.env.VITE_EBIRD_API_KEY;
        const url = `https://api.ebird.org/v2/data/obs/geo/recent?lat=${lat}&lng=${lon}&key=${apiKey}&back=7`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Bird sightings fetch failed');
        
        const data = await response.json();
        
        // Filter to 30 miles
        const radius = 30;
        const filtered = data.filter(sighting => {
            const distance = getDistanceFromLatLng(lat, lon, sighting.lat, sighting.lng);
            return distance <= radius;
        });
        
        return filtered;
        
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

function getDistanceFromLatLng(lat1, lon1, lat2, lon2) {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export { fetchBirdSightings };