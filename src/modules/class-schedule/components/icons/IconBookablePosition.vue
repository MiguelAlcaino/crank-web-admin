<script setup lang="ts">
import { PositionIconEnum } from '@/modules/shared/interfaces'

defineProps<{
  icon: PositionIconEnum
}>()
</script>

<template>
  <i
    v-if="icon == PositionIconEnum.BikeSpot || icon == PositionIconEnum.Spot"
    class="bi bi-bicycle"
  ></i>
  <img
    v-else-if="icon == PositionIconEnum.BenchSpot"
    src="@/assets/icons/bench_icon.png"
    alt=""
    height="20"
  />
  <div v-else></div>
</template>

<style lang="css" scoped></style>
