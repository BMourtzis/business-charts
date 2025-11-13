import { reactive } from "vue";

export type FormModel =
  | { type: 'email' | 'phone'; name: string; value: string; isPrimary: boolean }
  | { type: 'address'; name: string; street: string; city: string; zip: string; country: string; isPrimary: boolean };

export function useContactForm(type: 'email' | 'phone' | 'address') {
    const form = reactive<FormModel>({
        type: type,
        name: '',
        value: '',
        street: '',
        city: '',
        zip: '',
        country: '',
        isPrimary: false
    });

    return {form};
}