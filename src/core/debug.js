// Debug configuration for development
export const DEBUG_CONFIG = {
  // Global debug mode
  enabled: false,
  
  // Module controls
  modules: {
    loading: true,
    cache: true,
    geolocation: true,
    weather: true,
    airQuality: true,
    stargazing: true,
    birdSightings: true,
  },
  
  // API controls
  skipApis: false,  // If true, skip all API calls
  mockData: false,   // If true, use mock data instead
  
  // Logging
  verbose: true,     // Extra console logs
};

// Easy toggle for debugging
export function setDebug(config) {
  Object.assign(DEBUG_CONFIG, config);
  console.log('Debug config updated:', DEBUG_CONFIG);
}