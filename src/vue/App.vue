<template>
  <div>
    <input v-model="message">
    <button @click="onClick">Greet</button>
  </div>
</template>

<script lang="ts">
import Vue, { ComponentOptions }  from 'vue'
import { MyClass } from '../app.ts'

interface MyComponent extends Vue {
  message: string
  num : MyClass
  onClick (): void
}
export default {
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
