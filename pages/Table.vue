<template>
  <div>
    <b-table striped hover :items="items"></b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          Location: "Bendigo1",
          PedestrianN: 10,
          PedestrianS: 50,
          CyclistN: 30,
          CyclistS: 20,
          Total: 110
        },
        {
          Location: "Bendigo2",
          PedestrianN: 20,
          PedestrianS: 40,
          CyclistN: 20,
          CyclistS: 30,
          Total: 110
        },
        {
          Location: "Bendigo3",
          PedestrianN: 30,
          PedestrianS: 30,
          CyclistN: 30,
          CyclistS: 20,
          Total: 110
        },
        {
          Location: "Bendigo4",
          PedestrianN: 40,
          PedestrianS: 20,
          CyclistN: 20,
          CyclistS: 30,
          Total: 110
        },
        {
          Location: "Bendigo5",
          PedestrianN: 50,
          PedestrianS: 10,
          CyclistN: 30,
          CyclistS: 20,
          Total: 110
        }
      ]
    };
  }
};
</script>
