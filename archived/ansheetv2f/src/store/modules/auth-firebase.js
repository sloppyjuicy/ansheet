import firebase from 'firebase/app';
import 'firebase/auth'
import '../../storage/firebase'

export default {
  state: {
    user: firebase.auth().currentUser
  },
  getters: {
    isUserLogin(state){
      return state.user !== null
    }
  },
  mutations: {
    loginSuccess(state,user){
      state.user = user
    },
    logoutSuccess(state){
      state.user = null
    }
  },
  actions: {
    LOGIN: async ({ commit }, payload) => {
        console.log(payload);
        return await firebase.auth()
        .signInWithEmailAndPassword(
            payload.email,
            payload.password
        )
        .then(
            ({user}) => {
                console.log(user.email);
                commit('loginSuccess',user)
                return Promise.resolve(true)
            },
            error => {
                console.log(error.message);
                console.log(commit);
                return Promise.reject(error.message)
            }
        )
    },
    LOGOUT: ({commit}) => {
      firebase
      .auth()
      .signOut()
      .then( () => {
        commit('logoutSuccess');
        //return Promise.resolve(true)
      },
      error =>{
        console.log(error);
      })
      
    }
  }
};