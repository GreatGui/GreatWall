<template>
  <div id="app">
    <div id="nav">
      <router-link v-for="menu in menus" :key="menu.name" :to="menu.to">
        <i class="fa" :class="`fa-${menu.class}`" v-html="menu.icon"></i>
        <span class="subtitle" :style="`margin-top: ${menu.margin}px;`">
          {{ menu.name }}
        </span>
      </router-link>
    </div>
    <transition
      name="fade"
      mode="out-in"
      @beforeLeave="beforeLeave"
      @enter="enter"
      @afterEnter="afterEnter"
    >
      <router-view class="main" />
    </transition>
  </div>
</template>

<script>
// import path from "path";
import { mapActions } from "vuex";

export default {
  created() {
    this.getWall();
    this.loadDBCollections();
    this.loadCollection();
  },
  data() {
    return {
      modal: false,
      menus: [
        {
          name: "Home",
          icon: "&#xf015;",
          class: "home",
          margin: "-5",
          to: "/home"
        },
        {
          name: "My Images",
          icon: "&#xf03e;",
          class: "image",
          margin: "-8",
          to: "/my-images"
        },
        {
          name: "Collections",
          icon: "&#xf1b3;",
          class: "cubes",
          margin: "-4",
          to: "/collections"
        },
        {
          name: "Config",
          icon: "&#xf085;",
          class: "cogs",
          margin: "-4",
          to: "/config"
        }
      ]
    };
  },
  methods: {
    ...mapActions(["getWall", "loadCollection"]),
    ...mapActions("collection", ["loadDBCollections"]),
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = "100vh";
    }
  }
};
</script>

<style>
@font-face {
  font-family: "Font Awesome 5 Free";
  src: url(~@/assets/fonts/FontAwesome5Free-Solid-900.otf);
  font-weight: normal;
}

@font-face {
  font-family: "JosefinSans";
  src: url(~@/assets/fonts/JosefinSans-VariableFont_wght.ttf);
  font-weight: normal;
}

@font-face {
  font-family: "PermanentMarker";
  src: url(~@/assets/fonts/PermanentMarker-Regular.ttf);
  font-weight: normal;
}

* {
  font-family: "JosefinSans";
}

*,
*:before,
*:after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

i {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  font-style: normal;
}

.main {
  flex: 1 1 auto;
  padding: 20px;
  position: relative;
  width: calc(100% - 95px);
  height: 100vh;
  display: flex;
  flex-direction: column;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  overflow: hidden;
}

#nav {
  padding: 10px;
  display: flex;
  flex-direction: column;
  /* width: 100px; */
  height: 100vh;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin-bottom: 10px;
  transition: 0.5s all;
}

#nav a:last-of-type {
  margin-top: auto;
  margin-bottom: 0;
}

#nav a:hover:not(.router-link-active) {
  filter: brightness(1.5);
}

#nav a.router-link-active:hover:not(.router-link-exact-active) {
  filter: brightness(1.15);
}

#nav a.router-link-exact-active,
#nav a.router-link-active {
  color: #42b983;
}

#nav .fa {
  font-size: 60px;
}

.subtitle {
  font-size: 10px;
  display: block;
}

.background-modal {
  height: 100vh;
  width: 100vw;
  position: absolute;
  background: #000b;
  z-index: 101;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
  /* transition: opacity 1s, transform 1s; */
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  /* transform: translateX(-30%); */
}
</style>
