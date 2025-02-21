import './assets/main.css'
import 'vue-toastification/dist/index.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification';


const options = {
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

// Configurações opcionais para o Toast
// const options = {
//     position: 'top-right',
//     timeout: 3000,
//     closeOnClick: true,
//     pauseOnHover: true,
//   };

const app = createApp(App)

// Registrar o Vue Toastification
app.use(Toast, options);
app.use(createPinia())
app.use(router)

app.mount('#app')

