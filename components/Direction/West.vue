<template>
  <div class="container">
    <!-- displays hit going west with an image -->
    <div class="image_west">
      <img src="~/assets/images/Left_arrow.png" />
    </div>
    <h1 class="text_west">{{ west }} West</h1>
  </div>
</template>

<script>
export default {
  props: {
    west: null
  }
};
</script>

<style scoped>
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
</style>