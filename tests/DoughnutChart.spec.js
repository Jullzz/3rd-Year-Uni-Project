import {
  shallowMount,
  mount
} from '@vue/test-utils'
import Direction from '@/components/Direction/Direction.vue'
import DoughnutChartjs from '@/components/DoughnutChart/DoughnutChart.js'
import DoughnutChart from '@/components/DoughnutChart/DoughnutCharts.vue'

describe('Direction.vue', () => {
  it('renders Chart', () => {
    const hits = {
      bike: 264,
      pedestrian: 23
    }
    const direction = {
      bike: {
        west: 100,
        east: 164
      },
      pedestrian: {
        west: 10,
        east: 13
      }
    }
    const wrapper = shallowMount(DoughnutChart, {
      propsData: {
        Hits: hits,
        DirectionV: direction
      }
    })
    expect(wrapper.find(DoughnutChartjs).exists()).toBe(true)
  })

  it('renders Direction', () => {
    const hits = {
      bike: 264,
      pedestrian: 23
    }
    const direction = {
      bike: {
        west: 100,
        east: 164
      },
      pedestrian: {
        west: 10,
        east: 13
      }
    }
    const wrapper = shallowMount(DoughnutChart, {
      propsData: {
        Hits: hits,
        DirectionV: direction
      }
    })
    expect(wrapper.find(Direction).exists()).toBe(true)
  })

  it('renders total and test updateEvent method', () => {
    const hits = {
      bike: 200,
      pedestrian: 23
    }
    const total = "223 Hits"
    const direction = {
      bike: {
        west: 100,
        east: 164
      },
      pedestrian: {
        west: 10,
        east: 13
      }
    }
    const wrapper = shallowMount(DoughnutChart, {
      propsData: {
        Hits: hits,
        DirectionV: direction
      }
    })

    wrapper.vm.updateEvent(hits, direction)
    wrapper.setData({
      bike: 223,
      pedestrian: 90
    })
    expect(wrapper.find('#total').text()).toEqual(total)
  })

})
