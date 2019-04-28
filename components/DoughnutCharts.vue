<template>
  <div>
    <div v-if="Event != null">
      <h2 class="title">{{ total }} Hits</h2>
      <DoughnutChart :chart-data="datacollection" />
    </div>
  </div>
</template>

<script>
import DoughnutChart from "@/components/DoughnutChart.js";

export default {
  props: {
    Event: null
  },
  components: {
    DoughnutChart
  },
  data() {
    return {
      bike: 1,
      pedestrian: 1,
      total: 0,
      datacollection: null
    };
  },
  beforeUpdate() {
    this.updateEvent(this.Event);
    this.fillData();
  },
  methods: {
    updateEvent(newPoint) {
      this.bike = newPoint.bike;
      this.pedestrian = newPoint.pedestrian;
      this.total = newPoint.bike + newPoint.pedestrian;
    },
    fillData() {
      this.datacollection = {
        labels: ["pedestrian", "cyclist"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            backgroundColor: ["red", "blue"],
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 2,
            hoverBackgroundColor: ["green", "yellow"],
            hoverBorderColor: "rgba(255,99,132,1)",
            data: [this.bike, this.pedestrian]
          }
        ]
      };
    }
  }
};
</script>

<style scoped>
.title {
  text-align: center;
  margin-top: 40px;
  font-size: 48px;
}
</style>