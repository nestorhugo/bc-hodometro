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
</template>

<script setup lang="ts">
import { useVehicleTrackerStore } from "@/stores/vehicleTrackerStore";
import { ref } from "vue";

const vehicleTrackerStore = useVehicleTrackerStore();
const isLoadingVehicles = ref(false);

onMounted(() => {
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
    .finally(() => (isLoadingVehicles.value = false));
});

const itemsPerPage = ref(10);
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
const totalItems = ref(0);

function updateOptions(e: unknown) {
  console.log(JSON.stringify(e));
}
</script>
