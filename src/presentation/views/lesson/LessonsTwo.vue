<template>
  <div>
    <h1>Lesson 2</h1>
    <h2>Arithemtic</h2>
    <p>5 + 3 = {{ lesson.a }}</p>
    <p>5 - 3 = {{ lesson.b }}</p>
    <p>3 - 5 = {{ lesson.negative }}</p>
    <p>5 * 3 = {{ lesson.c }}</p>
    <p>5 / 2 = {{ lesson.d }}</p>
    <p>5 % 3 = {{ lesson.e }}</p>
    <p>"hello" + ", " + "Stefania!"" = {{ lesson.text }}</p>
    <p>"1" + 3 = {{ lesson.numberText }}</p>
    <h2>Comparison</h2>
    <p>5 == 5 = {{ lesson.numberBeingEqual }}</p>
    <p>4 == 5 = {{ lesson.numberNotBeingEqual }}</p>
    <p>a == 8 = {{ lesson.equalVariable }}</p>
    <p>a == "8" = {{ lesson.equalStringEqual }}</p>
    <p>a === "8" = {{ lesson.strongNotBeingEqual }}</p>
    <p>b === 2 = {{ lesson.strongEqual }}</p>
    <p>a > b = {{ lesson.greater }}</p>
    <p>negative > b = {{ lesson.notGreater }}</p>
    // eslint-disable-next-line vue/no-parsing-error
    <p>negative &lt; b = {{ lesson.less }}</p>
    <p>a &lt; b = {{ lesson.notLess }}</p>
    <p>c >= 15 = {{ lesson.gtE }}</p>
    <p>d &lt;= 2 = {{ lesson.ltE }}</p>
    <p>e != 3 = {{ lesson.notEqual }}</p>
    <p>e != 2 = {{ lesson.notNotEqual }}</p>
    <h2>Logic</h2>
    <p>numberBeingEqual && equalVariable = {{ lesson.andBothTrue }}</p>
    <p>numberNotBeingEqual && equalStringEqual = {{ lesson.andBothFalse }}</p>
    <p>strongEqual && strongNotBeingEqual = {{ lesson.andOneFalse }}</p>

    <p>numberBeingEqual || equalVariable = {{ lesson.orBothTrue }}</p>
    <p>numberNotBeingEqual || equalStringEqual = {{ lesson.orBothFalse }}</p>
    <p>strongEqual || strongNotBeingEqual = {{ lesson.orOneFalse }}</p>

    <p>!greater = {{ lesson.wasTrue }}</p>
    <p>!notGreater = {{ lesson.wasFalse }}</p>
    <h2>Exercise 1</h2>
    <p>5 + 6 = {{ exercise1.addition }}</p>
    <p>5 - 6 = {{ exercise1.subtraction }}</p>
    <p>5 * 6 = {{ exercise1.multiplication }}</p>
    <p>5 / 6 = {{ exercise1.division }}</p>
    <p>5 % 6 = {{ exercise1.remainder }}</p>
    <h2>Exercise 2</h2>
    <p>My BMI is: {{ exercise2 }}</p>
    <h2>Exercise 3</h2>
    <p> 5 > 6 = {{ exercise3.gt }}</p>
    <p> 5 &lt; 6 = {{ exercise3.lt }}</p>
    <p> 5 >= 6 = {{ exercise3.gtE }}</p>
    <p> 5 &lt;= 6 = {{ exercise3.ltE }}</p>
    <p> 5 == 6 = {{ exercise3.equal }}</p>
    <p> 5 === 6 = {{ exercise3.strongEqual }}</p>
    <p> 5 != 6 = {{ exercise3.notEqual }}</p>
    <h2>Exercise 4</h2>
    <p>a AND b = {{ exercise4.and }}</p>
    <p>a OR b = {{ exercise4.or }}</p>
    <p>NOT a OR NOT b = {{ exercise4.not }}</p>
    <h2>Exercise 5</h2>
    result is {{ exercise5 }}
  </div>
</template>
<script setup>
import { reactive } from 'vue';
import lessonData from '@/lessons/lesson2.js';

const lesson = reactive(lessonData.lesson);
const exercise1 = reactive(lessonData.exercise1);
const exercise2 = reactive(lessonData.exercise2);
const exercise3 = reactive(lessonData.exercise3);
const exercise4 = reactive(lessonData.exercise4);
const exercise5 = reactive(lessonData.exercise5);

</script>
<style scoped></style>