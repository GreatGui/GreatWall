<template>
  <div class="about">
    <h1>Configurations</h1>
    <div>
      <div>
        <label for="time">Time to Change</label>
        <input id="time" type="text" v-model="config.time" />
        <span>{{ timeMetric }}</span>
      </div>
      <button @click="test">Save</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  methods: {
    test() {
      console.log(this);
    }
  },
  computed: {
    ...mapState(["config"]),
    timeMetric() {
      return this.config.time == 1 ? "Minute" : "Minutes";
    }
  }
};
</script>

<style scoped></style>
