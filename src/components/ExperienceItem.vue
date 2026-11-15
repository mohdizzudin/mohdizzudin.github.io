<script setup>
import { computed } from 'vue'
import { formatTimeline, formatDuration } from '../utils/duration.js'

const props = defineProps({
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  start: { type: String, default: null },
  end: { type: String, default: null },
  yearOnly: { type: Boolean, default: false },
  showDuration: { type: Boolean, default: true },
})

const timeline = computed(() =>
  formatTimeline(props.start, props.end, { yearOnly: props.yearOnly })
)

const duration = computed(() => {
  if (!props.showDuration) {
    return ''
  }
  return formatDuration(props.start, props.end)
})

const dateLabel = computed(() => {
  if (!duration.value) {
    return timeline.value
  }
  return `${timeline.value} (${duration.value})`
})
</script>

<template>
  <div class="resume-item d-flex flex-column flex-md-row mb-5">
    <div class="resume-content mr-auto">
      <h3 class="mb-0">{{ title }}</h3>
      <div class="subheading">{{ company }}</div>
      <p>{{ description }}</p>
    </div>
    <div class="resume-date text-md-end">
      <span class="text-primary">{{ dateLabel }}</span>
    </div>
  </div>
</template>
