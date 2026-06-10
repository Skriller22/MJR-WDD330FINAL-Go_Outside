export const loading = {
  show() {
    const element = document.getElementById('loading');
    if (element) element.style.display = 'block';
  },
  hide() {
    const element = document.getElementById('loading');
    if (element) element.style.display = 'none';
  }
};

// Even more elegant - wrap any async operation with loading
export async function withLoading(asyncFn) {
  loading.show();
  try {
    return await asyncFn();
  } finally {
    loading.hide();
  }
}