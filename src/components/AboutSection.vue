<script setup>
defineProps({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  social: { type: Array, required: true },
})
</script>

<template>
  <section class="resume-section p-3 p-lg-5 d-flex d-column" id="about">
    <div class="my-auto">
      <h1 class="mb-0">
        {{ firstName }}
        <span class="text-primary">{{ lastName }}</span>
      </h1>
      <a :href="`mailto:${email}`">{{ email }}</a>
      <ul class="list-inline list-social-icons mb-0">
        <li v-for="item in social" :key="item.name" class="list-inline-item">
          <a :href="item.url" target="_blank" rel="noopener noreferrer">
            <span class="fa-stack fa-lg">
              <i class="fa fa-circle fa-stack-2x"></i>
              <i class="fa fa-stack-1x fa-inverse" :class="item.icon"></i>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
