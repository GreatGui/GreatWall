<template>
  <div class="collect">
    <header>
      <router-link to="/collections" title="Back">
        <i class="fa fa-arrow-circle-left i-left">&#xf0a8;</i>
      </router-link>
      <div class="collection-editable">
        <text-to-input
          class-name="collection-title"
          tag="h2"
          :text="collection.title"
          :min="1"
          :max="24"
          @changed="editTitle"
        >
        </text-to-input>
        <text-to-input
          class-name="collection-description"
          tag="p"
          :text="collection.description"
          :min="0"
          :max="48"
          place="Click to edit the description"
          @changed="editDescription"
        >
        </text-to-input>
      </div>
      <span
        @click="choosedCollection(collection._id)"
        title="Select this Collection of wallpapers"
      >
        <i v-if="collection._id == currentId" class="fa fa-check-circle">
          &#xf058;
        </i>
        <i v-else class="fa fa-circle">&#xf111;</i>
      </span>
    </header>
    <card-image
      :images="collection.images"
      @menu="collectionMenu"
      :currentWallpaper="currentWall"
    ></card-image>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CardImage from "@/components/CardImage";
import TextToInput from "@/components/TextToInput";

export default {
  beforeRouteLeave(to, from, next) {
    this.clearCollection();
    next();
  },
  components: {
    CardImage,
    TextToInput
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.selectedCollection(this.id);
  },
  methods: {
    ...mapActions("collection", [
      "selectedCollection",
      "choosedCollection",
      "collectionMenu",
      "clearCollection",
      "editTitle",
      "editDescription"
    ])
  },
  computed: {
    ...mapState(["currentWall"]),
    ...mapState("collection", ["collection", "currentId", "paperIndex"])
  }
};
</script>

<style>
.collect header {
  border-bottom: 1px solid #dedede;
  padding-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.collect a {
  text-decoration: none;
}

.collect header i {
  font-size: 36px;
  cursor: pointer;
}

.collect header .i-left {
  /* position: absolute; */
  /* top: 20px; */
  /* left: 30px; */
  transition: 0.5s all;
  color: #d9534f;
}

.collect header .i-left:hover {
  filter: brightness(1.25);
}

.collection-editable {
  width: 50%;
}

.collection-title {
  font-size: 1.5em;
}

.collection-description {
  font-size: 1em;
}
</style>
