import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Navegation guard
router.beforeEach((to,from,next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged in user
    if (!store.getters.isUserLogin) {
      // GO to login
      next({
        path: '/login',
        query:{
          redirect: to.fullPath
        }
      });
    } else {
      // Procced to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged in user
    if (store.getters.isUserLogin) {
      // Go to home 
      next({
        path: '/',
        //query: to.fullPath
      });
    } else {
      // Procced to route
      next();
    }
  } else {
    next();
  }
});

export default router
