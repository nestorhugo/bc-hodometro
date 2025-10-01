<template>
  <div class="d-flex align-center justify-space-between py-2">
    <div class="d-flex align-center">
      <p>Consulta Hodômetro</p>
      <v-btn
        class="ml-2"
        icon="mdi-filter"
        size="x-small"
        @click="isFilterOpen = true"
      />
    </div>

    <v-btn icon="mdi-cog" size="x-small" @click="isConfigOpen = true" />
  </div>

  <v-dialog v-model="isConfigOpen" width="auto">
    <vehicle-table-headers-config
      @update-config="
        () => {
          isConfigOpen = false;
          updateTableHeaders();
        }
      "
    />
  </v-dialog>

  <v-dialog v-model="isFilterOpen" width="auto">
    <vehicle-table-filter
      @update-filter="
        () => {
          isFilterOpen = false;
          getVehiclesData();
        }
      "
    />
  </v-dialog>

  <v-data-table-server
    v-model:items-per-page="vehicleStore.filterData.pagination.itemsPerPage"
    :items-per-page-options="ITEMS_PER_PAGE_OPTIONS"
    :headers="headers"
    :items="
      Array.isArray(vehicleStore.vehiclesData?.data)
        ? vehicleStore.vehiclesData.data
        : []
    "
    :items-length="vehicleStore.filterData.pagination.totalItems"
    :loading="isLoadingVehicles"
    @update:options="updatePagination"
    mobile-breakpoint="sm"
    disable-sort
  >
    <template v-slot:item.dateProcess="{ value }">
      {{ new Date(value).toLocaleString("pt-BR") }}
    </template>

    <template v-slot:item.moving="{ value }">
      {{ value ? "Movimento" : "Parado" }}
    </template>

    <template v-slot:item.odometer="{ value }"> {{ value }} m </template>
    <template v-slot:item.odometerKm="{ value }"> {{ value }} Km </template>
    <template v-slot:item.point="{ value }">
      <p>Latitude: {{ value.latitude }}</p>
      <p>Longitude: {{ value.longitude }}</p>
    </template>
    <template v-slot:item.delayed="{ value }">
      {{ value ? "Sim" : "Não" }}</template
    >
    <template v-slot:item.ignition="{ value }">
      {{ value ? "Sim" : "Não" }}</template
    >
  </v-data-table-server>

  <v-snackbar color="error" variant="tonal" :timeout="-1" v-model="tryAgain">
    Não foi possível recuperar os dados

    <template v-slot:actions>
      <v-btn
        variant="text"
        @click="
          () => {
            tryAgain = false;
            getVehiclesData();
          }
        "
      >
        Tentar novamente
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { ITEMS_PER_PAGE_OPTIONS } from "@/constants/filterConstants";
import { loadFilterHeaders } from "@/functions/utils";
import { useVehicleTrackerStore } from "@/stores/vehicleTrackerStore";
import { ref } from "vue";

const vehicleStore = useVehicleTrackerStore();
const isLoadingVehicles = ref(false);
const isFilterOpen = ref(false);
const isConfigOpen = ref(false);
const tryAgain = ref(false);
const headers = ref(loadFilterHeaders());

function getVehiclesData() {
  isLoadingVehicles.value = true;

  vehicleStore
    .getVehiclesData()
    .catch(() => (tryAgain.value = true))
    .finally(() => (isLoadingVehicles.value = false));
}

function updatePagination(e: { page: number; itemsPerPage: number }) {
  vehicleStore.filterData.pagination.itemsPerPage = e.itemsPerPage;
  vehicleStore.filterData.pagination.pageActive = e.page;

  getVehiclesData();
}

function updateTableHeaders() {
  headers.value = loadFilterHeaders();
}
</script>
