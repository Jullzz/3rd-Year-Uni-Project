import {
  Line,
  mixins
} from 'vue-chartjs' // We specify what type of chart we want from vue-chartjs and the mixins module
const {
  reactiveProp
} = mixins
export default { //We are extending the base chart class as mentioned above
  extends: Line,
  mixins: [reactiveProp],
  data() {
    return {
      options: { //Chart.js options
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            },
            scaleLabel: {
              display: true,
              labelString: 'Hits',
              fontSize: 24,
              fontStyle: "bold",
              fontColor: "#207227"
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            },
            scaleLabel: {
              display: true,
              labelString: 'Time',
              fontSize: 24,
              fontStyle: "bold",
              fontColor: "#207227"
            }
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {
    // this.chartData is created in the mixin
    this.renderChart(this.chartData, this.options)
  }
}
