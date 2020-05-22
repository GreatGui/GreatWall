<template>
  <div class="text-to-input">
    <component
      :is="tag"
      v-show="!edit"
      @click="showInput($event)"
      :class="hasPlaceholder"
    >
      {{ text || place }}
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
    },
    place: {
      type: String,
      default: ""
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
        if (text.length >= this.min) {
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
  },
  computed: {
    hasPlaceholder() {
      return { placeholder: this.text ? false : true };
    }
  }
};
</script>

<style>
.text-to-input:first-child {
  cursor: pointer;
}

.placeholder {
  color: #42b983;
  cursor: pointer;
}

.placeholder:hover {
  filter: brightness(1.25);
}

.text-to-input input {
  text-align: center;
  border: none;
  width: 100%;
}
</style>
