<script setup>
defineProps({
  items: { type: Array, required: true },
})
</script>

<template>
  <section class="resume-section p-3 p-lg-5 d-flex flex-column" id="projects">
    <div class="my-auto">
      <h2 class="mb-5">Projects</h2>
      <div class="row">
        <div class="column">
          <ul class="fa-ul mb-0">
            <li v-for="(project, index) in items" :key="`${project.title}-${index}`">
              <i class="fa-li fa fa-archive"></i> {{ project.title }} <br />
              <small>{{ project.stack }}</small>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
