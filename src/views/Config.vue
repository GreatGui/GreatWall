<template>
  <div class="about">
    <div>
      <h1 class="title">Configurations</h1>
      <div class="items">
        <div class="item">
          <label class="item" for="time">Time: </label>
          <input
            class="value"
            id="time"
            type="number"
            min="1"
            max="1440"
            :value="config.time"
            @blur="setTime($event.target.value)"
          />
          <span> {{ timeMetric }}</span>
        </div>
        <div class="item">
          <label class="item" for="time">Theme: </label>
          <input class="value" id="time" type="text" disabled value="Light" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["setTime"])
  },
  computed: {
    ...mapState(["config"]),
    timeMetric() {
      return this.config.time == 1 ? "minute" : "minutes";
    }
  }
};
</script>

<style scoped>
.title {
  letter-spacing: 0.25px;
}

.items {
  margin-top: 18px;
}

.item {
  /* display: flex; */
  margin-bottom: 6px;
}

.item .name {
  color: #6a6a6a;
  /* margin-right: 6px; */
}

.item .value {
  color: #35495e;
  font-weight: bold;
}
</style>
