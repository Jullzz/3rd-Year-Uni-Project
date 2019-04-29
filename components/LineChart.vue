<template>
  <div v-if="bike != null">
    <line-chart :chart-data="datacollection" />
  </div>
</template>

<script>
import LineChart from "@/components/LineChart.js";

export default {
  components: {
    LineChart
  },
  props: {
    bike: null,
    pedestrian: null
  },
  data() {
    return {
      datacollection: null
    };
  },
  computed: {
    total: function() {
      var sum = []
      var ped = this.pedestrian
      this.bike.forEach((num, index) => {
        sum.push(num + ped[index])
      });
      return sum
    }
  },
  beforeUpdate() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: ["1pm", "2pm", "3pm", "4pm", "5pm"],
        datasets: [
          {
            label: "Bike",
            borderColor: "#f87979",
            data: this.bike
          },
          {
            label: "Pedestrian",
            borderColor: "#5bf8bf",
            data: this.pedestrian
          },
          {
            label: "Total",
            borderColor: "black",
            data: this.total
          }
        ]
      };
    }
  }
};
</script>

<style scoped>
</style>