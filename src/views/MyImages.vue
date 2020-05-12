<template>
  <div class="home">
    <div class="input-file">
      <input
        @change="readURL"
        type="file"
        id="client-folder"
        ref="directory"
        webkitdirectory
        directory
      />
      <label for="client-folder">{{ path || "Select a Folder ..." }}</label>
    </div>
    <div class="folder-collection">
      <div v-show="path" class="folder-card color-up" @click="handleUpDir">
        <span class="folder-up">⇪</span>
      </div>
      <div
        v-for="(folder, index) in folders"
        :key="index"
        class="folder-card"
        @click="handleDir(`${folder.path}/${folder.name}`)"
      >
        <span class="folder">
          {{ folder.name }}
        </span>
      </div>
    </div>
    <div class="image-collection">
      <div v-for="(image, index) in images" :key="index" class="image-card">
        <img
          @click="handleImg(`${image.path}/${image.name}`)"
          class="image"
          :src="`${image.path}/${image.name}`"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "MyImages",
  mounted() {
    if (localStorage.path) {
      // this.path = localStorage.path;
    }
  },
  methods: {
    ...mapActions("myImage", [
      "clearDir",
      "handleImg",
      "handleDir",
      "handleUpDir"
    ]),
    readURL(e) {
      const dir = this.$refs.directory;
      console.log(e, dir);

      this.path = dir.files[0].path.replace(/\\/g, "/");
    }
  },
  computed: {
    ...mapState("myImage", ["path", "folders", "images", "selected"])
  },
  watch: {
    path(val) {
      localStorage.path = val;

      let fs = require("fs");
      let imgs = fs.readdirSync(val);

      this.clearCollections();

      for (let img of imgs) {
        if (/\.(jpe?g|tiff|png|webp|bmp)$/i.test(img)) {
          // let dimensions = sizeOf(val + "/" + img);
          // console.log(dimensions.width, dimensions.height);

          this.images.push({
            name: img,
            path: this.path
          });
        } else {
          fs.lstat(`${this.path}/${img}`, (err, stat) => {
            if (err) {
              return;
            }
            if (stat.isDirectory()) {
              this.folders.push({
                name: img,
                path: this.path
              });
            }
          });
        }
      }
    }
  }
};
</script>

<style scoped>
.image-collection {
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

.image-card .image {
  width: 100%;
  height: auto;
  padding: 2px;
  border: 2px solid rgba(0, 0, 0, 0);
  transition: 0.6s all;
}

.image-card .image:hover {
  border: 2px solid orangered;
}

.folder-collection {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  /* align-items: center; */
  /* height: 85vh; change it */
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

/* Folder */
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

.input-file {
  position: relative;
  padding: 10px;
  text-align: left;
  font-weight: bold;
  cursor: pointer;
}

.input-file input {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 38px;
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

#client-folder {
  cursor: pointer;
}
</style>
