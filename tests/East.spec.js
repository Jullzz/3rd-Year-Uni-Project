import {
  shallowMount
} from '@vue/test-utils'
import East from '@/components/Direction/East.vue'

describe('East.vue', () => {
  it('should render based on passed in props', () => {
    const wrapper = shallowMount(East, {
      propsData: {
        east: '10'
      }
    })

    expect(wrapper.find('#East').text()).toBe('10 East')
  })
})
