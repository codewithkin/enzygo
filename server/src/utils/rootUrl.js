/**
 * rootUrls.js - A module that exports the root URL of the frontend and backend server depending on the environment the app is running in
 * @type {Object}
 * @property backendUrl: The URL of the backend server
 * @property frontendUrl: The URL of the frontend server
 */

const rootUrls = {
    backendUrl: process.env.NODE_env === 'production' ? 'https://api.appdomain.com' : 'http://localhost:8080',
    frontendUrl: process.env.NODE_env === 'production' ? 'https://appdomain.com' : 'http://localhost:5173',
};

export default rootUrls;