import { createSupplier, Supplier } from "@/domain/partner/models/supplier.js";
import { describe, expect, it } from "vitest";

describe('createSupplier', () => {
  it('creates a Supplier with name and activity', () => {
    const clientNumber = 1;
    const name = 'John Doe';
    const activity = 'Shoemaking';
    const supplier = createSupplier(name, clientNumber, activity);

    expect(supplier).toBeInstanceOf(Supplier);
    expect(supplier.clientNumber).toBe(clientNumber);
    expect(supplier.contactName).toBe(name);
    expect(supplier.activity).toBe(activity);
    expect(supplier.businessName).toBe("");
    expect(supplier.id).toBeTruthy();
  });

  it('creates a Supplier with a businessName', () => {
    const clientNumber = 1;
    const name = 'Jane Smith';
    const activity = 'Leatherwork';
    const businessName = 'Jane Co.';
    const supplier = createSupplier(name, clientNumber, activity, businessName);

    expect(supplier).toBeInstanceOf(Supplier);
    expect(supplier.clientNumber).toBe(clientNumber);
    expect(supplier.contactName).toBe(name);
    expect(supplier.activity).toBe(activity);
    expect(supplier.businessName).toBe(businessName);
    expect(supplier.id).toBeTruthy();
  });

  
  it('updates data correctly', () => {
    const supplier = createSupplier('Bob', 1, 'Carpentry');

    supplier.updateData('Robert', 'Bob Inc.', 'Woodwork');

    expect(supplier.clientNumber).toBe(1);
    expect(supplier.contactName).toBe('Robert');
    expect(supplier.businessName).toBe('Bob Inc.');
    expect(supplier.activity).toBe('Woodwork');
  });
});