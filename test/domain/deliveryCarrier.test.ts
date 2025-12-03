import { Address, createAddress } from '@/domain/contact/models/address.js';
import { createEmail, createPhone } from '@/domain/contact/models/contact.js';
import { DeliveryCarrier } from '@/domain/deliveryCarrier/deliveryCarrier.js';
import { describe, it, expect, beforeEach } from 'vitest';

describe('DeliveryCarrier', () => {
  let carrier: DeliveryCarrier
  let address: Address

  beforeEach(() => {
    address = createAddress('Main St', 'City', '1000', 'Country', true, 'Headquarters')
    carrier = new DeliveryCarrier('carrier-1', 'Carrier Co.', [address])
  });

  it('initializes correctly', () => {
    expect(carrier.name).toBe('Carrier Co.');
    expect(carrier.addresses.length).toBe(1);
    expect(carrier.primaryLocation).toBe(address);
    expect(carrier.emails).toEqual([]);
    expect(carrier.phones).toEqual([]);
    expect(carrier.id).toBe('carrier-1');
  });

  it('adds, edits, and removes addresses', () => {
    carrier.addAddress(createAddress('Street 2', 'Town', '2000', 'Country', true));
    
    expect(carrier.addresses.length).toBe(2);
    const primary = carrier.addresses.find(a => a.isPrimary);
    expect(primary).toBeDefined();
    expect(primary?.street).toBe('Street 2');

    const addr2 = carrier.addresses[1];

    carrier.editAddress(addr2.id, createAddress('Street X', 'Town', '2000', 'Country', false));
    const edited = carrier.addresses.find(a => a.id === addr2.id);

    expect(edited?.street).toBe('Street X');
    expect(edited?.isPrimary).toBe(false);

    carrier.removeAddress(addr2.id);
    expect(carrier.addresses.length).toBe(1);
  });

  it('adds, edits, and removes emails', () => {
    const email1 = createEmail('a@example.com', true);
    carrier.addEmail(email1);
    expect(carrier.emails.length).toBe(1);
    expect(carrier.emails[0].isPrimary).toBe(true);

    const email2 = createEmail('b@example.com', true);
    carrier.addEmail(email2);
    expect(carrier.emails[0].isPrimary).toBe(false);
    expect(carrier.emails[1].isPrimary).toBe(true);

    carrier.editEmail(carrier.emails[0].id, createEmail('c@example.com', false));
    expect(carrier.emails[0].value).toBe('c@example.com');
    expect(carrier.emails[0].isPrimary).toBe(false);

    carrier.removeEmail(carrier.emails[0].id);
    expect(carrier.emails.length).toBe(1);
  });

  it('adds, edits, and removes phones', () => {
    const phone1 = createPhone('1234567890', true)
    carrier.addPhone(phone1)
    expect(carrier.phones.length).toBe(1)
    expect(carrier.phones[0].isPrimary).toBe(true)

    const phone2 = createPhone('0987654321', true)
    carrier.addPhone(phone2)
    expect(carrier.phones[0].isPrimary).toBe(false)
    expect(carrier.phones[1].isPrimary).toBe(true)

    carrier.editPhone(carrier.phones[0].id, createPhone('1111111111', false))
    expect(carrier.phones[0].value).toBe('1111111111')
    expect(carrier.phones[0].isPrimary).toBe(false)

    carrier.removePhone(carrier.phones[0].id)
    expect(carrier.phones.length).toBe(1)
  })
})

describe('createDeliveryCarrier', () => {
  it('creates a DeliveryCarrier correctly', () => {
    const address = createAddress('Street 1', 'City', '1000', 'Country', true)
    const carrier = new DeliveryCarrier('id-123', 'Carrier Co.', [address])
    expect(carrier).toBeInstanceOf(DeliveryCarrier)
    expect(carrier.addresses[0].street).toBe('Street 1')
  })
})
