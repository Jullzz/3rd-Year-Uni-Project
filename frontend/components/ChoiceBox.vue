<template>
  <div>
    <Select
      v-model="data.data"
      style="width:200px"
      placeholder="Choose something..."
    >
      <Option v-for="item in dataTitle" :value="item.value" :key="item.value">{{
        item.value
      }}</Option>
      <Option :value="na"></Option>
    </Select>
  </div>
</template>
<script>
export default {
  props: {
    dataTitle: null,
    data: { data: "" }
  }
};
</script>
