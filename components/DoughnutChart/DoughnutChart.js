import {
  Doughnut,
  mixins
} from 'vue-chartjs' // We specify what type of chart we want from vue-chartjs and the mixins module

export default {
  extends: Doughnut, //We are extending the base chart class as mentioned above
  mixins: [mixins.reactiveProp],
  data() {
    return {
      // options object used to style the display of the chart
      options: {
        //Chart.js options
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: "bottom"
        }
      }
    }
  },
  mounted() {
    // this.chartData is created in the mixin.
    this.renderChart(this.chartData, this.options)
  }
}
