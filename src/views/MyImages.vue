<template>
  <div class="my-image">
    <div class="input-file">
      <input
        @change="readURL"
        type="file"
        id="client-folder"
        ref="directory"
        webkitdirectory
        directory
      />
      <label for="client-folder">
        <i class="fas fa-folder-open">&#xf07c;</i>
        {{ path || "Select a Folder ..." }}
      </label>
    </div>
    <folders
      :path="path"
      :folders="folders"
      @click-dir="handleDir"
      @click-up="handleUpDir"
    >
    </folders>
    <card-image
      :images="images"
      @menu="imageMenu"
      :currentWallpaper="currentWall"
    ></card-image>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CardImage from "@/components/CardImage";
import Folders from "@/components/Folders";

export default {
  name: "MyImages",
  components: {
    CardImage,
    Folders
  },
  mounted() {
    if (localStorage.path) {
      // this.path = localStorage.path;
    }

    this.mapPath();
  },
  methods: {
    ...mapActions("myImage", [
      "clearDir",
      "handleImg",
      "handleDir",
      "handleUpDir",
      "readURL",
      "setDimensions",
      "imageMenu",
      "mapPath"
    ])
  },
  computed: {
    ...mapState(["currentWall"]),
    ...mapState("myImage", ["path", "folders", "images", "selected"])
  }
};
</script>

<style scoped>
.input-file {
  position: relative;
  padding: 10px;
  text-align: left;
  font-weight: bold;
  cursor: pointer;
  width: 50%;
}

.input-file input {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 38px;
}

#client-folder {
  cursor: pointer;
}
</style>
