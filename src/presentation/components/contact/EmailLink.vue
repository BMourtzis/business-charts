<template>
  <div>
    <v-icon 
      icon="mdi-email" 
      size="16" 
      class="mr-1 text-grey" 
    />
    <a
      :href="`mailto:${props.email.value}`"
      class="text-decoration-none text-body-2"
      @clic.stop
    >
      {{ props.email.value }}
    </a>
  </div>
</template>

<script setup lang="ts">
import { Contact } from '@/domain/contact/models/contact';

const props = defineProps<{
  email: Contact
}>();

</script>

<style scoped></style>