import { createSupplier, Supplier } from "@/domain/partner/models/supplier.js";
import { describe, expect, it } from "vitest";


describe('createSupplier', () => {
  it('creates a Supplier with name and activity', () => {
    const name = 'John Doe';
    const activity = 'Shoemaking';
    const supplier = createSupplier(name, activity);

    expect(supplier).toBeInstanceOf(Supplier);
    expect(supplier.contactName).toBe(name);
    expect(supplier.activity).toBe(activity);
    expect(supplier.businessName).toBe("");
    expect(supplier.id).toBeTruthy();
  });

  it('creates a Supplier with a businessName', () => {
    const name = 'Jane Smith';
    const activity = 'Leatherwork';
    const businessName = 'Jane Co.';
    const supplier = createSupplier(name, activity, businessName);

    expect(supplier).toBeInstanceOf(Supplier);
    expect(supplier.contactName).toBe(name);
    expect(supplier.activity).toBe(activity);
    expect(supplier.businessName).toBe(businessName);
    expect(supplier.id).toBeTruthy();
  });

  
  it('updates data correctly', () => {
    const supplier = createSupplier('Bob', 'Carpentry');

    supplier.updateData('Robert', 'Bob Inc.', 'Woodwork');

    expect(supplier.contactName).toBe('Robert');
    expect(supplier.businessName).toBe('Bob Inc.');
    expect(supplier.activity).toBe('Woodwork');
  });
});