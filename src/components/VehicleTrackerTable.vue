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

    <v-btn icon="mdi-cog" size="x-small" />
  </div>

  <v-dialog v-model="isFilterOpen" width="auto">
    <vehicle-tracker-table-filter
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
    :items-per-page-options="itemsPerPageOptions"
    :headers="headers"
    :items="
      Array.isArray(vehicleStore.vehiclesData?.data)
        ? vehicleStore.vehiclesData.data
        : []
    "
    :items-length="vehicleStore.filterData.pagination.totalItems"
    :loading="isLoadingVehicles"
    @update:options="updatePagination"
    disable-sort
  />

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
import { useVehicleTrackerStore } from "@/stores/vehicleTrackerStore";
import { ref } from "vue";

const vehicleStore = useVehicleTrackerStore();
const isLoadingVehicles = ref(false);
const isFilterOpen = ref(false);

const tryAgain = ref(false);

const itemsPerPageOptions = [
  { value: 10, title: "10" },
  { value: 15, title: "15" },
  { value: 20, title: "20" },
];

const headers = [
  { title: "Frota", key: "vehicleIdTms" },
  { title: "Operação", key: "operationName" },
  { title: "Divisão", key: "divisionName" },
  { title: "Placa", key: "licensePlate" },
  { title: "Hodômetro", key: "odometerKm" },
  { title: "Velocidade", key: "speed" },
  { title: "Status Veículo", key: "moving" },
  { title: "Status Ignição", key: "ignitionStatus" },
  { title: "Motorista", key: "driverName" },
  { title: "Data Processamento", key: "dateProcess" },
];

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
</script>
