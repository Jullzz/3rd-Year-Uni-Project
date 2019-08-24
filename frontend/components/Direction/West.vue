<template>
  <div class="container">
    <!-- displays hit going west with an image -->
    <div class="image_west">
      <!-- static images used.. located in assest folder -->
      <img src="~/assets/images/Left_arrow.png" />
    </div>
    <h1 class="text_west" id="West">{{ west }} West</h1>
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
  padding-left: 4px;
  padding-right: 4px;
  float: left;
  width: 4vw;
}
.text_west {
  float: left;
  font-size: 3vw;
}
</style>