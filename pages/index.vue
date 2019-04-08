<template>
  <div class="w-full h-full" id="main" >
    <Map class="w-full" :pointUpdate="updateActivePoint" ></Map>
    <h1 v-if="activePoint === null">No point selected</h1>
    <h1 v-else>{{activePoint}}</h1>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Map from '~/components/Map.vue'

export default {
  components: {
    Logo,
    Map
  },
  data() {
    return {
      activePoint: null
    }
  },
  methods: {
    updateActivePoint(newPoint) {
      this.activePoint = newPoint
    }
  }
}
</script>
<style>
html, body, #__nuxt, #__layout {
  height: 100%;
}
</style>