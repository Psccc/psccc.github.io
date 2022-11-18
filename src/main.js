import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import 'src/assets/base.scss';



// import live2d from 'ttzxh-vue-live2d'
// import live2dcss from 'ttzxh-vue-live2d/dist/ttzxh-vue-live2d.css'

// Vue.use(live2d)

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
