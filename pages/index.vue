<template>
  <div class="w-full h-full" id="main">
    <Map class="w-full" :pointUpdate="updateActivePoint"></Map>
    <h1 v-if="activePoint === null">No point selected</h1>
    <h1 v-else>{{ activePoint }}</h1>
    <div>
      <DoughnutCharts :Event="counts" />
    </div>
    <div class="mt-10">
      <LineChart :bike="bike" :pedestrian="pedestrian" />
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import Map from "~/components/Map.vue";
import DoughnutCharts from "~/components/DoughnutCharts.vue";
import LineChart from "~/components/LineChart.vue";

export default {
  components: {
    Logo,
    Map,
    DoughnutCharts,
    LineChart
  },
  data() {
    return {
      activePoint: null,
      counts: null,
      bike: null,
      pedestrian: null
    };
  },
  methods: {
    updateActivePoint(newPoint) {
      this.activePoint = newPoint.title;
      this.counts = newPoint.counts;
      this.bike = newPoint.bike;
      this.pedestrian = newPoint.pedestrian;
    }
  }
};
</script>
<style>
html,
body,
#__nuxt,
#__layout {
  height: 100%;
}
</style>