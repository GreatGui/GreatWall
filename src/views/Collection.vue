<template>
  <div class="collect">
    <header>
      <router-link to="/collections">
        <i class="fa fa-arrow-circle-left i-left"></i>
      </router-link>
      <h1>{{ collection.title }}</h1>
      <p>{{ collection.description }}</p>
    </header>
    <transition-group class="gallery scrollbar" name="gallery" tag="div">
      <div
        v-for="(paper, index) in collection.papers"
        :key="index"
        class="image-card"
        :class="mode"
      >
        <img :src="paper" alt="" />
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  mounted() {
    this.id;
  },
  data() {
    return {
      mode: "little"
    };
  },
  methods: {
    ...mapActions("collection", ["selectedCollection"])
  },
  computed: {
    ...mapState("collection", ["collection"])
  }
};
</script>

<style>
header .i-left {
  position: absolute;
  top: 20px;
  left: 30px;
  font-size: 36px;
  color: #d9534f;
}

.gallery {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 80vh; /* change it */
  overflow-x: auto;
  align-content: baseline;
}

.image-card {
  width: 400px;
  padding: 10px;
  box-sizing: border-box;
}

.image-card img {
  width: 100%;
}
</style>
