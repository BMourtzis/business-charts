<template>
  <div style="height:300px">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>


<script setup>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = {
  labels: ['A', 'B', 'C'],
  datasets: [
    {
      label: 'Example Data',
      data: [30, 40, 60],
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
}
</script>