<script setup lang="ts"></script>

<template>
  <div class="row matrixSpotsLegend">
    <div class="col-4 text-center">
      <hr class="hrNotPaid" />
      <small>Not Paid</small>
    </div>
    <div class="col-4 text-center">
      <hr class="hrWithStats" />
      <small>Spot With Stats</small>
    </div>
    <div class="col-4 text-center">
      <hr class="hrWithoutStats" />
      <small>Spot Without Stats</small>
    </div>
  </div>
</template>

<style scoped>
.matrixSpotsLegend {
  padding-top: 50px;
  background-color: #f8f8f8;
  min-height: 20px;
  box-shadow: 0 0 2px 0 #888;
  padding: 30px;
  font-family: 'Avenir', sans-serif;
}

hr {
  border: none;
  height: 2px;
  max-width: 20px;
}

.hrNotPaid {
  background-color: #ffd903;
}

.hrWithStats {
  background-color: #8a00e7;
}

.hrWithoutStats {
  background-color: #ff7e62;
}
</style>
