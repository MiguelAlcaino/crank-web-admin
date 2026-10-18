<script setup lang="ts">
/*
 * Marks a payment-link sale in the transactions list and detail. Such a sale has no customer
 * account: the name and email are what the payer typed on the payment link. The payment link's
 * title, when the backend has it, is the tooltip.
 */
defineProps<{
  title?: string | null
}>()
</script>

<template>
  <span class="badge text-bg-info" :title="title || undefined" data-test="payment-link-badge">
    Payment link
  </span>
</template>
