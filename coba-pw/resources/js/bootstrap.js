import axios from 'axios';
window.axios = axios;
window.axios.defaults.baseURL = 'http://your-backend-api-url.com/api';

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
