<template>
  <v-card width="60vw" prepend-icon="mdi-cog" title="Configuração">
    <div class="pa-2">
      <v-form @submit.prevent="submit" validate-on="submit">
        <p class="text-pre-wrap">
          {{ headersForm }}
        </p>
        <v-combobox
          multiple
          label="Colunas"
          :items="FILTER_HEADERS"
          v-model="headersForm"
        />

        <div v-for="(header, hIndex) in headersForm">
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
                :disabled="hIndex === headersForm.length - 1"
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

        <v-btn color="primary" type="submit">Salvar</v-btn>
      </v-form>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import {
  FILTER_HEADERS,
  FILTER_HEADERS_KEY,
} from "@/constants/filterConstants";
import { loadFilterHeaders } from "@/functions/utils";
import type { FilterHeader } from "@/types/Vehicle";

const emit = defineEmits(["update-config"]);

const headersForm = ref<FilterHeader[]>(loadFilterHeaders());

async function submit() {
  window.localStorage.setItem(
    FILTER_HEADERS_KEY,
    JSON.stringify(headersForm.value)
  );
  emit("update-config");
}

function moveHeaderUp(index: number) {
  console.log(index);
  if (index > 0) {
    const temp = headersForm.value[index - 1] as FilterHeader;
    headersForm.value[index - 1] = headersForm.value[index] as FilterHeader;
    headersForm.value[index] = temp;
  }
}

function moveHeaderDown(index: number) {
  if (index < headersForm.value.length - 1) {
    const temp = headersForm.value[index + 1] as FilterHeader;
    headersForm.value[index + 1] = headersForm.value[index] as FilterHeader;
    headersForm.value[index] = temp;
  }
}

function removeHeader(index: number) {
  delete headersForm.value[index];
}
</script>
