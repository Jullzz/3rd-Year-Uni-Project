<template>
  <div>
    <div>
      <NavBar />
    </div>
    <b-table striped hover :items="items" :fields="fields"></b-table>
  </div>
</template>

<script>
import NavBar from "~/components/NavBar/NavBar.vue";

export default {
  components: {
    NavBar
  },
  data() {
    return {
      fields: {
        Location: {
          label: "Location",
          sortable: true
        },
        PedestrianN: {
          label: "PedestrianN",
          sortable: false
        },
        PedestrianS: {
          label: "PedestrianS",
          sortable: false
        },
        CyclistN: {
          label: "CyclistN",
          sortable: false
        },
        CyclistS: {
          label: "CyclistS",
          sortable: false
        },
        Total: {
          label: "Total",
          sortable: true
        }
      },
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
