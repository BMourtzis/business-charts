import { describe, it, expect, beforeEach } from 'vitest'
import { v4 as uuidv4 } from 'uuid'
import { Partner } from '@/domain/partner/models/partner.js'
import { PartnerType } from '@/domain/partner/partnerTypes.js'
import { createEmail, createPhone } from '@/domain/contact/models/contact.js'
import { createAddress } from '@/domain/contact/models/address.js'

// Concrete subclass for testing
class TestPartner extends Partner {
  constructor(id: string, clientNumber: number,  contactName: string, businessName?: string) {
    super(id, PartnerType.Supplier, clientNumber, contactName, businessName)
  }
}

describe('Partner', () => {
  let partner: TestPartner

  beforeEach(() => {
    partner = new TestPartner(uuidv4(), 1, 'Alice', 'Alice Co.')
  })

  it('initializes correctly', () => {
    expect(partner.contactName).toBe('Alice')
    expect(partner.businessName).toBe('Alice Co.')
    expect(partner.type).toBe(PartnerType.Supplier)
    expect(partner.emails).toEqual([])
    expect(partner.phones).toEqual([])
    expect(partner.addresses).toEqual([])
  })

  it('updates contactName and businessName', () => {
    partner.updateData('Bob', 'Bob Co.')
    expect(partner.contactName).toBe('Bob')
    expect(partner.businessName).toBe('Bob Co.')
  })

  it('adds, edits, and removes emails', () => {
    const email1 = createEmail('a@example.com', true)
    partner.addEmail(email1)

    expect(partner.emails.length).toBe(1)
    expect(partner.emails[0].value).toBe('a@example.com')
    expect(partner.emails[0].isPrimary).toBe(true)

    // Add a second primary email
    const email2 = createEmail('b@example.com', true)
    partner.addEmail(email2)
    expect(partner.emails[0].isPrimary).toBe(false)
    expect(partner.emails[1].isPrimary).toBe(true)

    // Edit first email
    partner.editEmail(partner.emails[0].id, createEmail('c@example.com', false))
    expect(partner.emails[0].value).toBe('c@example.com')
    expect(partner.emails[0].isPrimary).toBe(false)

    // Remove email
    partner.removeEmail(partner.emails[0].id)
    expect(partner.emails.length).toBe(1)
    expect(partner.emails[0].value).toBe('b@example.com')
  })

  it('adds, edits, and removes phones', () => {
    const phone1 = createPhone('1234567890', true)
    partner.addPhone(phone1)
    expect(partner.phones.length).toBe(1)
    expect(partner.phones[0].value).toBe('1234567890')

    // Add second primary phone
    const phone2 = createPhone('0987654321', true)
    partner.addPhone(phone2)
    expect(partner.phones[0].isPrimary).toBe(false)
    expect(partner.phones[1].isPrimary).toBe(true)

    // Edit first phone
    partner.editPhone(partner.phones[0].id, createPhone('1111111111', false))
    expect(partner.phones[0].value).toBe('1111111111')
    expect(partner.phones[0].isPrimary).toBe(false)

    // Remove phone
    partner.removePhone(partner.phones[0].id)
    expect(partner.phones.length).toBe(1)
    expect(partner.phones[0].value).toBe('0987654321')
  })

  it('adds, edits, and removes addresses', () => {
    const addr1 = createAddress('Street 1', 'City', '1000', 'Country', true)
    partner.addAddress(addr1)
    expect(partner.addresses.length).toBe(1)
    expect(partner.addresses[0].street).toBe('Street 1')

    const addr2 = createAddress('Street 2', 'City', '2000', 'Country', true)
    partner.addAddress(addr2)
    expect(partner.addresses[0].isPrimary).toBe(false)
    expect(partner.addresses[1].isPrimary).toBe(true)

    // Edit first address
    partner.editAddress(partner.addresses[0].id, createAddress('Street X', 'City', '1000', 'Country'))
    expect(partner.addresses[0].street).toBe('Street X')

    // Remove address
    partner.removeAddress(partner.addresses[0].id)
    expect(partner.addresses.length).toBe(1)
    expect(partner.addresses[0].street).toBe('Street 2')
  })
})
