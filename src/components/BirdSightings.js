// BirdSightings component
export function displayBird(bird) {
    const container = document.createElement('div');
    container.className = 'bird-card';

    container.innerHTML = `
        <div class="bird-header">
            <h2>${bird.comName}</h2>
            <p class="sci-name">${bird.sciName}</p>
        </div>
        <div class="bird-image">
            <img src="${bird.image || '/src/public/images/logo.svg'}" alt="${bird.comName}">
        </div>
        <div class="bird-details">
            <p>Seen at: ${bird.locName}</p>
            <p>Coordinates: ${bird.lat}, ${bird.lng}</p>
        </div>
    `;

    document.querySelector('#bird-sightings-display').appendChild(container);
}