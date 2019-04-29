<template>
  <div
    id="map-container"
    class="w-full"
    :class="!enlarged ? 'map-short' : 'map-tall'"
  >
    <!-- Map itself -->
    <div id="map" class="w-full bg-red z-0 h-full"></div>

    <!-- Circle that expands/collases the map -->
    <div
      id="circle"
      class="shadow-lg -mt-10 bg-green-500 cursor-pointer"
      @click="enlarged = !enlarged"
    >
      <!-- Down pointing chevron - Change the svg tag styles to update chevron look -->
      <svg
        v-if="!enlarged"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="icon-cheveron-down text-white fill-current"
      >
        <path
          class="secondary"
          fill-rule="evenodd"
          d="M15.3 10.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"
        />
      </svg>

      <!-- Up pointing chevron -->
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="icon-cheveron-up text-white fill-current"
      >
        <path
          class="secondary"
          fill-rule="evenodd"
          d="M8.7 13.7a1 1 0 1 1-1.4-1.4l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1-1.4 1.4L12 10.42l-3.3 3.3z"
        />
      </svg>
    </div>

    <Select
      v-if="map"
      id="heatmapSelect"
      v-model="heatmapType"
      class="absolute shadow-lg text-black"
    >
      HeatMap Type
      <Option :value="1">Normal Heatmap</Option>
      <Option :value="2">Pedestrians Only</Option>
      <Option :value="3">Cyclists only</Option>
      <Option :value="0">No Heatmap</Option>
    </Select>
  </div>
</template>

<script>
import GoogleMapsLoader from "google-maps";
import { Select, Option } from "iview";

export default {
  components: {
    Select,
    Option
  },
  props: {
    pointUpdate: null
  },
  data() {
    return {
      enlarged: false, // True means map is expanded
      map: null, // Map object
      heatmap: null, // Heatmap object
      heatmapType: 1, // Type of heatmap layer
      // 0 == No heatmap
      // 1 == All hits
      // 2 == Pedestrians only
      // 3 == Cyclists only
      heatmapData: null,
      dataPoints: [
        // Fake test data
        {
          title: "Rosalind 1",
          counts: { bike: 264, pedestrian: 23 },
          bike: [10, 20, 40, 30, 50, 60],
          pedestrian: [1, 5, 6, 40, 60, 10],
          location: { lat: -36.757234, lng: 144.279113 }
        },
        {
          title: "Rosalind 2",
          counts: { bike: 100, pedestrian: 241 },
          bike: [10, 20, 20, 30, 40, 30],
          pedestrian: [1, 5, 6, 40, 60, 10],
          location: { lat: -36.748794, lng: 144.290756 }
        }
      ]
    };
  },

  watch: {
    heatmapOn: function() {
      // Toggle heatmap
      this.heatmap.setMap(this.heatmapOn ? this.map : null);
    },
    heatmapType: function() {
      switch (this.heatmapType) {
        case 0: // Hide heatmap
          this.heatmap.setMap(null);
          return;

        case 1: // total hits
          this.heatmap.data = new google.maps.MVCArray(
            this.dataPoints.map(point => {
              return {
                location: new google.maps.LatLng(
                  point.location.lat,
                  point.location.lng
                ),
                weight: (point.counts.bike + point.counts.pedestrian) * 10000
              };
            })
          );
          break;

        case 2: // Pedestrians Only
          this.heatmap.data = new google.maps.MVCArray(
            this.dataPoints.map(point => {
              return {
                location: new google.maps.LatLng(
                  point.location.lat,
                  point.location.lng
                ),
                weight: point.counts.pedestrian * 10000
              };
            })
          );
          break;

        case 3: // Cyclists only
          this.heatmap.data = new google.maps.MVCArray(
            this.dataPoints.map(point => {
              return {
                location: new google.maps.LatLng(
                  point.location.lat,
                  point.location.lng
                ),
                weight: point.counts.bike * 10000
              };
            })
          );
          break;

        default:
          return;
      }

      this.setMap();
    }
  },

  mounted() {
    // Lifecycle hook
    this.initMap(); // Set up the map
    this.addMarkers(); // Add the markers to the map - MAP MUST BE INITIALISED FIRST
    this.addInfoWindows(); // Add infor windows - MARKERS MUST BE ADDED FIRST
    this.addHeatmap(); // Add heatmap - MAP MUST BE SET UP FIRST
  },

  methods: {
    initMap() {
      //Set up map
      console.log("init map");
      GoogleMapsLoader.KEY = process.env.API_KEY; //API Key - Linked to James's account - DO NOT STEAL
      GoogleMapsLoader.LIBRARIES = ["places", "visualization"]; //Google maps libs used - feel free to add more as needed

      var self = this; // Give access to state from callback
      GoogleMapsLoader.load(function(google) {
        self.map = new google.maps.Map(document.getElementById("map"), {
          zoom: 14,
          center: { lat: -36.757042, lng: 144.279056 }
        });
      });
    },

    addMarkers() {
      // Adds markers for each data point
      console.log("adding marker");
      var self = this;
      GoogleMapsLoader.load(function(google) {
        for (let i = 0; i < self.dataPoints.length; i++) {
          let point = self.dataPoints[i];

          point.marker = new google.maps.Marker({
            position: point.location,
            map: self.map,
            title: point.title
          });

          // Set active data point in parent
          // TODO: Change to use a unique ID
          point.marker.addListener("click", () => self.pointUpdate(point));
        }
      });
    },
    addInfoWindows() {
      // Adds info windows for each data point marker
      console.log("adding info windows");
      let self = this;
      GoogleMapsLoader.load(function(google) {
        for (let i = 0; i < self.dataPoints.length; i++) {
          let point = self.dataPoints[i];

          // HTML to be shown in window.
          // NOTE - Window height is too short by default - Had to explicitly set height for class .gm-style-iw-c
          let contentString =
            "<div class='infoWindow text-black'>" +
            "<h1>" +
            point.title +
            "</h1>" +
            "Pedestrians:<b> " +
            point.counts.pedestrian +
            "<br /></b>Bikes:<b> " +
            point.counts.bike +
            "</b></div>";

          //Construct new window object, store in data point
          point.info = new google.maps.InfoWindow({
            content: contentString
          });

          // Set onHover listeners for the info window to hide/show
          point.marker.addListener("mouseover", () =>
            point.info.open(self.map, point.marker)
          );
          point.marker.addListener("mouseout", () => point.info.close());
        }
      });
    },
    addHeatmap() {
      let self = this;
      GoogleMapsLoader.load(function(google) {
        self.heatmapData = new google.maps.MVCArray(
          self.dataPoints.map(point => {
            return {
              location: new google.maps.LatLng(
                point.location.lat,
                point.location.lng
              ),
              weight: (point.counts.bike + point.counts.pedestrian) * 10000
            };
          })
        );

        self.heatmap = new google.maps.visualization.HeatmapLayer({
          data: self.heatmapData
        });

        self.setMap();
      });
    },
    setMap() {
      // Use whenever updating heatmap
      this.heatmap.setMap(this.map);
      this.heatmap.set("radius", 25);
    }
  }
};
</script>

<style>
.map-short {
  height: 33%;
  transition: height 0.2s;
}

.map-tall {
  transition: height 0.2s;
  height: 90%;
}

.infoWindow {
  max-height: 600px;
}

.gm-style-iw-c {
  height: 90px;
}

.ivu-select-item-selected {
  color: #2f8132;
}
.ivu-select-item-selected:hover {
  color: #421987;
}

#circle {
  position: absolute;
  z-index: 100;
  width: 80px;
  height: 80px;
  -webkit-border-radius: 40px;
  -moz-border-radius: 40px;
  border-radius: 40px;
  left: 50%;
  margin-left: -40px;
}

#map {
  overflow: -moz-hidden-unscrollable;
}

#heatmapSelect {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 70px;
  margin-top: 9px;
  width: 200px;
}
</style>