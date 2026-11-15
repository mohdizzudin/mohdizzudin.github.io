<script setup>
import ExperienceItem from './ExperienceItem.vue'

defineProps({
  items: { type: Array, required: true },
})
</script>

<template>
  <section class="resume-section p-3 p-lg-5 d-flex flex-column" id="education">
    <div class="my-auto">
      <h2 class="mb-5">Education</h2>
      <ExperienceItem
        v-for="(item, index) in items"
        :key="`${item.company}-${item.title}-${index}`"
        :title="item.title"
        :company="item.company"
        :description="item.description"
        :start="item.start"
        :end="item.end"
        year-only
        :show-duration="false"
      />
    </div>
  </section>
</template>
