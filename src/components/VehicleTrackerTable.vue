<template>
  <v-data-table-server
    v-model:items-per-page="pagination.itemsPerPage"
    :items-per-page-options="itemsPerPageOptions"
    :headers="headers"
    :items="
      Array.isArray(vehicleTrackerStore.vehiclesData?.data)
        ? vehicleTrackerStore.vehiclesData.data
        : []
    "
    :items-length="pagination.totalItems"
    :loading="isLoadingVehicles"
    @update:options="updateOptions"
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

const vehicleTrackerStore = useVehicleTrackerStore();
const isLoadingVehicles = ref(false);

const pagination = reactive({
  itemsPerPage: 10,
  totalPages: 0,
  pageActive: 1,
  totalItems: 0,
});

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

  vehicleTrackerStore
    .getVehiclesData({
      startDate: "2025-10-20T20:00Z",
      endDate: "2025-10-29T20:00Z",
      page: pagination.pageActive,
      rows: pagination.itemsPerPage,
      divisionId: [42, 46],
    })
    .then((res) => {
      pagination.totalItems = res.totalItems;
      pagination.totalPages = res.totalPages;
      pagination.pageActive = res.pageActive;
    })
    .catch(() => (tryAgain.value = true))
    .finally(() => (isLoadingVehicles.value = false));
}

function updateOptions(e: { page: number; itemsPerPage: number }) {
  pagination.itemsPerPage = e.itemsPerPage;
  pagination.pageActive = e.page;

  getVehiclesData();
}
</script>
