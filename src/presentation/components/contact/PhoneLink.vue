<template>
  <div>
    <v-icon 
      icon="mdi-phone" 
      size="16" 
      class="mr-1 text-grey" 
    />
    <a
      :href="`tel:${props.phone.value}`"
      class="text-decoration-none text-body-2"
      @click.stop
    >
      {{ props.phone.value }}
    </a>
  </div>
</template>

<script setup lang="ts">
import { Contact } from '@/domain/contact/models/contact';
import { defineProps } from 'vue';

const props = defineProps<{
  phone: Contact
}>();

</script>

<style scoped></style>