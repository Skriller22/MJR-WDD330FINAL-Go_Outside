import { orchestrateData } from '/src/core/DataOrchestration.js';
import { loadHeader } from '/src/components/header.js';
import { loadFooter } from '/src/components/footer.js';
import { initMenu } from '/src/components/menu.js';


export async function loadPage() {
    // 1. Inject the HTML structure
    document.querySelector('#app').innerHTML = `
        ${loadHeader()}
        <main id="home-content">
            <!-- Loading Spinner -->
            <div id="loading" class="loading-spinner" style="display: none;">
                <div class="compass-loader">
                    <img src="/src/public/images/logo-loading1.svg" class="compass-bg">
                    <img src="/src/public/images/logo-loading2.svg" class="compass-spinner">
                </div>
                <p>Loading...</p>
            </div>

            <!-- Hero Section -->
            <section class="hero" id="home-hero">
                <div class="hero-content">
                    <div class="welcome-message">
                        <h2>Welcome explorer!</h2>
                        <p>Discover the great outdoors with personalized recommendations based on your location and real-time conditions.</p>
                    </div>
                </div>
            </section>

            <!-- Home Banner -->
            <section class="banner-section" id="home-banner">
                <div class="banner-card" id="animal-watch-card">
                    <a href="/animal-watch" data-link>
                        <h3>Animal Watch</h3>
                    </a>
                </div>
                <div class="banner-card" id="weather-watch-card">
                    <a href="/weather" data-link>
                        <h3>Weather Watch</h3>
                    </a>
                </div>
                <div class="banner-card" id="celestial-watch-card">
                    <a href="/stargazing" data-link>
                        <h3>Celestial Events</h3>
                    </a>
                </div>
            </section>

            <!-- Select Location Banner -->
            <section class="banner-section" id="select-location-banner">
                <div class="banner-card" id="select-location-card">
                    <h3>Select Location</h3>
                    <p>Choose a location to get personalized outdoor recommendations based on real-time conditions.</p>
                    <p class="disclaimer">*Location selection is currently under development.</p>
                </div>
            </section>

            <!-- 7-Day Weather Report -->
            <section class="weather-forecast" id="home-weather-forecast">
                <div class="forecast-header">
                    <h2>7-Day Weather Forecast</h2>
                </div>
                <div class="forecast-content" id="home-weather-forecast-content">
                    <div class="forecast-card" id="forecast-today"></div>
                    <div class="forecast-card" id="forecast-day-1"></div>
                    <div class="forecast-card" id="forecast-day-2"></div>
                    <div class="forecast-card" id="forecast-day-3"></div>
                    <div class="forecast-card" id="forecast-day-4"></div>
                    <div class="forecast-card" id="forecast-day-5"></div>
                    <div class="forecast-card" id="forecast-day-6"></div>
                </div>
            </section>

            <!-- Today's Report -->
            <section class="todays-report" id="home-todays-report">
                <div class="report-header">
                    <h2>Today's Report</h2>
                </div>
                <div class="report-content">
                    <div class="report-card-content" id="bird-sightings-card">
                        <a href="/animal-watch" data-link>
                            <h3>Bird Sightings</h3>
                            <img src="https://picsum.photos/seed/picsum/600/300" class="report-card-img">
                            <h2>Latest Bird Sighting</h2>
                        </a>
                    </div>
                    <div class="report-card-content" id="air-quality-card">
                        <a href="/air-quality" data-link>
                            <h3>Air Quality</h3>
                            <img src="https://picsum.photos/seed/picsum/600/300" class="report-card-img">
                            <h2>Today's Air Quality Report</h2>
                        </a>
                    </div>
                    <div class="report-card-content" id="weather-card">
                        <a href="/weather" data-link>
                            <h3>Weather</h3>
                            <img src="https://picsum.photos/seed/picsum/600/300" class="report-card-img">
                            <h2>Today's Weather Report</h2>
                        </a>
                    </div>
                    <div class="report-card-content" id="astronomy-card">
                        <a href="/stargazing" data-link>
                            <h3>Astronomy</h3>
                            <img src="https://picsum.photos/seed/picsum/600/300" class="report-card-img">
                            <h2>Next Celestial Event</h2>
                        </a>
                    </div>
                </div>
            </section>
        </main>

        ${loadFooter()}
    `;

    // Initialize menu
    initMenu();

    // 2. Fetch the data this page needs
    const data = await orchestrateData({
        weather: true,
        airQuality: true,
        stargazing: true,
        birdSightings: true
    });

    // 3. TODO: Insert dynamic weather forecast rendering here
    // 4. TODO: Insert dynamic "Today's Report" rendering here
}
