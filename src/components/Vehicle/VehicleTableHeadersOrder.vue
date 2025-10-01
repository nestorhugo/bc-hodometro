<template>
  <div v-for="(header, hIndex) in headers">
    <div class="d-flex align-center justify-space-between pb-4">
      {{ header.title }}
      <div class="d-flex align-center">
        <v-btn
          icon="mdi-arrow-up"
          size="x-smal"
          color="primary"
          variant="tonal"
          :disabled="hIndex === 0"
          @click="moveHeaderUp(hIndex)"
        />

        <v-btn
          icon="mdi-arrow-down"
          size="x-smal"
          color="primary"
          variant="tonal"
          class="mr-4"
          :disabled="hIndex === headers.length - 1"
          @click="moveHeaderDown(hIndex)"
        />

        <v-btn
          icon="mdi-minus"
          size="x-smal"
          color="error"
          variant="tonal"
          @click="removeHeader(hIndex)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FilterHeader } from "@/types/Vehicle";

const headers = defineModel<FilterHeader[]>({
  required: true,
});

function moveHeaderUp(index: number) {
  if (index > 0) {
    const temp = headers.value[index - 1] as FilterHeader;
    headers.value[index - 1] = headers.value[index] as FilterHeader;
    headers.value[index] = temp;
  }
}

function moveHeaderDown(index: number) {
  if (index < headers.value.length - 1) {
    const temp = headers.value[index + 1] as FilterHeader;
    headers.value[index + 1] = headers.value[index] as FilterHeader;
    headers.value[index] = temp;
  }
}

function removeHeader(index: number) {
  headers.value.splice(index, 1);
}
</script>
