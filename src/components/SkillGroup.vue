<script setup>
import SkillIcon from './SkillIcon.vue'

defineProps({
  title: { type: String, required: true },
  icons: { type: Array, required: true },
  breakAfter: { type: Number, default: null },
})
</script>

<template>
  <div>
    <div class="subheading mb-3">{{ title }}</div>
    <ul class="list-inline list-icons">
      <template v-for="(icon, index) in icons" :key="`${icon}-${index}`">
        <SkillIcon :icon="icon" />
        <br v-if="breakAfter && index + 1 === breakAfter" />
      </template>
    </ul>
  </div>
</template>
