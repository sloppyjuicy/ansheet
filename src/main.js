import Vue from 'vue'
import App from './App.vue'
import Examen from './components/Examen'
import VueRouter from 'vue-router'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

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

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
