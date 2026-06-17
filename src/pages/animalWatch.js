import { withLoading } from '/src/core/loading.js';
import { loadHeader } from '/src/components/header.js';
import { loadFooter } from '/src/components/footer.js';
import { initMenu } from '/src/components/menu.js';
import { orchestrateData } from '/src/core/DataOrchestration.js';
import { loadBirdSightingsPage } from '/src/core/controllers/birdSightingsController.js';

export async function loadPage() {
    document.querySelector('#app').innerHTML = `
        ${loadHeader()}
        <main id="animal-watch">
        <div class="distance-selector">
            <label for="radius">Search radius:</label>
            <select id="radius">
                <option value="10">10 miles</option>
                <option value="20">20 miles</option>
                <option value="30" selected>30 miles</option>
                <option value="50">50 miles</option>
                <option value="75">75 miles</option>
            </select>
        </div>
            <h1>Animal Watch</h1>
            <p>Recent bird sightings near your location</p>

            <div id="bird-sightings-display" class="bird-grid"></div>
        </main>
        ${loadFooter()}
    `;

    initMenu();

    await withLoading(async () => {
        const data = await orchestrateData({
            birdSightings: true
        });

        await loadBirdSightingsPage(data);
    });

}
