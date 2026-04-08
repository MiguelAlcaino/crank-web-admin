<template>
  <div class="row matrixSpotsLegend">
    <div class="col-3" style="text-align: center">
      <div class="unpaid-square"></div>
      <br />
      <small>Unpaid</small>
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
      <span class="badge" style="background-color: green; color: white">B</span>
      <br />
      <small>User Birthday</small>
    </div>
    <div class="col-3" style="text-align: center">
      <span class="badge" style="background-color: red; color: white">L</span>
      <br />
      <small>Leaderboard</small>
    </div>
    <div class="col-3" style="text-align: center">
      <span class="badge" style="background-color: #ff00ff; color: white">C</span>
      <br />
      <small>Class Pass</small>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.matrixSpotsLegend {
  padding-top: 50px;
  background-color: var(--cal-container-bg, var(--bs-body-bg));
  min-height: 20px;
  box-shadow: 0 0 4px 0 var(--cal-shadow, var(--bs-border-color));
  padding: 30px;
  font-family: 'Avenir', sans-serif;
  color: var(--bs-body-color);
}

hr {
  border: none;
  height: 2px;
  max-width: 20px;
}

.unpaid-square {
  width: 20px;
  height: 20px;
  background-color: #ffd903;
  display: inline-block;
  margin-bottom: 3px;
}
</style>
