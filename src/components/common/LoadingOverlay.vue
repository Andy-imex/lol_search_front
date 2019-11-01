<template>
  <div class="loading_overlay" v-if="show">
    <div class="background"></div>
    <b-spinner class="spinner" label="Text Centered" variant="primary"></b-spinner>
  </div>
</template>

<script>
  export default {
    name: "LoadingOverlay",
    props:{
      on: {
        type: Boolean,
        default: true
      }
    }
    ,
    data() {
      return {
        show: this.on
      }
    },
    methods: {
      open() {
        this.show = true;
      },
      close() {
        this.show = false;
      }
    }
  }
</script>

<style scoped>
  .background {
    background: white;
    opacity: 0.6;
    width: 100%;
    height: 100%;
  }

  .loading_overlay {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .spinner {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width:4em;
    height: 4em;
    margin: auto;
  }
</style>