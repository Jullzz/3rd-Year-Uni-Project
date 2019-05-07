<template>
  <div class="Direction">
    <h1 class="Total">48</h1>
    <div class="West_dir">
      <h1 class="West_hit">
        20
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/12/Arrow_left.svg"
          class="left"
          align="center"
        />
      </h1>
    </div>
    <div class="East_dir">
      <h1 class="East_hit">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Arrow_right.svg"
          class="right"
          align="center"
        />28
      </h1>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.Direction {
  padding-top: 20px;
}
.West_hit,
.East_hit {
  font-size: 50px;
}
.Total {
  padding-top: 75px;
  font-size: 90px;
}
.right,
.left {
  width: 300px;
  padding-right: 15px;
}
</style>