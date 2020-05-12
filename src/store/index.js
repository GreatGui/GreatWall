import Vue from "vue";
import Vuex from "vuex";
import * as collection from "@/store/modules/collection.js";
import * as myImage from "@/store/modules/myImage.js";

Vue.use(Vuex);

const wallpaper = require("wallpaper");

export default new Vuex.Store({
  state: {
    currentWall: null,
    // currentCollection: null,
    nextPaper: null,
    paperIndex: 0,
    isCollection: false,
    time: 10,
    milliseconds: 1000,
    nextTimer: null
  },
  getters: {
    timer: state => {
      return state.time * state.milliseconds;
    }
  },
  mutations: {
    SET_PAPER(state, paper) {
      state.currentPaper = paper;
      // localStorage.currentPaper = paper;
    },
    SET_IS_COLLECTION(state, isCollection) {
      state.isCollection = isCollection;
      // localStorage.isCollection = isCollection;
    },
    SET_TIME(state, time) {
      state.time = time;
      // localStorage.time = time;
    },
    SET_NEXT_TIMER(state, timer) {
      state.nextTimer = timer;
      // localStorage.time = time;
    },
    STOP_NEXT_TIMER(state) {
      clearTimeout(state.nextTimer);
      state.nextTimer = null;
      // localStorage.time = time;
    }
  },
  actions: {
    changeWall({ commit, dispatch }, paper, isCollection = false) {
      commit("SET_PAPER", paper);
      commit("SET_IS_COLLECTION", isCollection);

      (async () => {
        await wallpaper.set(paper);

        await wallpaper.get();

        if (isCollection) {
          dispatch("startTimeout");
        }
      })();
    },
    setTime({ commit }, time) {
      commit("SET_TIME", time);
    },
    startTimeout({ commit, getters }) {
      const timer = setTimeout(() => {
        // console.log("Oi", state.nextTimer);
      }, getters.timer);

      commit("SET_NEXT_TIMER", timer);
    },
    cancelTimeout({ commit }) {
      commit("STOP_NEXT_TIMER");
    }
  },
  modules: {
    collection,
    myImage
  }
});
