<script setup lang="ts">
import { PositionIconEnum } from '@/modules/shared/interfaces'

defineProps<{
  icon: PositionIconEnum
}>()
</script>

<template>
  <i v-if="icon == PositionIconEnum.BikeSpot" class="bi bi-bicycle"></i>
  <img
    v-else-if="icon == PositionIconEnum.BenchSpot"
    src="@/assets/icons/bench_icon.png"
    alt="bench_icon"
    height="10"
    style="margin-bottom: 5px"
  />
  <div v-else></div>
</template>

<style lang="css" scoped></style>
