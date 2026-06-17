// Geolocation Module
import { emit } from './events.js';

async function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation not supported'));
            emit('geolocationError', new Error('Geolocation not supported'));
        }
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            },
            (error) => {
                reject(error);
                emit('geolocationError', error);
            }
        );
    });
}

export { getUserLocation };