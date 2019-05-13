<template>
  <div>
    <div v-if="Event != null" align="center">
      <div class="container" style="max-width: 100%">
        <div class="direction_left">
          <div class="container" style="max-width: 100%;">
            <img src="~/assets/images/Bicycle.png" class="cyclist" />
            <Direction
              align="center"
              class="direction"
              :Direction="direction_bike"
            />
          </div>
        </div>

        <div class="doughnut_chart">
          <h2 class="title">{{ total }} Hits</h2>
          <DoughnutChart :chart-data="datacollection" />
        </div>

        <div class="direction_right">
          <div class="container" style="max-width: 100%;">
            <Direction
              align="center"
              class="direction"
              :Direction="direction_pes"
            />
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
    Event: null,
    DirectionV: null
  },
  components: {
    DoughnutChart,
    Direction
  },
  data() {
    return {
      bike: 1,
      pedestrian: 1,
      total: 0,
      datacollection: null,
      direction_bike: null,
      direction_pes: null
    };
  },
  beforeUpdate() {
    this.updateEvent(this.Event, this.DirectionV);
    this.fillData();
  },
  methods: {
    updateEvent(newPoint, direction) {
      this.bike = newPoint.bike;
      this.pedestrian = newPoint.pedestrian;
      this.total = newPoint.bike + newPoint.pedestrian;
      this.direction_bike = direction.bike;
      this.direction_pes = direction.pedestrian;
    },
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
            //hoverBorderColor: "rgba(255,99,132,1)",
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
  margin-top: 10px;
  font-size: 4vw;
}
.direction_left,
.direction_right {
  margin: auto;
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