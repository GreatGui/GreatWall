import fs from "fs";
import { remote } from "electron";
const { Menu, MenuItem } = remote;

export const namespaced = true;

export const state = {
  path: localStorage.path || null,
  folders: [],
  images: []
};

export const getters = {
  getPath: state => {
    return state.path;
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
    localStorage.path = path;
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
  handleImg({ dispatch }, paper) {
    dispatch("changeWall", { paper }, { root: true });
  },
  handleDir({ dispatch }, path) {
    dispatch("mapPath", path);
  },
  handleUpDir({ getters, dispatch }) {
    if (getters.getPath.includes("/")) {
      const newPath = getters.getPath.slice(
        0,
        getters.getPath.lastIndexOf("/")
      );

      dispatch("mapPath", newPath);
    }
  },
  readURL({ dispatch }, e) {
    if (e.target.files[0]) {
      const path = e.target.files[0].path.replace(/\\/g, "/");

      dispatch("mapPath", path);
    }
  },
  mapPath({ commit, dispatch, state }, somePath = null) {
    const path = somePath || state.path;

    commit("SET_PATH", path);
    dispatch("clearDir");
    if (path) {
      const files = fs.readdirSync(path);

      for (let file of files) {
        if (/\.(jpe?g|png)$/i.test(file)) {
          let image = new Image();
          image.src = `${path}/${file}`;

          // this.$nextTick(() => {
          commit("SET_IMAGES", {
            name: file,
            path,
            width: null,
            height: null
          });
          // });
        } else {
          fs.lstat(`${path}/${file}`, (err, stat) => {
            if (err) {
              return;
            }
            if (stat.isDirectory()) {
              commit("SET_FOLDERS", {
                name: file,
                path
              });
            }
          });
        }
      }
    }
  },
  imageMenu({ dispatch, rootGetters }, { image }) {
    const menu = new Menu();
    const paper = `${image.path}/${image.name}`;
    let submenu = [];

    submenu.push({
      label: "Create a new Collection",
      click() {
        dispatch("collection/newCollection", { image }, { root: true });
      }
    });

    submenu.push({ type: "separator" });

    for (let collection of rootGetters["collection/allCollections"]) {
      let _id = collection._id;
      let checked = false;
      let enabled = true;

      for (let colImage of collection.images) {
        if (colImage.name == image.name) {
          checked = true;
          enabled = false;
          break;
        }
      }

      submenu.push({
        label: collection.title,
        type: "checkbox",
        checked,
        enabled,
        click() {
          dispatch("collection/addImage", { _id, image }, { root: true });
        }
      });
    }

    menu.append(
      new MenuItem({
        label: "Set wallpaper",
        click() {
          dispatch("changeWall", { paper }, { root: true });
        }
      })
    );
    menu.append(
      new MenuItem({
        label: "Add to Collection",
        submenu
      })
    );

    menu.popup();
  }
};
