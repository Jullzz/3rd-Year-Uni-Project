<template>
  <div v-if="bike != null" class="container w-full text-center">
    <h1 class="text-base text-5xl text-green-800">Path Use Over Time</h1>
    <!-- data is passed through to display the linechart-->
    <line-chart :chart-data="datacollection" class="chart" />
  </div>
</template>

<script>
import LineChart from "@/components/LineChart/LineChart.js";

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
    //Calculate and create a new array with the total hits every hour
    total() {
      var sum = [];
      var ped = this.pedestrian;
      this.bike.forEach((num, index) => {
        sum.push(num + ped[index]);
      });
      return sum;
    }
  },
  beforeUpdate() {
    //chart data to be update before upadting the page
    this.fillData();
  },
  methods: {
    //create the data for the chart with some sytles
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
            //data array for the bike
            data: this.bike
          },
          {
            label: "Pedestrian",
            borderColor: "#8662C7",
            pointBackgroundColor: "#8662C7",
            pointRadius: 5,
            pointHoverBackgroundColor: "#8662C7",
            pointHoverRadius: 7,
            //data array for the pedestrian
            data: this.pedestrian
          },
          {
            label: "Total",
            borderColor: "#7BC47F",
            pointBackgroundColor: "#7BC47F",
            pointRadius: 5,
            pointHoverBackgroundColor: "#7BC47F",
            pointHoverRadius: 7,
            //data array for the total hits
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
/* #line-title {
  font-size: 3rem
} */
</style>