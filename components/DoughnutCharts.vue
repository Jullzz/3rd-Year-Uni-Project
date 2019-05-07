<template>
  <div>
    <div v-if="Event != null">
      <div class="container" align="center">
        <div>
          <div class="direction_left">
            <div class="container">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/86/Cycling_%28road%29_pictogram.svg"
                class="cyclist"
              />
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
            <Direction
              align="center"
              class="direction"
              :Direction="direction_pes"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Ic_directions_walk_48px.svg/200px-Ic_directions_walk_48px.svg.png"
              class="cyclist"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DoughnutChart from "@/components/DoughnutChart.js";
import Direction from "~/components/Direction.vue";

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
.container {
  padding-left: 15px;
  max-width: 2000px;
}
.title {
  text-align: center;
  margin-top: 10px;
  font-size: 75px;
}
.direction_left,
.direction_right {
  width: 600px;
  float: left;
}
.direction {
  width: 375px;
  float: left;
}
.cyclist {
  padding-top: 175px;
  width: 200px;
  float: left;
}
.doughnut_chart {
  width: 475px;
  float: left;
  padding-bottom: 30px;
}
</style>