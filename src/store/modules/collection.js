/* eslint-disable no-unused-vars */
/* global __static */
import db from "@/datastore";
import path from "path";
import { remote } from "electron";
const { Menu, MenuItem } = remote;

export const namespaced = true;

export const state = {
  currentId: localStorage.currentId || null,
  paperIndex: localStorage.paperIndex || 0,
  collections: [],
  collection: {}
};

export const getters = {
  selectedId: state => {
    return state.collections.find(elem => elem._id == state.currentId);
  },
  imagesCount: state => id => {
    let images = state.collections.find(collection => collection._id === id)
      .images;

    if (images) {
      return images.length;
    }
  },
  selectCollection: state => id => {
    return state.collections.find(elem => elem._id == id);
  },
  nextIndex: (state, getters) => {
    const length = getters.imagesCount(state.currentId);

    return state.paperIndex + 1 < length ? state.paperIndex + 1 : 0;
  },
  nextPaper: state => (index = null) => {
    let paperIndex = index == null ? state.paperIndex : index;
    const image = state.collections.find(elem => elem._id == state.currentId)
      .images[paperIndex];

    return `${image.path}/${image.name}`;
  },
  allCollections: state => {
    return state.collections.sort((a, b) => {
      const nameA = a.title.toUpperCase();
      const nameB = b.title.toUpperCase();

      if (nameA > nameB) {
        return 1;
      }
      if (nameA < nameB) {
        return -1;
      }

      return 0;
    });
  },
  defaultCover: () => cover => {
    return cover || path.join(__static, "no-cover.png");
  },
  id: state => {
    return state.collection._id;
  }
};

export const mutations = {
  ADD_COLLECTION(state, collection) {
    state.collections.push(collection);
  },
  SET_COLLECTIONS(state, collections) {
    state.collections = collections;
  },
  SET_COLLECTION(state, collection) {
    state.collection = collection;
  },
  SELECT_COLLECTION_ID(state, id) {
    state.currentId = id;
    localStorage.currentId = id;
  },
  SET_PAPER_INDEX(state, index) {
    state.paperIndex = index;
    localStorage.paperIndex = index;
  },
  START_PAPER_INDEX(state) {
    state.paperIndex = 0;
  },
  ADD_IMAGE_TO_COLLETION(state, { _id, image }) {
    state.collections.find(elem => elem._id == _id).images.push(image);
  },
  REMOVE_IMAGE(state, { index }) {
    state.collection.images.splice(index, 1);
  },
  SET_COVER(state, { paper }) {
    state.collection.cover = paper;
  },
  UNSELECT_COLLECTION_ID(state) {
    state.currentId = null;
  },
  REMOVE_COLLECTION(state, { index }) {
    state.collections.splice(index, 1);
  },
  UNSET_COLLECTION(state) {
    state.collection = {};
  },
  SET_TITLE(state, title) {
    state.collection.title = title;
  },
  SET_DESCRIPTION(state, description) {
    state.collection.description = description;
  }
};

export const actions = {
  newCollection({ commit, state }, { image = null }) {
    const createdAt = new Date().toISOString();
    let images = [];
    let cover = null;
    let title = "Default Title ";
    let countDefaultTitles = state.collections.filter(elem =>
      elem.title.includes(title)
    ).length;

    if (image) {
      cover = `${image.path}/${image.name}`;
      images.push(image);
    }
    title += countDefaultTitles + 1;

    db.insert({ title, cover, images, createdAt }, (err, newCol) => {
      console.log(err);
      commit("ADD_COLLECTION", newCol);
    });
  },
  clearCollection({ commit }) {
    commit("UNSET_COLLECTION");
  },
  choosedCollection({ commit, dispatch, getters }, id) {
    if (getters.imagesCount(id) > 0) {
      commit("SELECT_COLLECTION_ID", id);
      commit("START_PAPER_INDEX");
      const paper = getters.nextPaper();

      dispatch("changeWall", { paper, isCollection: true }, { root: true });
    } else {
      // console.log("Error: 0 Image");
    }
  },
  selectedCollection({ commit, getters }, id) {
    const collection = getters.selectCollection(id);

    commit("SET_COLLECTION", collection);
  },
  nextWall({ commit, getters, dispatch }) {
    const index = getters.nextIndex;

    commit("SET_PAPER_INDEX", index);
    const paper = getters.nextPaper(index);

    dispatch("changeWall", { paper, isCollection: true }, { root: true });
  },
  addImage({ commit }, { _id, image }) {
    // const collection = getters.selectCollection(collectionId);
    db.update({ _id }, { $addToSet: { images: image } }, {}, (err, num) => {
      // if (err) {
      //   console.log(err);
      // }
      // console.log(num);

      commit("ADD_IMAGE_TO_COLLETION", { _id, image });
    });
  },
  loadDBCollections({ commit }) {
    return new Promise(resolve =>
      db.find({}, (err, res) => {
        // if (err) {
        //   console.log(err);
        // }

        commit("SET_COLLECTIONS", res);
        resolve(res);
      })
    );
  },
  changeCover({ commit, getters }, { paper }) {
    const _id = getters.id;

    db.update({ _id }, { $set: { cover: paper } }, {}, (err, num) => {
      // if (err) {
      //   console.log(err);
      // }
      // console.log(num);

      commit("SET_COVER", { paper });
    });
  },
  deleteCollection({ commit, state, dispatch }, { _id, index }) {
    if (state.currentId == _id) {
      dispatch("cancelTimeout", {}, { root: true });
      commit("UNSELECT_COLLECTION_ID");
      commit("SET_IS_COLLECTION", false, { root: true });
    }

    db.remove({ _id }, {}, (err, num) => {
      // if (err) {
      //   console.log(err);
      // }
      // console.log(num);

      commit("REMOVE_COLLECTION", { index });
    });
  },
  editTitle({ commit, getters }, title) {
    const _id = getters.id;

    db.update({ _id }, { $set: { title } }, {}, (err, num) => {
      // if (err) {
      //   console.log(err);
      // }
      // console.log(num);

      commit("SET_TITLE", title);
    });
  },
  editDescription({ commit, getters }, description) {
    const _id = getters.id;

    db.update({ _id }, { $set: { description } }, {}, (err, num) => {
      // if (err) {
      //   console.log(err);
      // }
      // console.log(num);

      commit("SET_DESCRIPTION", description);
    });
  },
  removeImage({ commit, getters }, { image, index }) {
    const _id = getters.id;

    db.update({ _id }, { $pull: { images: image } }, {}, (err, num) => {
      // if (err) {
      //   console.log(err);
      // }
      // console.log(num);

      commit("REMOVE_IMAGE", { index });
    });
  },
  collectionMenu({ dispatch, getters }, { image, index }) {
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

    for (let collection of getters.allCollections) {
      let _id = collection._id;
      let checked = false;
      let enabled = true;

      if (_id != getters.id) {
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
            dispatch("addImage", { _id, image });
          }
        });
      }
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
        label: "Set as cover",
        click() {
          dispatch("changeCover", { paper });
        }
      })
    );
    menu.append(
      new MenuItem({
        label: "Add to Collection",
        submenu
      })
    );
    menu.append(
      new MenuItem({
        label: "Remove",
        click() {
          dispatch("removeImage", { image, index });
        }
      })
    );

    menu.popup();
  }
};
