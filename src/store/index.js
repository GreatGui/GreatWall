import Vue from "vue";
import Vuex from "vuex";
import * as collection from "@/store/modules/collection.js";
import * as myImage from "@/store/modules/myImage.js";

Vue.use(Vuex);

import wallpaper from "wallpaper";

export default new Vuex.Store({
  state: {
    currentWall: null,
    isCollection: localStorage.isCollection || false,
    config: {
      time: localStorage.time || 10,
      milliseconds: 60000
    },
    nextTimer: null,
    version: JSON.stringify(require("../../package.json").version).replace(
      /['"]+/g,
      ""
    )
  },
  getters: {
    timer: state => {
      return state.config.time * state.config.milliseconds;
    }
  },
  mutations: {
    SET_PAPER(state, paper) {
      state.currentWall = paper;
      // localStorage.currentPaper = paper;
    },
    SET_IS_COLLECTION(state, isCollection) {
      state.isCollection = isCollection;
      localStorage.isCollection = isCollection;
    },
    SET_TIME(state, time) {
      state.config.time = time;
      localStorage.time = time;
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
    async changeWall({ commit, dispatch }, { paper, isCollection = false }) {
      dispatch("cancelTimeout");
      commit("SET_PAPER", paper);
      commit("SET_IS_COLLECTION", isCollection);

      await wallpaper.set(paper);

      if (isCollection) {
        dispatch("cancelTimeout");
        dispatch("startTimeout");
      } else {
        commit("collection/UNSELECT_COLLECTION_ID");
      }
    },
    async getWall({ commit }) {
      const wall = await wallpaper.get();

      commit("SET_PAPER", wall.replace(/\\/g, "/"));
    },
    setTime({ commit }, time) {
      commit("SET_TIME", time);
    },
    startTimeout({ commit, getters, dispatch }) {
      if (getters.timer > 59999) {
        const timer = setTimeout(() => {
          dispatch("collection/nextWall");
        }, getters.timer);

        commit("SET_NEXT_TIMER", timer);
      }
    },
    cancelTimeout({ commit }) {
      commit("STOP_NEXT_TIMER");
    },
    loadCollection({ state, dispatch }) {
      if (state.isCollection) {
        dispatch("startTimeout", null, { root: true });
      }
    }
  },
  modules: {
    collection,
    myImage
  }
});
