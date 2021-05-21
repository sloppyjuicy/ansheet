import Vue from "vue";
import Vuex from "vuex";
import { firebaseRepository } from "./firebaseRepository.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    firebaseRepository,
  },
});
