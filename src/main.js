// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/reset.css'
import './assets/js/rem.js'
Vue.config.productionTip = false
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from 'axios'
import store from './store'
Vue.prototype.$http = axios;
Vue.use(Vant);
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
