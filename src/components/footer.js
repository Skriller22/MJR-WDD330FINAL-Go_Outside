export function loadFooter() {
    return `
        <footer>
            <div class="logo">
                <a href="/">
                    <img src="/images/logo.svg" alt="Go Outside Logo" class="logo-img">
                </a>
            </div>
            <!-- Footer Links -->
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/animal-watch">Animal Watch</a></li>
                <li><a href="/weather-watch">Weather Watch</a></li>
                <li><a href="/celestial-watch">Celestial Watch</a></li>
            </ul>
            <div id="marching-ants">
                <div class="ant-loader">
                    <div class="ant"></div>
                    <div class="ant"></div>
                    <div class="ant"></div>
                    <div class="ant"></div>
                    <div class="ant"></div>
                    <div class="ant"></div>
                </div>
            </div>
            <div class="footer-info">
                <p>Matthew J Remington - WDD 330</p>
                <p>WDD 330 Final Project <span class="disclaimer">*Not a real company.</span></p>
            </div>
        </footer>
    `;
}
