now = new Date()
past = new Date('2018-07-01')

Vue.component('experience', {
  template: `
    <div class="resume-item d-flex flex-column flex-md-row mb-5">
      <div class="resume-content mr-auto">
        <h3 class="mb-0">{{title}}</h3>
        <div class="subheading">{{company}}</div>
        <p>{{description}}</p>
      </div>
      <div class="resume-date text-md-right">
        <span class="text-primary">{{timeline}} {{duration?'('+duration+')':''}}</span>
      </div>
    </div>
  `,
  props: {
    title: { required: true },
    company: { required: true },
    description: { required: true },
    timeline: { required: true },
    duration: { required: true },
  },
})

Vue.component('skills', {
  template: `
    <div>
      <div class="subheading mb-3">{{title}}</div>
      <ul class="list-inline list-icons">
        <li v-for="skill in skills" class="list-inline-item">
          <i :class="skill.icon"></i>
        </li>
      </ul>
      <div>
          <slot></slot>
      </div>
    </div>
  `,
  props: {
    title: { required: true },
  },
  data() {
    return { skills: [] }
  },
  created() {
    this.skills = this.$children
  },
})

Vue.component('skill', {
  template: `
    <div><slot></slot></div>
  `,

  props: {
    icon: { required: true },
  },
})

Vue.component('projects', {
  template: `
    <div>
      <div v-for="project in projects" class="card" style="width: 18rem;">
        <img v-bind:src="'img/' + project.image" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">{{project.title}}</h5>
          <p class="card-text">{{project.description}}</p>
          <a :href="'#' + project.href" class="btn btn-primary btn-block">{{project.href}}</a>
        </div>
      </div>
      <div>
          <slot></slot>
      </div>
    </div>
  `,
  data() {
    return { projects: [] }
  },
  created() {
    this.projects = this.$children
  },
})

Vue.component('project', {
  template: `
    <div><slot></slot></div>
  `,

  props: {
    title: { required: true },
    description: { required: true },
    href: { required: true },
    image: { required: true },
  },
})

new Vue({
  el: '#root',
})
