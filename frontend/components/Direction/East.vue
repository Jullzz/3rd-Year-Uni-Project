<template>
  <div class="container">
    <!-- displays hits going east with an image -->
    <h1 class="text_east inline" id="East">{{ east }} East</h1>
    <div class="image_east inline-block">
      <!-- static images used.. located in assest folder -->
      <img src="~/assets/images/Right_arrow.png" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    east: null
  }
};
</script>

<style scoped>
.image_east {
  padding-top: 25px;
  padding-left: 4px;
  padding-right: 4px;
  width: 4vw;
}
.text_east {
  font-size: 2.5vw;
}
</style>