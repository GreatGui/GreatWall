<template>
  <div>
    <div class="collections">
      <div class="collect-plus" style="color: #42b983; cursor: pointer">
        <div class="plus-plus">
          <i class="fa fa-plus"></i>
        </div>
        <div class="text-plus">
          <h2>Add</h2>
          <p>Add a New Collection</p>
        </div>
      </div>
      <div
        class="collect-plus"
        v-for="collect in collections"
        :key="collect.id"
      >
        <div class="image-plus">
          <router-link :to="{ name: 'Collection', params: { id: collect.id } }">
            <img :src="collect.cover" alt="cover" />
          </router-link>
        </div>
        <div class="text-plus">
          <span @click="choosedCollection(collect.id)">
            <i v-if="collect.id == currentId" class="fa fa-check-circle"
              >&#xf058;</i
            >
            <i v-else class="fa fa-circle">&#xf111;</i>
          </span>
          <h2>{{ `${collect.title} (${collect.papers.length})` }}</h2>
          <p>{{ collect.description }}</p>
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
    ...mapActions("collection", ["newCollection", "choosedCollection"])
  },
  computed: {
    ...mapState("collection", ["collections", "currentId"]),
    ...mapGetters("collection", ["selectedId", "papersCount"])
  }
};
</script>

<style>
.collections {
  display: flex;
  flex-wrap: wrap;
}

.collect-plus {
  display: flex;
  position: relative;
  background: #fff;
  border-radius: 2px;
  width: 250px;
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
}

.image-plus {
  width: 100%;
  height: 75%;
  cursor: pointer;
}

.image-plus img {
  width: 100%;
  height: 100%;
}

.text-plus span {
  position: absolute;
  bottom: 26px;
  right: 16px;
  font-size: 24px;
  cursor: pointer;
}

.fa-check-circle {
  color: darkgreen;
}
</style>
