<template>
  <div class="container w-full">
    <!-- displays hit going west with an image -->
    <div class="image_west inline-block">
      <!-- static images used.. located in assest folder -->
      <img src="~/assets/images/Left_arrow.png" />
    </div>
      <h1 class="text_west inline" id="West">{{ west }} West</h1>
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
  width: 4vw;
}
.text_west {
  font-size: 2.5vw;
}
</style>