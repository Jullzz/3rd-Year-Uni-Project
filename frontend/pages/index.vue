<template>
  <div class="w-full h-full" id="main">
    <div>
      <NavBar />
    </div>
    <!-- map display -->
    <Map class="w-full" :pointUpdate="updateActivePoint" :dataPoints="map" />
    <div style="width: 100%">
      <!-- ChoiceBox-->
      <h1 style="float: left;">
        Location: {{ this.childData.data }}
        <ChoiceBox :dataTitle="title" :data="childData" />
      </h1>
      <h1 style="float: right;">
        Duration: {{ this.time.data
        }}<ChoiceBox :dataTitle="timeArray" :data="time" />
      </h1>
    </div>
    <div>
      <!-- doughnut chart display... accepting to prop data. One for charts the other for direction-->
      <DoughnutCharts :DirectionV="direction" />
    </div>
    <div class="mt-10">
      <!-- linechart display -->
      <LineChart :bike="bike" :pedestrian="pedestrian" :label="time" />
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

import axios from "axios";

const baseUrl = "http://localhost:3000/";

export default {
  components: {
    Logo,
    Map,
    DoughnutCharts,
    LineChart,
    NavBar,
    ChoiceBox
  },
  async asyncData({ $axios, error }) {
    let url = baseUrl + "mapping";
    console.log(url);
    try {
      const { data } = await $axios.get(url);
      return {
        map: data
      };
    } catch (e) {
      error({
        statusCode: 503,
        message: "Unable to fetch events at this time. Plaese try again."
      });
    }
  },

  data() {
    return {
      activePoint: null,
      hits: null,
      bike: null,
      locationTitle: null,
      content: null,
      pedestrian: null,
      selectedLocation: null,
      direction: null,
      title: [],
      childData: { data: "No Location Selected" },
      chilDataComparator: "No Location Selected",
      timeArray: [
        { value: "Hourly", label: "Hourly" },
        { value: "Daily", label: "Daily" },
        { value: "Weekly", label: "Weekly" },
        { value: "Monthly", label: "Monthly" },
        { value: "Yearly", label: "Yearly" }
      ],
      time: { data: "Hourly" },
      timeComparator: "Hourly",
      markerSelected: false
    };
  },
  mounted() {
    this.CBoxTitle(this.map);
  },
  beforeUpdate() {
    if (this.markerSelected === true) {
      this.choiceboxCheck(this.childData.data);
      this.markerSelected = false;
    } else if (this.childData.data !== this.chilDataComparator) {
      this.choiceboxCheck(this.childData.data);
      this.chilDataComparator = this.childData.data;
    }
    if (this.timeComparator !== this.time.data) {
      this.timeUpdate(this.time.data);
      this.timeComparator = this.time.data;
    }
  },
  methods: {
    async locationMapping() {
      let url = baseUrl + "Hourly" + this.locationTitle.replace(" ", "_");
      console.log(url);
      try {
        let response = await axios.get(url);
        this.updateByLocation(response.data);
      } catch (err) {
        console.log(err);
      }
    },
    async timeUpdate(newPoint) {
      let url = baseUrl + newPoint + this.locationTitle.replace(" ", "_");
      console.log(url);
      try {
        let response = await axios.get(url);
        this.updateByTime(response.data);
      } catch (err) {
        console.log(err);
      }
    },
    updateActivePoint(newPoint) {
      this.choiceboxCheck(newPoint.title);
      this.childData.data = newPoint.title;
    },
    updateByLocation(newPoint) {
      //console.log(newPoint);
      //console.log("test");
      this.direction = newPoint.direction;

      this.pedestrian = newPoint.direction.pedestrian;
      this.bike = newPoint.direction.bike;
      console.log();
    },
    updateByTime(newPoint) {
      this.pedestrian = newPoint.direction.pedestrian;
      this.bike = newPoint.direction.bike;
    },
    CBoxTitle(data) {
      let arr = [];
      data.forEach((item, index) => {
        let obj = {
          value: item.title,
          label: item.title
        };
        arr.push(obj);
      });
      this.title = arr;
    },
    choiceboxCheck(title) {
      for (let i = 0; i < this.map.length; i++) {
        if (this.map[i].title === title) {
          this.locationTitle = title;
          this.locationMapping();
          this.markerSelected = true;
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
</style>