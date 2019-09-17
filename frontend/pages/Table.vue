<template>
  <div>
    <div>
      <NavBar />
    </div>
    <div class="main w-full text-center">
      <h1 class="title text-green-700">
        Detailed Data Table
      </h1>
    </div>
    <div id="sixthTable">
      <div class="pagination">
        <div
          class="number"
          v-for="i in num_pages()"
          v-bind:class="[i == currentPage ? 'active' : '']"
          v-on:click="change_page(i)"
        >
          {{ i }}
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th v-for="col in columns" v-on:click="sortTable(col)">
              {{ col }}
              <div
                class="arrow"
                v-if="col == sortColumn"
                v-bind:class="[ascending ? 'arrow_up' : 'arrow_down']"
              ></div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in get_rows()">
            <td v-for="col in columns">{{ row[col] }}</td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <div
          class="number"
          v-for="i in num_pages()"
          v-bind:class="[i == currentPage ? 'active' : '']"
          v-on:click="change_page(i)"
        >
          {{ i }}
        </div>
      </div>
    </div>
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
      currentPage: 1,
      elementsPerPage: 5,
      ascending: false,
      sortColumn: "",
      rows: [
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
          Location: "Bendigo4",
          PedestrianN: 40,
          PedestrianS: 20,
          CyclistN: 20,
          CyclistS: 30,
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
          Location: "Bendigo4",
          PedestrianN: 40,
          PedestrianS: 20,
          CyclistN: 20,
          CyclistS: 30,
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
  },
  methods: {
    sortTable: function sortTable(col) {
      if (this.sortColumn === col) {
        this.ascending = !this.ascending;
      } else {
        this.ascending = true;
        this.sortColumn = col;
      }

      var ascending = this.ascending;

      this.rows.sort(function(a, b) {
        if (a[col] > b[col]) {
          return ascending ? 1 : -1;
        } else if (a[col] < b[col]) {
          return ascending ? -1 : 1;
        }
        return 0;
      });
    },
    num_pages: function num_pages() {
      return Math.ceil(this.rows.length / this.elementsPerPage);
    },
    get_rows: function get_rows() {
      var start = (this.currentPage - 1) * this.elementsPerPage;
      var end = start + this.elementsPerPage;
      return this.rows.slice(start, end);
    },
    change_page: function change_page(page) {
      this.currentPage = page;
    }
  },
  computed: {
    columns: function columns() {
      if (this.rows.length == 0) {
        return [];
      }
      return Object.keys(this.rows[0]);
    }
  }
};
</script>

<style scoped>
.title {
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 35px;
  font-weight: bold;
}
.main {
  align-content: center;
  max-width: 100%;
}
table {
  font-family: "Open Sans", sans-serif;
  width: 98%;
  border-collapse: collapse;
  border: 3px solid #44475c;
  margin: 10px 10px 0 10px;
}

table th {
  text-align: center;
  background: #3d4852;
  color: #fff;
  cursor: pointer;
  padding: 8px;
  min-width: 30px;
  font-size: 20px;
}
table th:hover {
  background: #717699;
}
table td {
  text-align: center;
  padding: 8px;
  border-right: 2px solid #3d4852;
  font-size: 20px;
  font-weight: bold;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  @apply bg-green-100
  /* background: #a3c58e; */
}

.pagination {
  font-family: "Open Sans", sans-serif;
  text-align: right;
  width: 750px;
  padding: 8px;
}

.arrow_down {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAaCAYAAABPY4eKAAAAAXNSR0IArs4c6QAAAvlJREFUSA29Vk1PGlEUHQaiiewslpUJiyYs2yb9AyRuJGm7c0VJoFXSX9A0sSZN04ULF12YEBQDhMCuSZOm1FhTiLY2Rky0QPlQBLRUsICoIN/0PCsGyox26NC3eTNn3r3n3TvnvvsE1PkwGo3yUqkkEQqFgw2Mz7lWqwng7ztN06mxsTEv8U0Aam5u7r5EInkplUol/f391wAJCc7nEAgE9Uwmkzo4OPiJMa1Wq6cFs7Ozt0H6RqlUDmJXfPIx+qrX69Ti4mIyHA5r6Wq1egND+j+IyW6QAUoul18XiUTDNHaSyGazKcZtdgk8wqhUKh9o/OMvsVgsfHJy0iWqVrcQNRUMBnd6enqc9MjISAmRP3e73T9al3XnbWNjIw2+KY1Gc3imsNHR0YV4PP5+d3e32h3K316TySQFoX2WyWR2glzIO5fLTSD6IElLNwbqnFpbWyO/96lCoai0cZjN5kfYQAYi5H34fL6cxWIZbya9iJyAhULBHAqFVlMpfsV/fHxMeb3er+Vy+VUzeduzwWC45XA4dlD/vEXvdDrj8DvURsYEWK3WF4FA4JQP9mg0WrHZbEYmnpa0NxYgPVObm5teiLABdTQT8a6vrwdRWhOcHMzMzCiXlpb2/yV6qDttMpkeshEzRk4Wo/bfoe4X9vb2amzGl+HoXNT29vZqsVi0sK1jJScG+Xx+HGkL4Tew2TPi5zUdQQt9otPpuBk3e0TaHmMDh1zS7/f780S0zX6Yni+NnBj09fUZUfvudDrNZN+GkQbl8Xi8RLRtHzsB9Hr9nfn5+SjSeWUCXC7XPq5kw53wsNogjZNohYXL2EljstvtrAL70/mVaW8Y4OidRO1/gwgbUMvcqGmcDc9aPvD1gnTeQ+0nmaInokRj0nHh+uvIiVOtVvt2a2vLv7Ky0tL3cRTXIcpPAwMDpq6R4/JXE4vFQ5FI5CN+QTaRSFCYc8vLy1l0rge4ARe5kJ/d27kYkLXoy2Jo4C7K8CZOsEBvb+9rlUp1xNXPL7v3IDwxvPD6AAAAAElFTkSuQmCC");
}
.arrow_up {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAaCAYAAACgoey0AAAAAXNSR0IArs4c6QAAAwpJREFUSA21Vt1PUmEYP4dvkQ8JFMwtBRocWAkDbiqXrUWXzU1rrTt0bdVqXbb1tbW16C9IBUSmm27cODdneoXjputa6069qwuW6IIBIdLvdaF4OAcOiGeDc87zPs/vd57P96WpFq7p6enbGo1mjKZpeTabjU1MTCRagGnOZHFxcXxtbe1XKpUq7+zslJeXl//Mz8+Hy+Uy3RxSE9qTk5M3otFooVQqgef4Wl9f343FYoEmoISrxuNxFX5f9vb2jhn/PxUKhfLS0tIPfFifUESRUMV8Pv/M6XReRm5rTGQyGeXxeGxYe1ezeBpBOBx2rKysbO7v79d4Wy3Y2Nj4GQqFbgnhaugxwiuGJx99Pp9FLBbXxYTXvTqd7v3MzIy6riIWGxJnMpl7AwMD14xGYyMsSq1WUyQdUqn0eSPlusQIsbGrq+vl4OCgvhFQZd1utyv1en0gEolcqsi47nWJlUrlG5fLZVcoFFy2nDKSDpIWlUoVTCQSEk4lCHmJMZ2GTCbTiMVikfIZ88l7enoos9l8dXt7+z6fDicxSJUokqDX6xXcl2wCROoc0vQCWL3sNfLOSdzR0fHY4XC4tVotl40gmVwup9xuN4OQv+UyqCFGH9rg7SOGYVRcBs3IEG4J0nVnamrqOtvuBDGGgQg9+wHFcVEi4a0LNkbdd6TrPKo8ODc311mteIIYjT/a398/jK+s1jnVM0kXoufCFvq0GuiIGEVgQIhfoygM1QrteEa9dAL7ITiYCt4RMabOK5AyKKzKWtvupLcRciu8D5J0EuDDPyT/Snd39yh6VtY2NhYQSR9G79Ds7OxdskRjEyAufvb7/cPoO5Z6e1+xtVKrq6vfcFzyi/A3ZrPZ3GdNSlwgo5ekE4X2RIQGf2C1WlufFE0GBeGWYQ8YERWLxQtnUVB830MKLZfL9RHir8lkssCn2G751tZWEWe03zTKm15YWPiEiXXTYDB0Ig/t7yd8PRws4EicwWHxO4jHD8/C5HiTTqd1BwcHFozKU89origB+y/kmzgYpgOBQP4fGmUiZmJ+WNgAAAAASUVORK5CYII=");
}
.arrow {
  float: right;
  width: 12px;
  height: 15px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position-y: bottom;
}

.number {
  display: inline-block;
  padding: 4px 10px;
  color: #fff;
  border-radius: 4px;
  background: #3d4852;
  margin: 0px 5px;
  cursor: pointer;
}
.number:hover,
.number.active {
  background: #717699;
}
</style>
