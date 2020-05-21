<template>
  <div class="text-to-input">
    <component :is="tag" v-show="!edit" @click="showInput($event)">
      {{ text }}
    </component>
    <input
      v-show="edit"
      type="text"
      :value="text"
      :maxlength="max"
      :class="className"
      @blur.prevent="changed($event)"
      @keyup.enter.prevent="changed($event)"
    />
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 32
    },
    tag: {
      type: String,
      default: "div"
    },
    className: {
      type: String
    }
  },
  data() {
    return {
      edit: false
    };
  },
  methods: {
    changed(event) {
      const text = event.target.value;

      if (this.edit) {
        if (text.length > this.min) {
          this.$emit("changed", text);
        }
        this.edit = false;
      }
    },
    showInput(event) {
      this.edit = true;

      this.$nextTick(() => {
        event.target.nextSibling.focus();
      });
    }
  }
};
</script>

<style>
.text-to-input input {
  text-align: center;
  border: none;
  width: 100%;
  font-size: 1.5em;
}
</style>
