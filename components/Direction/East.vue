<template>
  <div class="container">
    <h1 class="text_east">{{ east }} East</h1>
    <div class="image_east">
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
  padding-top: 20px;
  padding-left: 5px;
  padding-right: 5px;
  float: left;
  width: 6vw;
}
.text_east {
  float: left;
  font-size: 3vw;
}
</style>