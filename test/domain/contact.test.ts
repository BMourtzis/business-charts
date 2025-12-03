import { ContactType } from '@/domain/contact/contactTypes.js';
import { createEmail, createPhone } from '@/domain/contact/models/contact.js';
import { describe, it, expect } from 'vitest'

describe('Contact', () => {
  it('createEmail generates a valid Email', () => {
    const email = createEmail('hello@example.com', true, 'Primary');
    
    expect(email.id).toBeTruthy();
    expect(email.value).toBe('hello@example.com');
    expect(email.type).toBe(ContactType.Email);
    expect(email.isPrimary).toBe(true);
    expect(email.name).toBe('Primary');
  })

  it('createPhone generates a valid Phone', () => {
    const phone = createPhone('9876543210', false, 'Secondary');
    
    expect(phone.id).toBeTruthy();
    expect(phone.value).toBe('9876543210');
    expect(phone.type).toBe(ContactType.Phone);
    expect(phone.isPrimary).toBe(false);
    expect(phone.name).toBe('Secondary');
  })
})