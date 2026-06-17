const routes = {
    '/': 'home',
    '/animal-watch': 'animalWatch',
    '/weather': 'weather',
    '/stargazing': 'stargazing'
};

export function navigate(path) {
    window.history.pushState({}, '', path);
    loadRoute(path);
}

export async function loadRoute(path) {
    const page = routes[path] || 'home';

    const module = await import(`/src/pages/${page}.js`);
    module.loadPage();
}
