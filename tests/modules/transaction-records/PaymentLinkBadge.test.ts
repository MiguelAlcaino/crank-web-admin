import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import PaymentLinkBadge from '@/modules/transaction-records/components/PaymentLinkBadge.vue'

describe('PaymentLinkBadge', () => {
  it('has no tooltip when the payment link title is unknown', () => {
    const badge = mount(PaymentLinkBadge, { props: { title: null } })

    expect(badge.text()).toBe('Payment link')
    expect(badge.attributes('title')).toBeUndefined()
  })

  it('shows the payment link title as its tooltip', () => {
    const badge = mount(PaymentLinkBadge, { props: { title: 'Private session' } })

    expect(badge.text()).toBe('Payment link')
    expect(badge.attributes('title')).toBe('Private session')
  })
})
