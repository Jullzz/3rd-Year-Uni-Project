<template>
  <div class="w-full h-full" id="main">
    <Map class="w-full" :pointUpdate="updateActivePoint"></Map>
    <h1 v-if="activePoint === null">No point selected</h1>
    <h1 v-else>{{ activePoint }}</h1>
  </div>
  <div>
    <DoughnutChart :chartdata="chartdata" :options="options" />
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import Map from "~/components/Map.vue";
import DoughnutChart from "@/components/DoughnutChart.vue";

export default {
  components: {
    Logo,
    Map,
    DoughnutChart
  },
  data() {
    return {
      activePoint: null,
      options: {
        responsive: true,
        mainatainAspectRatio: false
      },
      chartdata: {
        labels: ["Jan", "Feb", "Mar"],
        datasets: [
          {
            label: "my activity",
            backgroundColor: "#dd4b39",
            data: [40, 50, 10]
          }
        ]
      }
    };
  },
  methods: {
    updateActivePoint(newPoint) {
      this.activePoint = newPoint;
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