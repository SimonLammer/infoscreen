<template>
  <div>
    <input v-model="message">
    <button @click="onClick">Greet</button>
    <div>Inner DIV</div>
  </div>
</template>

<script lang="ts">
import Vue, { ComponentOptions }  from 'vue'
//import { MyClass } from '../app.ts'
//import OtherComponent from './OtherComponent.vue';

interface MyComponent extends Vue {
  message: string
  onClick (): void
}
export default {
  components: {
    //OtherComponent
  },
  data: function () {
    return {
      message: `Hello!`
    }
  },
  methods: {
    onClick: function () {
      window.alert(this.message + " - ");
    }
  }
} as ComponentOptions<MyComponent>
</script>

<style lang="scss" scoped>
@import "../style/utils";
div {
  > div {
    background-color: $brand-success;
  }
}
</style>