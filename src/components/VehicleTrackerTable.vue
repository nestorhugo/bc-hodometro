<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="
      Array.isArray(vehicleTrackerStore.vehiclesData?.data)
        ? vehicleTrackerStore.vehiclesData.data
        : []
    "
    :items-length="totalItems"
    :loading="isLoadingVehicles"
    item-value="name"
    @update:options="updateOptions"
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
const itemsPerPage = ref(10);
const totalItems = ref(0);
const tryAgain = ref(false);

const headers = ref([
  { title: "Frota", key: "vehicleId" as const },
  { title: "Operação", key: "operationName" as const },
  { title: "Divisão", key: "divisionName" as const },
  { title: "Placa", key: "licensePlate" as const },
  { title: "Hodômetro", key: "odometerKm" as const },
  { title: "Velocidade", key: "speed" as const },
  { title: "Status Veículo", key: "moving" as const },
  { title: "Status Ignição", key: "ignitionStatus" as const },
  { title: "Motorista", key: "driverName" as const },
  { title: "Data Processamento", key: "dateProcess" as const },
]);

onMounted(() => {
  getVehiclesData();
});

function getVehiclesData() {
  isLoadingVehicles.value = true;

  vehicleTrackerStore
    .getVehiclesData({
      startDate: "2025-10-20T20:00Z",
      endDate: "2025-10-29T20:00Z",
      page: 1,
      rows: 10,
    })
    .then((res) => {
      totalItems.value = res.totalItems;
    })
    .catch(() => (tryAgain.value = true))
    .finally(() => (isLoadingVehicles.value = false));
}

function updateOptions(e: unknown) {
  console.log(JSON.stringify(e));
}
</script>
