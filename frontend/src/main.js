import './assets/main.css'
import 'vue-toastification/dist/index.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification';

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Registrar o Vue Toastification
const toastOptions = {
    position: "top-right",
    timeout: 4000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: true,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
};
app.use(Toast, toastOptions);

app.mount('#app')
