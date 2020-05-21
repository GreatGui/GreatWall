import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/my-images",
    name: "MyImages",
    component: () => import("../views/MyImages.vue")
  },
  // {
  //   path: "/konachan",
  //   name: "Konachan",
  //   component: () => import("../views/Konachan.vue")
  // },
  {
    path: "/collections",
    name: "Collections",
    component: () => import("../views/Collections.vue")
  },
  {
    path: "/collections/:id",
    name: "Collection",
    component: () => import("../views/Collection.vue"),
    props: true
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/config",
    name: "Config",
    component: () => import("../views/Config.vue")
  }
];

const router = new VueRouter({
  mode: "hash",
  routes
});

export default router;
