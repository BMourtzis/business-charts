<template>
  <div class="hello">
    <h2>{{ greet }} {{ props.msg }}</h2>
    <button @click="changeGreeting">Change Greeting</button>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  msg: String
})

const greet = ref("Hello")

function changeGreeting() {
  greet.value = greet.value === "Hello" ? "Hi" : "Hello";

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
