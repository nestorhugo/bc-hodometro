<template>
  <v-card width="60vw" prepend-icon="mdi-cog" title="Configuração">
    <div class="pa-2">
      <v-form @submit.prevent="submit" validate-on="submit">
        {{ headersForm }}
        <v-combobox
          multiple
          label="Colunas"
          :items="FILTER_HEADERS"
          v-model="headersForm"
        />
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
import type { FilterHeaders } from "@/types/Vehicle";

const emit = defineEmits(["update-config"]);

const headersForm = ref<FilterHeaders[]>(loadFilterHeaders());

async function submit() {
  window.localStorage.setItem(
    FILTER_HEADERS_KEY,
    JSON.stringify(headersForm.value)
  );
  emit("update-config");
}
</script>
