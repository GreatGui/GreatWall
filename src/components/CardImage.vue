<template>
  <div class="card-image">
    <transition-group class="gallery scrollbar" :name="name" tag="div">
      <div
        v-for="(image, index) in images"
        :key="image.name"
        class="image-box"
        :class="mode"
        :title="image.name"
      >
        <div class="image-dimension">
          <span>{{ image.width || "?" }} x {{ image.height || "?" }}</span>
        </div>
        <img
          @contextmenu="rightMenu(image, index)"
          @load="loadImage(image, $event)"
          class="image"
          :class="{ currentWallpaper: isCurrent(image) }"
          :src="`${image.path}/${image.name}`"
        />
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "CardImage",
  props: {
    images: {
      type: Array,
      default: () => []
    },
    mode: {
      type: String,
      default: "little"
    },
    currentWallpaper: {
      type: String
    },
    name: {
      type: String,
      default: "gallery"
    }
  },
  methods: {
    rightMenu(image, index) {
      this.$emit("menu", { image, index });
    },
    loadImage(image, event) {
      if (!image.width) {
        image.width = event.target.naturalWidth;
      }
      if (!image.height) {
        image.height = event.target.naturalHeight;
      }
    },
    isCurrent(image) {
      return `${image.path}/${image.name}` == this.currentWallpaper;
    }
  }
};
</script>

<style scoped>
.card-image {
  height: 100%;
  overflow: auto;
}

.gallery {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow-x: auto;
  align-content: baseline;
}

.image-box {
  padding: 10px;
  box-sizing: border-box;
  position: relative;
}

.image-box .image {
  width: 100%;
  height: 100%;
  padding: 1px;
  border: 2px solid rgba(0, 0, 0, 0);
  transition: 0.6s all;
}

.image-box .image:hover {
  border: 2px solid #42b983;
}

.currentWallpaper {
  outline: 2px solid orangered;
}

.image-dimension {
  position: absolute;
  border-radius: 0 0 10px 0;
  margin: 4px;
  padding: 4px;
  color: white;
  background-color: #00000070;
}

.large {
  width: 100%;
}

.medium {
  width: 50%;
}

.little {
  width: 300px;
}

.gallery-move {
  transition: 1s all;
}

.gallery-enter-active {
  transition: all 1s;
}

.gallery-enter,
.gallery-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.gallery-leave-active {
  position: absolute;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-to,
.fade-enter-active {
  transition: all 1s;
}
</style>
