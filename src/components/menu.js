// Menu module - handles hamburger toggle functionality
export function initMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');

    if (!menuToggle || !nav) {
        console.warn('Menu elements not found');
        return;
    }

    // Toggle menu when button clicked
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
}