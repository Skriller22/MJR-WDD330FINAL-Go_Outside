import { displayBird } from './src/components/BirdSightings.js';
import { getBirdImage } from './src/core/cache.js';

export async function loadBirdSightingsPage(data) {
    const container = document.querySelector('#bird-sightings-display');
    container.innerHTML = '';
    console.log('Bird sightings data:', data);

    if (!data.birdSightings || data.birdSightings.length === 0) {
        container.innerHTML = '<p>No recent bird sightings found.</p>';
        return;
    }

    for (const bird of data.birdSightings) {
        bird.image = await getBirdImage(bird.sciName);
        displayBird(bird);
    }
}