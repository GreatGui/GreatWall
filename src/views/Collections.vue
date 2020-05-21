<template>
  <div>
    <div class="collections">
      <div class="collect-plus" style="color: #42b983; cursor: pointer">
        <div class="plus-plus" @click="newCollection">
          <i class="fa fa-plus">&#xf067;</i>
        </div>
        <div class="text-plus">
          <h3>Add</h3>
          <p>Add a New Collection</p>
        </div>
      </div>
      <div
        class="collect-plus"
        v-for="(collection, index) in collections"
        :key="collection._id"
      >
        <div
          class="collection-destroy"
          title="Delete this Collection"
          @click.prevent="deleteCollection({ _id: collection._id, index })"
        >
          <i class="fa fa-window-close">&#xf00d;</i>
        </div>
        <div class="image-plus">
          <router-link
            :to="{ name: 'Collection', params: { id: collection._id } }"
          >
            <img :src="defaultCover(collection.cover)" alt="cover" />
          </router-link>
        </div>
        <div class="text-plus">
          <span
            @click="choosedCollection(collection._id)"
            title="Select this Collection of wallpapers"
          >
            <i v-if="collection._id == currentId" class="fa fa-check-circle">
              &#xf058;
            </i>
            <i v-else class="fa fa-circle">&#xf111;</i>
          </span>
          <h3>{{ collection.title }} [{{ collection.images.length }}]</h3>
          <p>{{ collection.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "Collections",
  methods: {
    ...mapActions("collection", [
      "newCollection",
      "choosedCollection",
      "deleteCollection"
    ])
  },
  computed: {
    ...mapState("collection", ["collections", "currentId"]),
    ...mapGetters("collection", ["imagesCount", "defaultCover"])
  }
};
</script>

<style>
.collections {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  overflow-x: auto;
  padding: 20px 0px;
  justify-content: center;
  align-content: flex-start;
}

.collection-destroy i {
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.5));
}

.collection-destroy {
  position: absolute;
  color: #fff;
  right: 8px;
  top: 4px;
  font-size: 20px;
  cursor: pointer;
}

.collection-destroy:hover {
  color: red;
}

.collect-plus {
  display: flex;
  position: relative;
  background: #fff;
  border-radius: 5px;
  width: 350px;
  height: 250px;
  margin: 10px;
  flex-direction: column;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.collect-plus:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.plus-plus {
  display: flex;
  width: 100%;
  height: 75%;
  justify-content: center;
  align-items: center;
}

.plus-plus i {
  font-size: 110px;
}

.text-plus {
  padding: 6px 15px;
  height: 25%;
  text-align: left;
  position: relative;
}

.text-plus h3 {
  margin-top: 6px;
  font-size: 22px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: calc(100% - 25px);
}

.text-plus p {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.image-plus {
  width: 100%;
  height: 75%;
  cursor: pointer;
}

.image-plus img {
  width: 100%;
  height: 100%;
  border-radius: 5px 5px 0 0;
}

.text-plus span {
  position: absolute;
  top: 10px;
  right: 16px;
  font-size: 24px;
  cursor: pointer;
  user-select: none;
}

.fa-circle {
  transition: 0.5s all;
}

.fa-circle:hover,
.fa-check-circle {
  color: #42b983;
}
</style>
