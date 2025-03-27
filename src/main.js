import './assets/styles.css'
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faSignOutAlt, faUserShield, faUsers, faChartBar, faGamepad, faMoneyBillWave, faUserPlus,faChartLine, faUserCircle, faEye, faDollarSign} from '@fortawesome/free-solid-svg-icons';
library.add(faSignOutAlt, faUserShield, faUsers, faChartBar, faGamepad, faMoneyBillWave, faUserPlus, faChartLine, faUserCircle, faEye,faDollarSign);
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app')
