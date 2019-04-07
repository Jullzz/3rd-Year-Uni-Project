<template>
  <div>
    <!-- Map itself -->
    <div id="map" class="w-full bg-red z-0" :class="(!enlarged) ? 'map-short': 'map-tall'" ></div>
    
    <!-- Circle that expands/collases the map -->
    <div id="circle" class="shadow-lg -mt-10 bg-blue cursor-pointer" @click="enlarged = !enlarged" >
      <!-- Down pointing chevron - Change the svg tag styles to update chevron look -->
      <svg 
        v-if="!enlarged" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        class="icon-cheveron-down text-white fill-current">
        <path class="secondary" fill-rule="evenodd" d="M15.3 10.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"/></svg>
      
      <!-- Up pointing chevron -->
      <svg 
        v-else 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        class="icon-cheveron-up text-white fill-current">
        <path class="secondary" fill-rule="evenodd" d="M8.7 13.7a1 1 0 1 1-1.4-1.4l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1-1.4 1.4L12 10.42l-3.3 3.3z"/></svg>
    </div>
  </div>
</template>

<script>
import GoogleMapsLoader from 'google-maps'

export default {
  data() {
    return {
      enlarged: false, // True means map is expanded
      map: null,
      dataPoints: [
        {
          title: "Rosalind 1",
          counts: {bike: 136, pedestrian: 195},
          location: {lat: -36.757234, lng: 144.279113}
        },
        {
          title: "Rosalind 2",
          counts: {bike: 100, pedestrian: 131},
          location: {lat: -36.748794, lng: 144.290756}
        }
      ]
    }
  },

  mounted() { // Lifecycle hook
    this.initMap()
    this.addMarkers()
  },

  methods: {
    initMap() {
      //Set up map
      console.log("init map")
      var self = this
      GoogleMapsLoader.KEY = 'AIzaSyBVAaFiYCWzkMHq2O9HNYAfeGpo6u8ilKQ'
      GoogleMapsLoader.load(function(google) {
        self.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: {lat: -36.757042, lng: 144.279056}
        });
      });
    },

    addMarkers() {
      console.log('adding marker')
      let self = this
      GoogleMapsLoader.load(function(google) {
        for(let i = 0; i < self.dataPoints.length; i++) {
          var point = self.dataPoints[i]
          point.m = new google.maps.Marker({
            position: point.location,
            map: self.map,
            title: point.title
          });

          point.info = new google.maps.InfoWindow({
            content: "<div class='infoWindow'>" +
              "<h1>" + point.title + "</h1>" +
              "<b>Pedestrians:</b> " + point.counts.pedestrian +
              "<b>Bikes:</b> " + point.counts.bike +
            "</div>"
          });
          point.m.addListener('click', function() {
            point.info.open(self.map, point.m);
          });
        }
        // var marker = new google.maps.Marker({
        //   position: {lat: -36.757234, lng: 144.279113},
        //   map: self.map,
        //   title: 'Hello World!'
        // });
      })
    }
  }
}
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
  background-color: blue;
}

#circle {
  position:absolute;
  z-index: 100;
  width: 80px;
  height: 80px;
  -webkit-border-radius: 40px;
  -moz-border-radius: 40px;
  border-radius: 40px;
  left: 50%;
  margin-left: -40px;
}
</style>