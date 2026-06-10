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