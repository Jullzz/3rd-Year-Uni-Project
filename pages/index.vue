<template>
  <div class="w-full h-full" id="main">
    <!-- map display -->
    <Map class="w-full" :pointUpdate="updateActivePoint"></Map>
    <!-- Upon empty location... such is displayed-->
    <h1 v-if="activePoint === null">No point selected</h1>
    <h1 v-else>{{ activePoint }}</h1>
    <div>
      <!-- doughnut chart display... accepting to prop data. One for charts the other for direction-->
      <DoughnutCharts :Hits="hits" :DirectionV="direction" />
    </div>
    <div class="mt-10">
      <!-- linechart display -->
      <LineChart :bike="bike" :pedestrian="pedestrian" />
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import Map from "~/components/Map.vue";
import DoughnutCharts from "@/components/DoughnutChart/DoughnutCharts.vue";
import LineChart from "~/components/LineChart/LineChart.vue";

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
      hits: null,
      bike: null,
      pedestrian: null,
      direction: null
    };
  },
  methods: {
    //declaring data needed for components to display charts
    //TODO prop data clean-up
    updateActivePoint(newPoint) {
      this.activePoint = newPoint.title;
      this.hits = newPoint.counts;
      this.bike = newPoint.bike;
      this.pedestrian = newPoint.pedestrian;
      this.direction = newPoint.direction;
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