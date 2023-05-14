import { createApp } from 'vue';
import './theme/theme.less';
import './style.less';
import App from './App.vue';
import { i18n } from './locale';
import { router } from './router';
import { pinia } from './store';

const app = createApp(App);
app.use(i18n);
app.use(router);
app.use(pinia);
app.mount('#app');
