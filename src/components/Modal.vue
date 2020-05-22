<template>
  <div class="modal">
    <transition name="modal">
      <div v-if="show" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <h4 name="header" v-html="header"></h4>
            </div>
            <div class="modal-body">
              <slot name="body">
                <button class="button true" @click.prevent="closed(true)">
                  Yes
                </button>
                <button class="button false" @click.prevent="closed(false)">
                  No
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    header: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closed(res) {
      this.$emit("closed", res);
    }
  }
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h4 {
  margin-top: 0;
  /* color: #42b983; */
}

.modal-body {
  margin-top: 20px;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.modal-body {
  display: flex;
  justify-content: space-around;
}

.button {
  padding: 5px 20px;
  border-width: 2px;
  border-style: solid;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
}

.true {
  border-color: #1a9236;
  background-color: #28a745;
}

.false {
  border-color: #b9323f;
  background-color: #dc3545;
}
</style>
