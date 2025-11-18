import { reactive } from "vue";

export type ContactFormModel = { type: 'email' | 'phone'; name: string; value: string; isPrimary: boolean }

export function useContactForm(type: 'email' | 'phone') {
    const form = reactive<ContactFormModel>({
        type: type,
        name: '',
        value: '',
        isPrimary: false
    });

    return {form};
}

export type AddressFormModel = { 
  type: 'address'; 
  name: string; 
  street: string; 
  city: string; 
  zip?: string; 
  country?: string; 
  isPrimary: boolean };

export function useAdressForm() {
    const form = reactive<AddressFormModel>({
        type: 'address',
        name: '',
        street: '',
        city: '',
        zip: '',
        country: '',
        isPrimary: false
    });

    return {form};
}