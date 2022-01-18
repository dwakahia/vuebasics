import Vue from 'vue'
import App from './App.vue'
import './assets/index.css'
import VueTailwind from 'vue-tailwind';
Vue.use(VueTailwind);
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);
import moment from 'moment'
Vue.prototype.moment = moment
Vue.config.productionTip = false


Vue.component('CustomButton',()=> import('./components/common/CustomButton'))

new Vue({
  render: h => h(App),
}).$mount('#app')
