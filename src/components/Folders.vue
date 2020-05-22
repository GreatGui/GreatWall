<template>
  <div ref="scrool" class="folder-visible" v-dragscroll.x>
    <transition-group class="folder-collection" name="list" tag="div">
      <div
        key="/up"
        v-show="path"
        class="folder-card color-up"
        @click="handleUpDir"
        data-no-dragscroll
      >
        <span class="folder-up" data-no-dragscroll>⇪</span>
      </div>
      <div
        v-for="folder in folders"
        :key="folder.name"
        class="folder-card"
        data-no-dragscroll
        @click="handleDir(`${folder.path}/${folder.name}`)"
      >
        <span class="folder" data-no-dragscroll>
          {{ folder.name }}
        </span>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { dragscroll } from "vue-dragscroll";

export default {
  directives: {
    dragscroll: dragscroll
  },
  mounted() {
    this.scroll();
  },
  props: {
    folders: {
      type: Array,
      default: () => []
    },
    path: {
      type: String
    }
  },
  methods: {
    handleDir(fullPath) {
      this.$emit("click-dir", fullPath);
    },
    handleUpDir() {
      this.$emit("click-up");
    },
    scroll() {
      const scrool = this.$refs.scrool;

      scrool.addEventListener("wheel", event => {
        if (event.deltaY > 0) {
          scrool.scrollLeft += 30;
        } else {
          scrool.scrollLeft -= 30;
        }
      });
    }
  }
};
</script>

<style>
.folder-visible {
  width: 100%;
  border-bottom: 1px solid #dedede;
  padding-bottom: 15px;
  overflow: hidden;
  /* overflow-x: auto; */
  height: auto;
  position: relative;
}

.folder-collection {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  width: fit-content;
  align-content: baseline;
}

.folder-card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 48px;
  position: relative;
  margin: 20px 10px 10px;
  box-shadow: 0 3px 0 0 rgba(0, 0, 0, 0.2);
  vertical-align: middle;
}

.folder-card:before,
.folder-card:after {
  content: "";
  display: block;
  position: absolute;
}

.folder-card {
  cursor: pointer;
  background: #f6c670;
  /* top: 12px; */
  /* left: 18px; */
  border-radius: 0 0 5px 5px;
  height: 43px;
  width: 72px;
  box-shadow: 0 -10px 0 -5px #f3f3f3, 0 -10px 0 0 #c9973b,
    0 3px 0 0 rgba(0, 0, 0, 0.2);
}

.folder-card:before {
  width: 35px;
  top: -25px;
  left: 0;
  height: 20px;
  border-bottom: 10px solid #c9973b;
  border-right: 10px solid transparent;
  z-index: -1;
}

.folder {
  font-size: 12px;
}

.folder-up {
  font-size: 36px;
  color: white;
  width: 100%;
}

.folder-card:hover:not(:first-of-type) {
  background: #e6b967;
  box-shadow: 0 -10px 0 -5px #f3f3f3, 0 -10px 0 0 #a57928,
    0 3px 0 0 rgba(0, 0, 0, 0.2);
}

.folder-card:hover:not(:first-of-type):before {
  border-bottom: 10px solid #a57928;
}

.color-up {
  background: #5bc0de;
  box-shadow: 0 -10px 0 -5px #f3f3f3, 0 -10px 0 0 #2390b0,
    0 3px 0 0 rgba(0, 0, 0, 0.2);
}

.color-up:before {
  border-bottom: 10px solid #2390b0;
}

.folder-up:hover {
  -webkit-animation: mover 1s infinite alternate;
  animation: mover 1s infinite alternate;
}

@keyframes mover {
  0% {
    transform: translateY(0);
  }
  33% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(6px);
  }
}

.folder-collection {
  cursor: grab;
}

.folder-collection:active {
  cursor: grabbing;
}
</style>
