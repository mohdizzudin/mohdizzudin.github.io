<script setup>
defineProps({
  icon: { type: String, required: true },
})
</script>

<template>
  <li class="list-inline-item">
    <i :class="icon"></i>
  </li>
</template>
