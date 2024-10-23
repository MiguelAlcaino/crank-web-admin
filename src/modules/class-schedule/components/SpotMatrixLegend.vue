<template>
  <div class="row matrixSpotsLegend">
    <div class="col-3" style="text-align: center">
      <div class="yellow-square"></div>
      <br>
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
      <span class="badge badge-success">B</span>
      <br>
      <small>User Birthday</small>
    </div>
    <div class="col-3" style="text-align: center">
      <span class="badge badge-danger">L</span>
      <br>
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

.yellow-square {
  width: 20px;
  height: 20px;
  background-color: #ffd903;
  display: inline-block;
  margin-bottom: 3px;
}
</style>
