import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueIziToast from 'vue-izitoast'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import "izitoast/dist/css/iziToast.css";

import NotFound from './components/NotFound'
import Welcome from './components/Welcome'
import Examen from './components/Examen'

import examenComipems from './canswers/unam2013comipems.json';
import examenUniversidad from './canswers/ipn01unido.json';

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes : [
    {
      path: '/', 
      component: Welcome,
    },
    { 
      path: '/comipems/:examen', 
      component: Examen,
      props : {examen:examenComipems}
    },
    { 
      path: '/universidad/:examen', 
      component: Examen,
      props : {examen:examenUniversidad}
    },
    {
      path : '*',
      component: NotFound
    }
  ]

})

Vue.use(VueRouter)
Vue.use(VueIziToast);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
