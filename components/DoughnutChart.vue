<script>
import { Doughnut } from "vue-chartjs";
export default {
  extends: Doughnut,
  mounted() {
    this.renderChart(
      {
        labels: ["Jan", "Feb", "Mar"],
        datasets: [
          {
            label: "my activity",
            backgroundColor: "#dd4b39",
            data: [40, 50, 10]
          }
        ]
      },
      {
        responsive: true,
        maintainAspectRatio: false
      }
    );
  }
};
</script>
