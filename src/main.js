import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLodash from 'vue-lodash';
import BootstrapVue from 'bootstrap-vue';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.css'


Vue.config.productionTip = false;
Vue.use(VueLodash);
Vue.use(BootstrapVue);


Cookies.set("backend_url", process.env.VUE_APP_BACKEND_URL);
Cookies.set("image_url", process.env.VUE_APP_IMAGE_URL);
Cookies.set("riot_data_url", process.env.VUE_APP_RIOT_DATA_URL);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
