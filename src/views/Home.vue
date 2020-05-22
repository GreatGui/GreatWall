<template>
  <div class="home">
    <div class="home-content">
      <h1><b>G</b>reat<b>W</b>all</h1>
      <p>Created by: <strong>GreatGui</strong></p>
      <div class="screen-container">
        <span>{{ `${width} x ${height}` }}</span>
        <div class="wallpaper-container">
          <div class="wall-arrow">
            <!-- <i v-show="isCollection" class="fa fa-angle-double-left">&#xf100;</i> -->
          </div>
          <div
            class="user-screen"
            :style="`width: ${width / 5}px; height: ${height / 5}px`"
            :title="currentWall"
          >
            <transition name="slide" mode="out-in">
              <img
                key="next"
                v-if="isCollection && next"
                :src="nextPaper(nextIndex)"
                alt="next Wallpaper"
              />
              <img v-else key="current" :src="currentWall" alt="currentWall" />
            </transition>
          </div>
          <div class="wall-arrow">
            <i
              v-show="isCollection"
              @mouseenter="next = true"
              @mouseleave="next = false"
              @click.prevent="nextWall()"
              class="fa fa-angle-double-right"
            >
              &#xf101;
            </i>
          </div>
        </div>
      </div>
      <div class="home-info">
        <h3 class="title">Information</h3>
        <div class="items">
          <div class="item">
            <div class="name">Width</div>
            <div class="value">{{ width }}</div>
          </div>
          <div class="item">
            <div class="name">Height</div>
            <div class="value">{{ height }}</div>
          </div>
          <div v-if="selectedId" class="item">
            <div class="name">Collection</div>
            <div class="value">
              <router-link
                :to="{ name: 'Collection', params: { id: selectedId._id } }"
              >
                {{ selectedId.title }}
              </router-link>
            </div>
          </div>
          <!-- <div v-if="selectedId" class="item"> -->
            <!-- <div class="name">Timer</div> -->
            <!-- <div class="value">{{ time }}</div> -->
          <!-- </div> -->
          <div class="item">
            <div class="name">Version</div>
            <div class="value">{{ version }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      width: screen.width,
      height: screen.height,
      next: false
    };
  },
  methods: {
    ...mapActions("collection", ["nextWall"])
  },
  computed: {
    ...mapState(["currentWall", "nextPaper", "isCollection", "version"]),
    ...mapGetters("collection", ["nextPaper", "selectedId", "nextIndex"])
  }
};
</script>

<style scoped>
h1,
h1 b {
  font-family: "PermanentMarker";
  font-size: 80px;
}

h1 b {
  color: #42b983;
}

.home-content {
  overflow-x: auto;
  height: 100%;
}

.home-info a {
  color: #42b983;
}

.screen-container {
  margin-top: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.wallpaper-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.wall-arrow {
  display: flex;
  flex: 1;
  justify-content: center;
  font-size: 60px;
}

.wall-arrow i {
  transition: 1s all;
  cursor: pointer;
}

.wall-arrow i:hover {
  color: #42b983;
}

.user-screen {
  border: 1px solid black;
  position: relative;
}

.user-screen img {
  width: 100%;
  height: 100%;
  image-rendering: -webkit-optimize-contrast;
}

.title {
  color: #888;
  letter-spacing: 0.25px;
  margin-top: 10px;
}

.items {
  margin-top: 8px;
}

.item {
  /* display: flex; */
  margin-bottom: 6px;
}

.item .name {
  color: #6a6a6a;
  /* margin-right: 6px; */
}

.item .value {
  color: #35495e;
  font-weight: bold;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>
