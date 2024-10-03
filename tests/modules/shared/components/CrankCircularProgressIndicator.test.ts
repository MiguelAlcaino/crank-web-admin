import { mount } from '@vue/test-utils'
import CrankCircularProgressIndicator from '@/modules/shared/components/CrankCircularProgressIndicator.vue'

describe('<CrankCircularProgressIndicator />', () => {
  test('should match snapshot', () => {
    const wrapper = mount(CrankCircularProgressIndicator, {
      props: {}
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render value text correctly', () => {
    const text = 'Please wait'

    const wrapper = mount(CrankCircularProgressIndicator, {
      props: {
        text: text
      }
    })

    expect(wrapper.find('p strong').text()).toBe(text)
  })

  test('renders without text prop', () => {
    const wrapper = mount(CrankCircularProgressIndicator)
    expect(wrapper.find('.crankSpinner').exists()).toBe(true)
    expect(wrapper.find('p').exists()).toBe(false)
  })

  test('renders with text prop', () => {
    const text = 'Please wait'
    const wrapper = mount(CrankCircularProgressIndicator, {
      props: { text }
    })
    expect(wrapper.find('.crankSpinner').exists()).toBe(true)
    expect(wrapper.find('p').exists()).toBe(true)
    expect(wrapper.find('p strong').text()).toBe(text)
  })
})
