<template>
  <div>
    <input v-model="message">
    <button @click="onClick">Greet</button>
    <div>Inner DIV</div>
    <other-component></other-component>
  </div>
</template>

<script lang="ts">
import Vue, { ComponentOptions }  from 'vue'
import { MyClass } from '../app.ts'

import OtherComponent from './OtherComponent.vue';

interface MyComponent extends Vue {
  message: string
  num : MyClass
  onClick (): void
}
export default {
  components: {
    OtherComponent
  },
  data: function () {
    return {
      message: `Hello!`,
      num: new MyClass(4)
    }
  },
  methods: {
    onClick: function () {
      window.alert(this.message + " - " + this.num.getNumber());
    }
  }
} as ComponentOptions<MyComponent>
</script>

<style lang="scss" scoped>
@import "../style/variables";
div {
  > div {
    background-color: $brand-success;
  }
}
</style>