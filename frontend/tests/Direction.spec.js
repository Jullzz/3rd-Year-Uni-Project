import {
  shallowMount,
  mount
} from '@vue/test-utils'
import Direction from '@/components/Direction/Direction.vue'
import West from "~/components/Direction/West.vue";
import East from "~/components/Direction/East.vue";

describe('Direction.vue', () => {
  it('Computed data to get total sum', () => {
    const direction = {
      west: 10,
      east: 13
    }
    const wrapper = shallowMount(Direction, {
      propsData: {
        Direction: direction
      }
    })
    expect(wrapper.vm.Total.sum).toBe(23);
  })
  it('renders West Direction', () => {
    const direction = {
      west: 10,
      east: 13
    }
    const wrapper = shallowMount(Direction, {
      propsData: {
        Direction: direction
      }
    })

    expect(wrapper.find(West).exists()).toBe(true)
  })

  it('renders East Direction', () => {
    const direction = {
      west: 10,
      east: 13
    }
    const wrapper = shallowMount(Direction, {
      propsData: {
        Direction: direction
      }
    })

    expect(wrapper.find(East).exists()).toBe(true)
  })

})
