import { createApp, inject } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css';

createApp(App).use(router).mount('#app');
