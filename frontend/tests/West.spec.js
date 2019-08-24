import {
  shallowMount,
  mount
} from '@vue/test-utils'
import West from '@/components/Direction/West.vue'

describe('West.vue', () => {
  it('should render based on passed in props', () => {
    const wrapper = shallowMount(West, {
      propsData: {
        west: '10'
      }
    })

    expect(wrapper.find('.text_west').text()).toBe('10 West')
  })
})
