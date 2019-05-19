import {
  shallowMount,
  mount
} from '@vue/test-utils'
import LineChart from '@/components/LineChart/LineChart.vue'
import LineChartjs from '@/components/LineChart/LineChart.js'


describe('Direction.vue', () => {

  it('Computed data to get total sum', () => {
    const Bike = [10, 20, 40, 30, 50, 60]
    const pedestrian = [1, 5, 6, 40, 60, 10]
    const wrapper = shallowMount(LineChart, {
      propsData: {
        bike: Bike,
        pedestrian: pedestrian
      }
    })

    console.log(wrapper.vm.total.sum)
    expect((wrapper.vm.total.sum).text()).toEqual(23);
  })

  it('renders Line Chart', () => {
    const Bike = [10, 20, 40, 30, 50, 60]
    const pedestrian = [1, 5, 6, 40, 60, 10]
    const wrapper = shallowMount(LineChart, {
      propsData: {
        bike: Bike,
        pedestrian: pedestrian
      }
    })

    expect(wrapper.find(LineChartjs).exists()).toBe(true)
  })

})
