export const namespaced = true;

export const state = {
  currentId: null,
  collections: [
    {
      id: 1,
      cover:
        "D:/Guilherme/Pictures/Konachan.com - 247394 clouds nobody original scenic signed sky sunset waifu2x xiaobanbei_milk.jpg",
      title: "Default",
      description: "Default Collections",
      papers: [
        "D:/Guilherme/Pictures/Konachan.com - 247394 clouds nobody original scenic signed sky sunset waifu2x xiaobanbei_milk.jpg",
        "D:/Guilherme/Pictures/atha/Konachan.com - 302768 atha japanese_clothes kimono original.jpg",
        "D:/Guilherme/Pictures/boku no hero/Konachan.com - 268662 blonde_hair blood boku_no_hero_academia gradient inawa_akito seifuku short_hair socks toga_himiko yellow_eyes.jpg",
        "D:/Guilherme/Pictures/random/Final-Fantasy-12-Zodiac-Age-Switch-Release-Date-e1547130935723.jpg"
      ]
    },
    {
      id: 2,
      cover:
        "D:/Guilherme/Pictures/Konachan.com - 197630 animal bird blonde_hair boots brown_hair cage dress fang flowers long_hair mia0309 original red_eyes short_hair wings.jpg",
      title: "New",
      description: "Other Collections",
      papers: [
        "D:/Guilherme/Pictures/Konachan.com - 197630 animal bird blonde_hair boots brown_hair cage dress fang flowers long_hair mia0309 original red_eyes short_hair wings.jpg"
      ]
    }
  ],
  collection: {}
};

export const getters = {
  selectedId: state => {
    return state.collections[state.currentId];
  },
  papersCount: state => id => {
    let papers = state.collections.find(collection => collection.id === id)
      .papers;
    if (papers) {
      return papers.length;
    }
  },
  selectCollection: state => id => {
    return state.collections.find(elem => elem.id == id);
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
    // localStorage.currentId = id;
  }
};

export const actions = {
  newCollection({ commit }, collection) {
    commit("ADD_COLLECTION", collection);
  },
  choosedCollection({ commit }, id) {
    commit("SELECT_COLLECTION_ID", id);
  },
  selectedCollection({ commit, getters }, id) {
    const collection = getters.selectCollection(id);
    commit("SET_COLLECTION", collection);
  }
};
