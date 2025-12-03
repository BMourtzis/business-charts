import { B2BCustomer, createB2BCustomer } from '@/domain/partner/models/b2bCustomer.js'
import { PartnerType } from '@/domain/partner/partnerTypes.js'
import { describe, it, expect } from 'vitest'

describe('B2BCustomer class', () => {
  it('creates a B2BCustomer', () => {
    const name = 'Beta Corp'
    const carrierId = 'carrier-456'
    const businessName = 'Beta Business'

    const customer = createB2BCustomer(name, carrierId, businessName)

    // Should be instance of B2BCustomer
    expect(customer).toBeInstanceOf(B2BCustomer);

    // Inherited properties
    expect(customer.contactName).toBe(name);
    expect(customer.businessName).toBe(businessName);
    expect(customer.type).toBe(PartnerType.B2BCustomer);
    expect(customer.deliveryCarrierId).toBe(carrierId);
    expect(customer.id).toBeTruthy();
  })
})