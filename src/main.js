import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueIziToast from 'vue-izitoast'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import "izitoast/dist/css/iziToast.css";

import Examen from './components/Examen'

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes : [
    { 
      path: '/', 
      component: Examen 
    },
  ]

})

Vue.use(VueRouter)
Vue.use(VueIziToast);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
