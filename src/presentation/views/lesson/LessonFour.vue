<template>
  <div>
    <h1>Lesson 1</h1>
    <p>{{ lesson.helloGreeting }} {{ lesson.name }}</p>
    <p>{{ lesson.iAmGreeting }} {{ lesson.yearsOld }} {{ lesson.yearsGreeting }}</p>
    <p v-if="lesson.fromPalamas">
      {{ lesson.fromGreeting }}
    </p>
    <p v-if="lesson.displaySecretMessage">
      {{ lesson.secretMessage }}
    </p>
    <h2>Exercise 1</h2>
    <p v-if="exercise1">
      {{ exercise1 }}
    </p>
    <p v-if="!exercise1">
      No answer found
    </p>
    <h2>Exercise 2</h2>
    <p v-if="exercise2">
      {{ exercise2 }}
    </p>
    <p v-if="!exercise2">
      No answer found
    </p>
    <h2>Exercise 3</h2>
    <p v-if="exercise3">
      <ol>
        <li>{{ exercise3.location1 }}</li>
        <li>{{ exercise3.location2 }}</li>
        <li>{{ exercise3.location3 }}</li>
      </ol>
    </p>
    <p v-if="!exercise3">
      No answer found
    </p>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
import lessonData from '@/lessons/lesson1.js';

const lesson = reactive(lessonData.lesson);
const exercise1 = reactive(lessonData.exercise1);
const exercise2 = reactive(lessonData.exercise2);
const exercise3 = reactive(lessonData.exercise3);

</script>
<style scoped></style>