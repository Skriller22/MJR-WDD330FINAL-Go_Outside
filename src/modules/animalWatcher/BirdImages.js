// Bird image fetching module
export function fetchBirdImages(speciesScientificName) {
  const encodedName = encodeURIComponent(speciesScientificName);
  const API_url = `https://api.inaturalist.org/v1/observations?taxon_name=${encodedName}&quality_grade=research&limit=5`;
  
  return fetch(API_url)
    .then(response => response.json())
    .then(data => {
        if (data.results && data.results.length > 0) {
            const photos = data.results[0].photos;
            if (photos && photos.length > 0) {
                return photos[0].url.replace('square', 'medium');
            }
        }        return null; // No image found
    })

    .catch(error => {
      console.error('Error fetching bird image:', error);
      return null;
    });
}