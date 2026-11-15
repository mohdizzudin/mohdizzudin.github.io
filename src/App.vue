<script setup>
import { onMounted } from 'vue'
import profile from './data/profile.json'
import experience from './data/experience.json'
import education from './data/education.json'
import skills from './data/skills.json'
import projects from './data/projects.json'

import SideNav from './components/SideNav.vue'
import AboutSection from './components/AboutSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import EducationSection from './components/EducationSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'

onMounted(() => {
  if (typeof window.initResume === 'function') {
    window.initResume()
  }
})
</script>

<template>
  <SideNav :image="profile.image" :nav="profile.nav" />

  <div class="container-fluid p-0" data-bs-spy="scroll" data-bs-target="#sideNav">
    <AboutSection
      :first-name="profile.firstName"
      :last-name="profile.lastName"
      :email="profile.email"
      :social="profile.social"
    />
    <ExperienceSection :items="experience" />
    <EducationSection :items="education" />
    <SkillsSection :columns="skills.columns" :third-party="skills.thirdParty" />
    <ProjectsSection :items="projects" />
  </div>
</template>
