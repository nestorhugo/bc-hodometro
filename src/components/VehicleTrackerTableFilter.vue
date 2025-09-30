<template>
  <v-card width="50vw" prepend-icon="mdi-filter" title="Filtro">
    <div class="pa-2">
      <v-form @submit.prevent="submit" validate-on="submit">
        <h3 class="pb-2">Intervalo de data</h3>
        <div class="d-flex align-center">
          <v-date-input
            label="Início"
            v-model="filterForm.startDate"
            :max="filterForm.endDate?.toISOString()"
            :rules="[validateNotEmpty]"
          />
          <v-date-input
            label="Fim"
            class="ml-4"
            v-model="filterForm.endDate"
            :min="filterForm.startDate?.toISOString()"
            :rules="[validateNotEmpty]"
          />
        </div>

        <v-combobox
          v-model="filterForm.idTms"
          label="Frota"
          multiple
          chips
          closable-chips
          clearable
        />

        <v-combobox
          v-model="filterForm.licensePlates"
          label="Placa"
          multiple
          chips
          closable-chips
          clearable
        />

        <v-select
          chips
          multiple
          clearable
          label="Divisão"
          :items="DIVISION_ITEMS"
          v-model="filterForm.divisionIds"
        />
        <v-btn color="primary" type="submit">Salvar</v-btn>
      </v-form>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { DIVISION_ITEMS } from "@/constants/filterConstants";
import { setDateToYesterday } from "@/functions/utils";
import { validateNotEmpty } from "@/functions/validationRules";
import { useVehicleTrackerStore } from "@/stores/vehicleTrackerStore";
import type { SubmitEventPromise } from "vuetify";

const vehicleStore = useVehicleTrackerStore();
const emit = defineEmits(["update-filter"]);

const now = new Date();

const filterForm = reactive({
  startDate: setDateToYesterday(now),
  endDate: now,
  idTms: [],
  divisionIds: [],
  licensePlates: [],
});

async function submit(event: SubmitEventPromise) {
  const results = await event;

  if (results.valid) {
    vehicleStore.filterData.startDate = filterForm.startDate;
    vehicleStore.filterData.endDate = filterForm.endDate;
    vehicleStore.filterData.divisionIds = filterForm.divisionIds;
    vehicleStore.filterData.idTms = filterForm.idTms;
    vehicleStore.filterData.licensePlates = filterForm.licensePlates;

    emit("update-filter");
  }
}
</script>
