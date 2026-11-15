<script setup>
import SkillGroup from './SkillGroup.vue'

defineProps({
  columns: { type: Array, required: true },
  thirdParty: { type: Object, required: true },
})
</script>

<template>
  <section class="resume-section p-3 p-lg-5 d-flex flex-column" id="skills">
    <div class="my-auto">
      <h2 class="mb-5">Skills</h2>
      <div class="row">
        <div v-for="(column, columnIndex) in columns" :key="columnIndex" class="column">
          <SkillGroup
            v-for="(group, groupIndex) in column.groups"
            :key="`${group.title}-${groupIndex}`"
            :title="group.title"
            :icons="group.icons"
            :break-after="group.breakAfter || null"
          />
        </div>
      </div>

      <div class="subheading mb-3">{{ thirdParty.title }}</div>
      <ul class="fa-ul mb-0">
        <li v-for="item in thirdParty.items" :key="item">
          <i class="fa-li fa fa-cog"></i> {{ item }}
        </li>
      </ul>
    </div>
  </section>
</template>
