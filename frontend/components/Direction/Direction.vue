<template>
  <div class="Direction">
    <!-- Sum total of hit going both direction -->
    <h1 class="Total" :key="this.Direction">{{ sum }} Hits</h1>
    <div class="container">
      <!-- display hits going west by passing a single prop data-->
      <West :west="west" />
    </div>

    <div class="container">
      <!-- displays hits going east by passing a single prop data-->
      <East :east="east" />
    </div>
  </div>
</template>

<script>
import West from "~/components/Direction/West.vue";
import East from "~/components/Direction/East.vue";

export default {
  props: {
    Direction: null
  },
  components: {
    West,
    East
  },
  mounted() {
    this.setProps(this.Direction);
  },
  beforeUpdate() {
    this.setProps(this.Direction);
  },
  data() {
    return {
      west: null,
      east: null,
      sum: null
    };
  },
  methods: {
    // Data from parent retreived and will be initialised
    // on local data
    setProps(Direction) {
      // datas retreived is an array
      this.east = this.TotalCal(Direction.east);
      this.west = this.TotalCal(Direction.west);
      this.Total();
    },
    // func to convert from array to variable
    // func to calculated total
    TotalCal(data) {
      var sum = null;
      data.forEach((num, index) => {
        sum = sum + num;
      });
      return sum;
    },
    //fucn to calculated total hits
    Total() {
      this.sum = this.east + this.west;
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 100%;
}
.Total {
  font-size: 4vw;
}
</style>