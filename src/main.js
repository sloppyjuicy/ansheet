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

/*import examenComipems from './canswers/unam2013comipems.json';*/
import examenComipems from './canswers/unam2015comipems.json';
/*import examenUniversidad from './canswers/ipn01unido.json';*/
import examenUniversidad from './canswers/ipn01unido2.json';

Vue.config.productionTip = false

const router = new VueRouter({
  //mode: 'history',
  routes : [
    {
      path: '/', 
      component: Welcome,
    },
    { 
      path: '/comipems/:debug?', 
      component: Examen,
      props : {examen:examenComipems}
    },
    { 
      path: '/universidad/:debug?', 
      component: Examen,
      props : {
        default: true,
        examen:examenUniversidad
      }
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
