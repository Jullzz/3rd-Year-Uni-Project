<template>
  <div class="w-full h-full" id="main">
    <div>
      <NavBar />
    </div>
    <!-- map display -->
    <Map
      class="w-full shadow shadow-lg"
      :pointUpdate="updateActivePoint"
      :dataPoints="dataPoints"
    />

    <!-- Time and point selection boxes -->
    <div class="my-4 w-full h-10">
      <!-- ChoiceBox-->
      <div class="inline-block pl-8">
        <h3 class="inline">
          Location: 
        </h3>
        <ChoiceBox class="inline" :dataTitle="title" :data="childData" />
      </div>
      <div class="float-right pr-8">
        <h3 class="inline">
          Duration: 
        </h3>
        <ChoiceBox class="inline" :dataTitle="timeArray" :data="time" />
      </div>
    </div>
    <!-- End selection boxes -->

    <div id="dataContainer">
      <!-- Title -->
      <div class="w-full text-center text-green-800">
        <h1 id="active-title">{{ activePoint }}</h1>
      </div>

      <!-- doughnut chart display... accepting to prop data. One for charts the other for direction-->
      <div id="doughnutContainer">
        <DoughnutCharts :Hits="hits" :DirectionV="direction" />
      </div>

      <!-- linechart display -->
      <div id="lineContainer" class="mt-10">
        <LineChart :bike="bike" :pedestrian="pedestrian" />
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import Map from "~/components/Map.vue";
import DoughnutCharts from "@/components/DoughnutChart/DoughnutCharts.vue";
import LineChart from "~/components/LineChart/LineChart.vue";
import NavBar from "~/components/NavBar/NavBar.vue";
import ChoiceBox from "~/components/ChoiceBox.vue";

export default {
  components: {
    Logo,
    Map,
    DoughnutCharts,
    LineChart,
    NavBar,
    ChoiceBox
  },
  data() {
    return {
      chilDataComparator: "No Location Selected",
      activePoint: null,
      hits: null,
      bike: null,
      pedestrian: null,
      direction: null,
      title: [
        { label: "Rosalind 1", value: "Rosalind 1" },
        { label: "Rosalind 2", value: "Rosalind 2" }
      ],
      childData: { data: "No Location Selected" },
      timeArray: [
        { value: "Hourly", label: "Hourly" },
        { value: "Daily", label: "Daily" },
        { value: "Weekly", label: "Weekly" },
        { value: "Monthly", label: "Monthly" },
        { value: "Yearly", label: "Yearly" }
      ],
      time: { data: "Hourly" },
      dataPoints: [
        // Fake test data
        {
          title: "Rosalind 1",
          counts: { bike: 264, pedestrian: 23 },
          bike: [10, 20, 40, 30, 50, 60],
          pedestrian: [1, 5, 6, 40, 60, 10],
          location: { lat: -36.757234, lng: 144.279113 },
          direction: {
            bike: {
              west: 100,
              east: 164
            },
            pedestrian: {
              west: 10,
              east: 13
            }
          }
        },
        {
          title: "Rosalind 2",
          counts: { bike: 100, pedestrian: 241 },
          bike: [10, 20, 20, 30, 40, 30],
          pedestrian: [1, 5, 6, 40, 60, 10],
          location: { lat: -36.748794, lng: 144.290756 },
          direction: {
            bike: {
              west: 40,
              east: 60
            },
            pedestrian: {
              west: 100,
              east: 141
            }
          }
        }
      ]
    };
  },
  watch: {
    'childData.data': function(val) {
        if (this.childData.data !== this.chilDataComparator) {
          this.choiceboxCheck(this.childData.data);
          this.chilDataComparator = this.childData.data;
        }
    }
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
      this.childData.data = newPoint.title;
    },
    choiceboxCheck(title) {
      for (let i = 0; i < this.dataPoints.length; i++) {
        if (this.dataPoints[i].title === title) {
          this.updateActivePoint(this.dataPoints[i]);
        }
      }
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
.act {
  font-size: 2vw;
  font-weight: bold;
}

#active-title {
  font-size: 4.5em;
}
</style>