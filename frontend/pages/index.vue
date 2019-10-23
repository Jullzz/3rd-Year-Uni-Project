<template>
  <div class="w-full h-full" id="main">
    <div>
      <NavBar />
    </div>
    <!-- map display -->
    <Map
      class="w-full shadow shadow-lg"
      :pointUpdate="updateActivePoint"
      :dataPoints="map"
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
        <DoughnutCharts :DirectionV="direction" />
      </div>

      <!-- linechart display -->
      <div id="lineContainer" class="mt-10">
        <LineChart :bike="bike" :pedestrian="pedestrian" :label="time"/>
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

import axios from "axios";

// Setting a base url used for multiple calls
 const baseUrl = "http://web:8000";

export default {
  components: {
    Logo,
    Map,
    DoughnutCharts,
    LineChart,
    NavBar,
    ChoiceBox
  },
  // Calls in the first set of array to define locations of pathways
  async asyncData({ $axios, error }) {
    let url = "http://ec2-18-188-251-3.us-east-2.compute.amazonaws.com/api/mapping";
    console.log(url);
    try {
      console.log("before await")
      const { data } = await $axios.get(url);
      console.log(data);
      return {
        // Said Array of location will be send to the map component to be displayed
        map: data
      };
    } catch (e) {
      console.log(e)
      error({
        statusCode: 503,
        message: "Unable to fetch events at this time. Plaese try again."
      });
    }
  },

  data() {
    return {
      chilDataComparator: "No Location Selected",
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
    console.log("test");
    this.CBoxTitle(this.map);
  },
  watch:{
       'childData.data': function(val) {
        if (this.childData.data !== this.chilDataComparator) {
          this.choiceboxCheck(this.childData.data);
          this.chilDataComparator = this.childData.data;
        }
      },
      'time.data': function(val) {
          if (this.timeComparator !== this.time.data) {
        // infinite loop prevetion for Time selection call
        this.timeUpdate(this.time.data);
        this.timeComparator = this.time.data;
      }
    }
  },
  methods: {
    // API call to attain location marker to display on maps
    async locationMapping() {
      let url = "http://localhost/api/pullHours/" + this.locationTitle.replace(" ", "_");
      console.log(url);
      try {
        let response = await axios.get(url);
        this.updateByLocation(response.data);
      } catch (err) {
        console.log(err);
      }
    },
    // API call to update duration upon changes
    async timeUpdate(newPoint) {
      let url = "http://localhost/api/pull/" + newPoint + this.locationTitle.replace(" ", "_");
      console.log(url);
      try {
        let response = await axios.get(url);
        this.updateByTime(response.data);
      } catch (err) {
        console.log(err);
      }
    },
    // Checks if  location selected exist
    // Updates choiceBox placeholder
    updateActivePoint(newPoint) {
      this.choiceboxCheck(newPoint.title);
      this.childData.data = newPoint.title;
    },
    // initialize different variables with data to display on charts
    updateByLocation(newPoint) {
      // Data for doughnut chart
      this.direction = newPoint.direction;
      // Data for linechart
      this.pedestrian = newPoint.direction.pedestrian;
      this.bike = newPoint.direction.bike;
      console.log();
    },
    // updates when changes are made to the duration
    updateByTime(newPoint) {
      this.pedestrian = newPoint.direction.pedestrian;
      this.bike = newPoint.direction.bike;
    },
    // intialise an array for the choiceboxes
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
    // Func to check is location exist
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

#active-title {
  font-size: 4.5em;
}
</style>
