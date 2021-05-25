import Vue from "vue";
import Vuex from "vuex";
import { exam } from "./firebase-repository/exam.js";
import { students } from "./firebase-repository/students.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    exam,
    students,
  },
});
