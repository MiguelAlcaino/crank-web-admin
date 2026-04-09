<template>
  <div class="matrixSpotsLegend">
    <div class="legend-grid">
      <div class="legend-item">
        <div class="legend-icon"><div class="unpaid-square"></div></div>
        <small>Unpaid</small>
      </div>
      <div class="legend-item">
        <div class="legend-icon"><div class="color-line" style="background-color: #8a00e7"></div></div>
        <small>Spot With Stats</small>
      </div>
      <div class="legend-item">
        <div class="legend-icon"><div class="color-line" style="background-color: #ff7e62"></div></div>
        <small>Spot Without Stats</small>
      </div>
      <div class="legend-item">
        <div class="legend-icon"><div class="color-line" style="background-color: #00b9ff"></div></div>
        <small>First Time In Class</small>
      </div>
      <div class="legend-item">
        <div class="legend-icon"><div class="color-line" style="background-color: #add8e6"></div></div>
        <small>First Time Instructor</small>
      </div>
      <div class="legend-item">
        <div class="legend-icon">
          <span class="badge" style="background-color: green; color: white">B</span>
        </div>
        <small>User Birthday</small>
      </div>
      <div class="legend-item">
        <div class="legend-icon">
          <span class="badge" style="background-color: red; color: white">L</span>
        </div>
        <small>Leaderboard</small>
      </div>
      <div class="legend-item">
        <div class="legend-icon">
          <span class="badge" style="background-color: #ff00ff; color: white">C</span>
        </div>
        <small>Class Pass</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.matrixSpotsLegend {
  background-color: var(--cal-container-bg, var(--bs-body-bg));
  box-shadow: 0 0 4px 0 var(--cal-shadow, var(--bs-border-color));
  padding: 20px 30px;
  font-family: 'Avenir', sans-serif;
  color: var(--bs-body-color);
}

.legend-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 0;
}

.legend-item {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.legend-icon {
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
}

.color-line {
  width: 24px;
  height: 3px;
}

.unpaid-square {
  width: 20px;
  height: 20px;
  background-color: #ffd903;
}
</style>
