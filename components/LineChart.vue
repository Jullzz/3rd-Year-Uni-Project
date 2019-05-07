<template>
  <div v-if="bike != null" class="container">
    <line-chart :chart-data="datacollection" class="chart" />
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
      var sum = [];
      var ped = this.pedestrian;
      this.bike.forEach((num, index) => {
        sum.push(num + ped[index]);
      });
      return sum;
    }
  },
  beforeUpdate() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: ["1pm", "2pm", "3pm", "4pm", "5pm", "6pm"],
        datasets: [
          {
            label: "Bike",
            borderColor: "#E66A6A",
            pointBackgroundColor: "#E66A6A",
            pointRadius: 5,
            pointHoverBackgroundColor: "#E66A6A",
            pointHoverRadius: 7,
            data: this.bike
          },
          {
            label: "Pedestrian",
            borderColor: "#8662C7",
            pointBackgroundColor: "#8662C7",
            pointRadius: 5,
            pointHoverBackgroundColor: "#8662C7",
            pointHoverRadius: 7,
            data: this.pedestrian
          },
          {
            label: "Total",
            borderColor: "#7BC47F",
            pointBackgroundColor: "#7BC47F",
            pointRadius: 5,
            pointHoverBackgroundColor: "#7BC47F",
            pointHoverRadius: 7,
            data: this.total
          }
        ]
      };
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 100%;
}
.chart {
  width: 100%;
  height: 400px;
}
</style>