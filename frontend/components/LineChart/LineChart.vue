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
    pedestrian: null,
    label: { data: "" }
  },
  data() {
    return {
      datacollection: null,
      Bike: null,
      Pedestrian: null,
      Labels: ["1pm", "2pm", "3pm", "4pm", "5pm", "6pm"]
    };
  },
  computed: {
    //Calculate and create a new array with the total hits every hour
    total() {
      var sum = [];
      var ped = this.Pedestrian;
      this.Bike.forEach((num, index) => {
        sum.push(num + ped[index]);
      });
      return sum;
    }
  },
  beforeUpdate() {
    // calls func to get total hits array
    this.totalCal();
    //chart data to be update before upadting the page
    this.fillData();
  },
  methods: {
    // Func fro dyanamic labeling depending on the duration selected
    labelCheck() {/*
      if (this.label.data === "Hours") {
        this.Labels = ["", "2pm", "3pm", "4pm", "5pm", "6pm","","","","","","","",""];
      } else if (this.label.data === "Daily") {
        this.Labels = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ];
      } else if (this.label.data === "Weeks") {
        this.Labels = [
          "Week 1",
          "Week 2",
          "Week 3",
          "Week 4",
          "Week 5",
          "Week 6"
        ];
      } else if (this.label.data === "Months") {
        this.Labels = ["January", "February", "March", "April", "May", "June"];
      }*/
	this.Labels = [
	   "15 " +this.label.data + " ago",
           "14 " +this.label.data + " ago",
           "13 " +this.label.data + " ago",
           "12 " +this.label.data + " ago",
           "11 " +this.label.data + " ago",
           "10 " +this.label.data + " ago",
           "9 " +this.label.data + " ago",
           "8 " +this.label.data + " ago",
           "7 " +this.label.data + " ago",
           "6 " +this.label.data + " ago",
           "5 " +this.label.data + " ago",
           "4 " +this.label.data + " ago",
           "3 " +this.label.data + " ago",
           "2 " +this.label.data + " ago",
           "1 " +this.label.data + " ago"];
    },
    // combine east and west array received from parrent
    totalCal() {
      var sumB = [];
      var sumP = [];
      var bikeW = this.bike.West;
      var bikeE = this.bike.East;
      var pedW = this.pedestrian.West;
      var pedE = this.pedestrian.East;
      // array for bike
      bikeW.forEach((num, index) => {
        sumB.push(num + bikeE[index]);
      });
      this.Bike = sumB;
      //array for pedestrian
      pedW.forEach((num, index) => {
        sumP.push(num + pedE[index]);
        this.Pedestrian = sumP;
      });
    },
    //create the data for the chart with some sytles
    fillData() {
      this.labelCheck();
      this.datacollection = {
        labels: this.Labels,
        datasets: [
          {
            label: "Bike",
            borderColor: "#E66A6A",
            pointBackgroundColor: "#E66A6A",
            pointRadius: 5,
            pointHoverBackgroundColor: "#E66A6A",
            pointHoverRadius: 7,
            //data array for the bike
            data: this.Bike
          },
          {
            label: "Pedestrian",
            borderColor: "#8662C7",
            pointBackgroundColor: "#8662C7",
            pointRadius: 5,
            pointHoverBackgroundColor: "#8662C7",
            pointHoverRadius: 7,
            //data array for the pedestrian
            data: this.Pedestrian
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
