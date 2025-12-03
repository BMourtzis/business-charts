import { createAddress } from '@/domain/contact/models/address.js';
import { describe, it, expect } from 'vitest';

describe('Address', () => {
  it('createAddress generates a valid Address', () => {
    const address = createAddress('Street 1', 'City', '1000', 'Country', true, 'Home');
    
    expect(address.id).toBeTruthy();
    expect(address.street).toBe('Street 1');
    expect(address.city).toBe('City');
    expect(address.zip).toBe('1000');
    expect(address.country).toBe('Country');
    expect(address.isPrimary).toBe(true);
    expect(address.name).toBe('Home');
    expect(address.value).toContain('Street 1');
    expect(address.value).toContain('City');
  });
});