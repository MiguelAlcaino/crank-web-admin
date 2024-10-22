<template>
  <div class="row matrixSpotsLegend">
    <div class="col-3" style="text-align: center">
      <hr style="background-color: #ffd903" />
      <small>Not Paid</small>
    </div>
    <div class="col-3" style="text-align: center">
      <hr style="background-color: #8a00e7" />
      <small>Spot With Stats</small>
    </div>
    <div class="col-3" style="text-align: center">
      <hr style="background-color: #ff7e62" />
      <small>Spot Without Stats</small>
    </div>
    <div class="col-3" style="text-align: center">
      <hr style="background-color: #00b9ff" />
      <small>First Time In Class</small>
    </div>

    <div class="col-3" style="text-align: center">
      <hr style="background-color: #add8e6" />
      <small>First Time Instructor</small>
    </div>
    <div class="col-3" style="text-align: center">
      <hr style="background-color: #32cd32" />
      <small>User Birthday</small>
    </div>
    <div class="col-3" style="text-align: center">
      <hr style="background-color: #008000" />
      <small>Leaderboard</small>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
</style>
