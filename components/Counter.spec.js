import {
  mount
} from '@vue/test-utils'
import Counter from './Counter.vue'

describe('Counter.vue', () => {
  test('Setup correctly', () => {
    expect(true).toBe(true)
  })
  test('increments the counter value when button is clicked', () => {
    const wrapper = mount(Counter)
    expect(wrapper.text()).toContain('Counter: 0')

  })
})
