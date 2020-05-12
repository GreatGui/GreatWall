<template>
  <div id="app">
    <div id="nav">
      <router-link v-for="menu in menus" :key="menu.name" :to="menu.to">
        <i class="fa" :class="`fa-${menu.class}`" v-html="menu.icon"></i>
        <span class="subtitle" :style="`margin-top: ${menu.margin}px;`">{{
          menu.name
        }}</span>
      </router-link>
    </div>
    <router-view class="main" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          name: "Home",
          icon: "&#xf015;",
          class: "home",
          margin: "-5",
          to: "/"
        },
        {
          name: "Konachan",
          icon: "&#xf0c2;",
          class: "cloud",
          margin: "-5",
          to: "/konachan"
        },
        {
          name: "MyImages",
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
  }
};
</script>

<style>
@font-face {
  font-family: "Font Awesome 5 Free";
  src: url(~@/assets/fonts/FontAwesome5Free-Solid-900.otf);
  font-weight: normal;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.fa {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  font-style: normal;
}

.main {
  flex: 1 1 auto;
  padding: 20px;
  position: relative;
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
}

#nav a:last-of-type {
  margin-top: auto;
  margin-bottom: 0;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#nav .fa {
  font-size: 60px;
}

.subtitle {
  font-size: 10px;
  display: block;
}
</style>
