export function initiateLoader() {
    const loader = document.createElement('div');
    loader.id = 'loading';
    loader.style.display = 'none'; // Initially hidden
    loader.innerHTML = 
        '<div class="compass-loader">\n' +
        '    <img src="/images/logo-loading1.svg" class="compass-bg">\n' +
        '    <img src="/images/logo-loading2.svg" class="compass-spinner">\n' +
        '</div>\n' +
        '<p>Loading...</p>';
    loader.className = 'loading-spinner';
    document.body.appendChild(loader);
}

// Loader format to be injected into pages:
//         <div id="loading" class="loading-spinner" style="display: none;">
//             <div class="compass-loader">
//                 <img src="/images/logo-loading1.svg" class="compass-bg">
//                 <img src="/images/logo-loading2.svg" class="compass-spinner">
//             </div>
//             <p>Loading...</p>
//         </div>