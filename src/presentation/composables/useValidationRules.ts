import { useLocalizationHelpers } from '@/presentation/composables/useLocalization';

type ValueType = string | number | boolean;

export type ValidationRule = (value: ValueType) => true | string;

export function useValidationRules() {
  const { tCap } = useLocalizationHelpers();

  const required: ValidationRule = (value: ValueType) =>
    value !== null && value !== undefined && value !== ''
      ? true
      : tCap('validation.required'); // translated message

  const emailFormat: ValidationRule = (value: ValueType) => {
    if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) return true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(value))
      ? true
      : tCap('validation.invalidEmail');
  };

  const phoneFormat: ValidationRule = (value: ValueType) => {
    if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) return true;

    const phoneRegex = /^\+?[1-9]\d{9,14}$/;
    return phoneRegex.test(String(value)) ? true : tCap('validation.invalidPhone');
  };

  const minLength = (min: number): ValidationRule => (value: ValueType) => {
    if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) return true;
    return typeof value === 'string' && value.length >= min
      ? true
      : tCap('validation.minLength', 1, { min });
  };

  const maxLength = (max: number): ValidationRule => (value: ValueType) => {
    if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) return true;
    return typeof value === 'string' && value.length <= max
      ? true
      : tCap('validation.maxLength', 1, { max });
  };

  const rangeLength = (min: number, max: number): ValidationRule => (value: ValueType) => {
    if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) return true;
    return typeof value === 'string' && value.length >= min && value.length <= max
      ? true
      : tCap('validation.rangeLength', 1, { min, max });
  };

  const numeric: ValidationRule = (value: ValueType) => {
    if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) return true;
    return !isNaN(parseFloat(String(value))) && isFinite(Number(value))
      ? true
      : tCap('validation.numeric');
  };

  const integer: ValidationRule = (value: ValueType) => {
    if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) return true;
    return Number.isInteger(Number(value)) ? true : tCap('validation.integer');
  };

  const positiveNumber: ValidationRule = (value: ValueType) => {
    if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) return true;
    return typeof value === 'number' && value > 0 ? true : tCap('validation.positiveNumber');
  };

  const negativeNumber: ValidationRule = (value: ValueType) => {
    if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) return true;
    return typeof value === 'number' && value < 0 ? true : tCap('validation.negativeNumber');
  };

  const sameAs = (other: () => ValueType, messageKey = 'validation.sameAs'): ValidationRule =>
    (value: ValueType) => {
      if (value === null || value === undefined || value === '') return true;

      return value === other()
        ? true
        : tCap(messageKey);
    };

  return {
    required,
    emailFormat,
    phoneFormat,
    minLength,
    maxLength,
    rangeLength,
    numeric,
    integer,
    positiveNumber,
    negativeNumber,
    sameAs
  };
}
