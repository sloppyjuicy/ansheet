import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app';
import 'firebase/auth'
import './storage/firebase'

Vue.config.productionTip = false

let app;
firebase.auth().onAuthStateChanged( user => {
  store.commit('loginSuccess',user);
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

