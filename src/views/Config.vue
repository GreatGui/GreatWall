<template>
  <div class="about">
    <h1>Configurations</h1>
    <div>
      <div>
        <label for="time">Time to Change</label>
        <input id="time" type="text" v-model="time" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["time"])
  }
};
</script>

<style scoped></style>
