<template>
  <div class="Direction text-center">
    <!-- Sum total of hit going both direction -->
    <h1 class="Total">{{ Total.sum }} Hits</h1>
    <div class="container">
      <!-- display hits going west by passing a single prop data-->
      <West :west="Direction.west" />
    </div>

    <div class="container">
      <!-- displays hits going east by passing a single prop data-->
      <East :east="Direction.east" />
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
      east: null
    };
  },
  computed: {
    //calculated the total of hits
    Total() {
      return {
        sum: this.west + this.east
      };
    }
  },
  methods: {
    setProps(Direction) {
      this.east = Direction.east;
      this.west = Direction.west;
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 100%;
}
.Total {
  font-size: 3vw;
}
</style>