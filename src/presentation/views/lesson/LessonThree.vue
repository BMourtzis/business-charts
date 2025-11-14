<template>
  <div>
    <h1>Lesson 3</h1>
    <h3>Control Flow</h3>
    <p>if score > 5 then message = <strong>{{ lesson.message }}</strong></p>
    <p>if hasPassed then messageFromCondition = <strong>{{ lesson.messageFromCondition }}</strong></p>
    <p>if newScore > 5 then newMessage = <strong>{{ lesson.newMessage }}</strong></p>

    <p>total score is 85, then the grade is <strong>{{ lesson.grade }}</strong></p>
    <p>the grade is <strong>{{ lesson.grade }}</strong> then the degree's seal color is <strong>{{ lesson.sealColor }}</strong></p>
    <h3>Loops</h3>
    <p>from the while(i &lt; 10) loop the result is {{ lesson.numberCount }}</p>
    <p>from the while(true) loop the result is {{ lesson.newNumberCount }}</p>
    <p>from the for loop the result is {{ lesson.numberCountString }}</p>
    <p>We can loop arrays</p>
    <p>from the for loop of colours the reuslt is {{ lesson.colourString }}</p>
    <p>from the for..of loop of colours the reuslt is {{ lesson.newColourString }}</p>
    <h2>Exercise 1</h2>
    <p v-for="item in listOfGrade" :key="item">
      <strong>{{ item.name }}</strong> got a grade of <strong>{{ item.grade }}</strong>, their result is <strong>{{ lessonData.exercise1(item.grade) }}</strong>
    </p>
    <h2>Exercise 2</h2>
    <p v-for="car in listOfMilage" :key="car">
      The <strong>{{ car.name }}</strong> has <strong>{{ car.milage }}</strong> KMs, it is in <strong>{{ lessonData.exercise2(car.milage) }}</strong> condition
    </p>
    <h2>Exercise 3</h2>
    <p>Here is the count from 1 to 100: {{ lessonData.exercise3 }}</p>
    <h2>Exercise 4</h2>
    <v-text-field 
      v-model="colour"
    />
    <p>{{ colour }} is {{ lessonData.exercise4(colour) ? "valid" : "not valid"}}</p>
    <h2>Exercise 5</h2>
    <p>The longest word in my list is: <strong>{{ lessonData.exercise5 }}</strong></p>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import lessonData from '@/lessons/lesson3.js';

const listOfGrade = [
  { name: "Alice", grade: 10 },
  { name: "Ben", grade: 20 },
  { name: "Clara", grade: 45 },
  { name: "Dimitris", grade: 49 },
  { name: "Eva", grade: 50 },
  { name: "Felix", grade: 99 },
  { name: "Georgia", grade: 85 },
  { name: "Hassan", grade: 86 },
  { name: "Irene", grade: 67 },
  { name: "Jonas", grade: 77 },
  { name: "Katerina", grade: 65 }
];

const listOfMilage = [
  { name: "Toyota Corolla", milage: 284563 },
  { name: "Honda Civic", milage: 15432 },
  { name: "Ford Focus", milage: 97812 },
  { name: "Volkswagen Golf", milage: 299001 },
  { name: "BMW 3 Series", milage: 12456 },
  { name: "Mercedes A-Class", milage: 186732 },
  { name: "Audi A4", milage: 236541 },
  { name: "Nissan Qashqai", milage: 34100 },
  { name: "Kia Sportage", milage: 227804 },
  { name: "Hyundai i30", milage: 19988 },
  { name: "Peugeot 208", milage: 151234 },
  { name: "Renault Clio", milage: 68001 }
];

const colour = ref("");


const lesson = reactive(lessonData.lesson);

</script>
<style scoped></style>