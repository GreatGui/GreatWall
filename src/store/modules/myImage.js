export const namespaced = true;

export const state = {
  path: null,
  folders: [],
  images: [],
  selected: null
};

export const getters = {
  pathUp: state => {
    return state.path.includes("/");
  }
};

export const mutations = {
  SET_IMAGES(state, images) {
    state.images.push(images);
  },
  SET_FOLDERS(state, folders) {
    state.folders.push(folders);
  },
  SET_PATH(state, path) {
    state.path = path;
  },
  RESET_IMAGES(state) {
    state.images.splice(0);
  },
  RESET_FOLDERS(state) {
    state.folders.splice(0);
  },
  SELECT_IMAGE(state, image) {
    state.selected = image;
  }
};

export const actions = {
  clearDir({ commit }) {
    commit("RESET_IMAGES");
    commit("RESET_FOLDERS");
  },
  handleImg({ commit, rootDispatch }, image) {
    commit("SELECT_IMAGE", image);
    rootDispatch("changeWall", image);
    // dispatch("changeWall", image, null, { root: true });
  },
  handleDir({ commit }, path) {
    commit("SET_PATH", path);
  },
  handleUpDir({ commit, getters }) {
    if (getters.pathUp) {
      const newPath = this.path.slice(0, this.path.lastIndexOf("/"));
      commit("SET_PATH", newPath);
    }
  }
};
