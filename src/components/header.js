export function loadHeader() {
    return `
        <header>
            <div class="logo">
                <a href="/">
                    <img class="logo-img" src="/src/images/logo.svg" alt="Go Outside Logo">
                </a>
            </div>

            <div class="page-title">
                <h1>Go Outside</h1>
            </div>

            <button id="menu-toggle" class="menu-toggle">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <nav id="main-nav" class="nav">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/animal-watch">Animal Watch</a></li>
                    <li><a href="/news-feed">News Feed</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Privacy Statement</a></li>
                </ul>
            </nav>
        </header>
    `;
}
