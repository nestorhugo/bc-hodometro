<template>
  <v-card width="60vw" prepend-icon="mdi-cog" title="Configuração">
    <div class="pa-2">
      <v-form @submit.prevent="submit" validate-on="submit">
        <p class="text-pre-wrap"></p>
        <v-combobox
          multiple
          label="Colunas"
          :items="FILTER_HEADERS"
          v-model="headersForm"
          :rules="[validateNotEmpty]"
        />

        <vehicle-table-headers-order v-model="headersForm" />

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
import { validateNotEmpty } from "@/functions/validationRules";
import type { FilterHeader } from "@/types/Vehicle";
import type { SubmitEventPromise } from "vuetify";

const emit = defineEmits(["update-config"]);

const headersForm = ref<FilterHeader[]>(loadFilterHeaders());

async function submit(event: SubmitEventPromise) {
  const results = await event;

  if (results.valid) {
    window.localStorage.setItem(
      FILTER_HEADERS_KEY,
      JSON.stringify(headersForm.value)
    );
    emit("update-config");
  }
}
</script>
