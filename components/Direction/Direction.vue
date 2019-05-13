<template>
  <div class="Direction">
    <h1 class="Total">{{ Total.sum }} Hits</h1>
    <div class="container">
      <West :west="Direction.west" />
    </div>

    <div class="container">
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
  computed: {
    Total() {
      return {
        sum: this.Direction.west + this.Direction.east
      };
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 100%;
}
.image_west {
  padding-top: 20px;
  padding-left: 5px;
  padding-right: 5px;
  float: left;
  width: 6vw;
}
.text_west {
  float: left;
  font-size: 3vw;
}
.Total {
  font-size: 4vw;
}
</style>