// DEBUG flag controls whether the loading animation is visible.
const DEBUG = false;

export const loading = {
  show() {
    const element = document.getElementById('loading');
    if (element) element.style.display = DEBUG ? 'flex' : 'block';
  },
  hide() {
    const element = document.getElementById('loading');
    if (element && !DEBUG) element.style.display = 'none';
  },

  addEventListener(event, callback) {
    const element = document.getElementById('loading');
    if (element) {
      if (event === 'click') {
        let clickCount = 0;
        element.addEventListener('click', (e) => {
          clickCount += 1;
          if (callback) callback(e);

          if (clickCount > 1) {
            element.style.display = 'none';
            clickCount = 0;
          }
        });
      } else {
        element.addEventListener(event, callback);
      }
    } else {
      console.warn('Loading element not found for event listener:', event);
    }
  }
};

// Even more elegant - wrap any async operation with loading
export async function withLoading(asyncFn) {
  loading.show();
  try {
    return await asyncFn();
  } finally {
    // Ensure loading is hidden even if asyncFn throws an error
    loading.hide();
  }
}

// Another loading animation utility - show for individual module operations

export async function loadModuleWithLoading(moduleName, asyncFn) {
  console.log(`Loading ${moduleName}...`);
  loading.show();
  try {
    return await asyncFn();
  }
  catch (error) {
    console.error(`Error loading ${moduleName}:`, error);
    throw error; // Re-throw to allow caller to handle it
  }
}

