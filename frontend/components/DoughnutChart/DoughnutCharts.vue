<template>
<<<<<<< HEAD
  <div>
    <div v-if="DirectionV != null" align="center">
=======
  <div >
    <div v-if="Hits != null" align="center">
>>>>>>> Flask-branch
      <div class="container">
        <!-- display the direction of the CYCLIST -->
        <div class="direction_left">
          <div class="container">
            <!-- static images used.. located in assest folder -->
            <img src="~/assets/images/bike2.png" class="cyclist" />
            <Direction
              align="center"
              class="direction"
              :Direction="direction_bike"
              title="Cyclists"
            />
          </div>
        </div>
        <!-- Displays the doughnut chart -->
        <div class="doughnut_chart">
          <!-- Tota hits to be show for UI ease -->
          <h2 class="title" id="total">{{ total }} Total Counts</h2>
          <DoughnutChart :chart-data="datacollection" />
        </div>
        <!-- display the direction of the PEDESTRIAN -->
        <div class="direction_right mb-8">
          <div class="container">
            <Direction
              align="center"
              class="direction"
              :Direction="direction_pes"
              title="Pedestrians"
            />
            <!-- static images used.. located in assest folder -->
            <img src="~/assets/images/Pedestrian.png" class="cyclist" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DoughnutChart from "~/components/DoughnutChart/DoughnutChart.js";
import Direction from "~/components/Direction/Direction.vue";

export default {
  props: {
    DirectionV: null
  },
  components: {
    DoughnutChart,
    Direction
  },
  data() {
    return {
      bike: null,
      pedestrian: null,
      total: null,
      datacollection: null,
      direction_bike: null,
      direction_pes: null
    };
  },
  beforeUpdate() {
    //function will be called to update data before rerendering page
    this.updateEvent(this.DirectionV);
    this.fillData();
  },
  methods: {
    // Data from parent pages will be locally initialised on local variables
    updateEvent(newPoint) {
      // Calculating total Cyclist and Pedestrians
      // Data retreived from aprrents is an array
      this.bike = this.totalCal(newPoint.bike.east, newPoint.bike.west);
      this.pedestrian = this.totalCal(
        newPoint.pedestrian.east,
        newPoint.pedestrian.west
      );
      // Calculating total
      this.total = this.bike + this.pedestrian;
      // Initialise data to pass to child component
      this.direction_bike = newPoint.bike;
      this.direction_pes = newPoint.pedestrian;
    },
    // Func to calculate total in an array
    totalCal(arr1, arr2) {
      var sum = 0;
      arr1.forEach((num, index) => {
        sum = sum + num + arr2[index];
      });
      return sum;
    },
    //data will be passed into a doughnut chart js file to render the chart
    //with provided data selected by user
    fillData() {
      this.datacollection = {
        labels: ["pedestrian", "cyclist"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            backgroundColor: ["#7BC47F", "#207227"],
            borderColor: "#05400A",
            borderWidth: 2,
            hoverBackgroundColor: ["#C1EAC5", "#05400A"],
            hoverBorderColor: "#207227",
            //Prop data array passed in doughnut js file
            data: [this.bike, this.pedestrian]
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
.title {
  margin-top: 10px;
  font-size: 3vw;
}
.direction_left,
.direction_right {
  /* margin: auto; */
  width: 37.5%;
  float: left;
  padding: 10px;
  padding-top: 20vh;
}
.direction {
  width: 60%;
  float: left;
}
.cyclist {
  width: 40%;
  float: left;
  padding-top: 5vh;
}
.doughnut_chart {
  width: 25%;
  float: left;
}
</style>