import './firebase'
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueIziToast from 'vue-izitoast'
import { firestorePlugin } from 'vuefire'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap'
//import 'bootstrap/dist/css/bootstrap.min.css'
import 'izitoast/dist/css/iziToast.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import NotFound from './components/NotFound'
import Welcome from './components/Welcome'
import Examen from './components/Examen'
import Reporte from './components/Reporte'

/*import examenComipems from './canswers/unam2013comipems.json';*/
/*import examenComipems from './canswers/unam2015comipems.json';*/
/*import examenComipems from './canswers/unam2017comipems.json';*/
/*import examenComipems from './canswers/unam2019comipems.json';*/
/*import examenComipems from './canswers/unamNAcomipems.json';*/
/*import examenComipems from './canswers/comipems2018.json';*/
/*import examenComipems from './canswers/unam2020comipems.json';*/
// import examenComipems from './canswers/unam2009comipems.json';
// import examenComipems from './canswers/unam2016comipems.json';
// import examenComipems from './canswers/unam2012comipems.json'
// import examenComipems from './canswers/COMIPEMS_simulacion.json'
import examenComipems from './canswers/Comludo2020.json'

/*import examenUniversidad from './canswers/ipn01unido.json';*/
/*import examenUniversidad from './canswers/ipn01unido2.json';*/
// import examenUniversidad from './canswers/ipn_modif2.json';
import examenUniversidad from './canswers/ipn_modif3.json'

Vue.config.productionTip = false

const router = new VueRouter({
  //mode: 'history',
  routes: [
    {
      path: '/',
      component: Welcome,
    },
    {
      path: '/comipems/:debug?',
      component: Examen,
      props: { examen: examenComipems },
    },
    {
      path: '/universidad/:debug?',
      component: Examen,
      props: {
        default: true,
        examen: examenUniversidad,
      },
    },
    {
      path: '/reporte',
      component: Reporte,
      name: 'reporte',
    },
    {
      path: '*',
      component: NotFound,
    },
  ],
})

Vue.use(VueRouter)
Vue.use(VueIziToast)
Vue.use(firestorePlugin)

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app')
