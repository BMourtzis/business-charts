<template>
  <div 
    v-if="mainBtnOptions"
    class="d-flex button-with-options"
  >
    <v-btn 
      :class="leftBtnClass"
      size="small"
      variant="flat"
      :text="mainBtnOptions.title"
      :color="mainBtnOptions.color"
      :icon="mainBtnOptions.icon"
      @click="mainBtnOptions.action?.()"
    >
      {{ mainBtnOptions.title }}
    </v-btn>

    <v-menu 
      v-if="menuOptions.length > 0"
      offset-y
    >
      <template #activator="{ props }">
        <v-btn 
          v-bind="props" 
          class="right-btn"
          variant="flat"
          size="small"
          :color="mainBtnOptions.color" 
        >
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <template
          v-for="btnOptions in menuOptions"
        >
          <v-list-item
            :prepend-icon="btnOptions.icon"
            :color="btnOptions.color"
            :title="btnOptions.title"
            @click="btnOptions.action()"
          />
        </template>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import type { ButtonOptions } from '@/presentation/types/types';
import { computed } from 'vue';

const props = defineProps<{
  mainBtnOptions: ButtonOptions,
  menuOptions: ButtonOptions[];
}>();

const leftBtnClass = computed(() => ({
  'left-btn': props.menuOptions.length > 0
}));
</script>

<style lang="css" scoped>
  .button-with-options .left-btn {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .button-with-options .right-btn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left-width: 2px;
  }
</style>